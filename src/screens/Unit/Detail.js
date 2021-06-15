import { useNavigation, useIsFocused } from '@react-navigation/native';
import Text from '../../commons/Text';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';

import { API } from '../../configs';
import {
  useAndroidTranslucentStatusBar,
  useBoolean,
  useIsOwnerOfUnit,
  usePopover,
  useStatusBar,
} from '../../hooks/Common';
import { t } from 'i18n-js';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';
import { googleHomeConnect } from '../../iot/RemoteControl/GoogleHome';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, RefreshControl, View, StatusBar } from 'react-native';
import { fetchWithCache } from '../../utils/Apis/axios';
import { useSCContextSelector } from '../../context';
import styles from './styles';
import AddMenu from './AddMenu';
import MoreMenu from './MoreMenu';
import Summaries from './Summaries';
import Stations from './Stations';

const UnitDetail = ({ route }) => {
  const { unitId, unitData } = route.params;
  const isFocused = useIsFocused();
  const [unit, setUnit] = useState(unitData || { id: unitId });
  const [appState, setAppState] = useState(AppState.currentState);
  const [showAdd, setShowAdd, setHideAdd] = useBoolean();
  const { goBack } = useNavigation();

  const {
    childRef,
    showingPopover,
    showPopoverWithRef,
    hidePopover,
  } = usePopover();

  const { isOwner } = useIsOwnerOfUnit(unit.user_id);
  const { statusBar } = useStatusBar();

  useAndroidTranslucentStatusBar(statusBar);

  const fetchDetails = useCallback(async () => {
    await fetchWithCache(API.UNIT.UNIT_DETAIL(unitId), {}, (response) => {
      const { success, data } = response;
      if (success) {
        setUnit(data);
      }
    });
  }, [setUnit, unitId]);

  const onRefresh = useCallback(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        fetchDetails();
      }
      setAppState(nextAppState);
    },
    [appState, fetchDetails]
  );
  
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [handleAppStateChange]);

  useEffect(() => {
    if (unit.remote_control_options) {
      if (unit.remote_control_options.bluetooth) {
        scanBluetoothDevices(unit.remote_control_options.bluetooth);
      }
      if (unit.remote_control_options.googlehome) {
        googleHomeConnect(unit.remote_control_options.googlehome);
      }
    }
  }, [unit]);

  useEffect(() => {
    if (isFocused) {
      fetchDetails();
    }
  }, [fetchDetails, isFocused]);

  return (
    <WrapParallaxScrollView
      uriImg={unit.background}
      title={t('Welcome %{name}', {
        name: unit.name ? unit.name : '',
      })}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={onRefresh} />
      }
      onAdd={setShowAdd}
      onMore={showPopoverWithRef}
      hideRightPlus={!isOwner}
    >
      <View style={styles.container}>
        <Summaries unit={unit} />
        <View style={styles.subUnitsHeading}>
          <Text style={styles.subUnitTitle}>{t('sub_unit')}</Text>
        </View>
        <Stations unit={unit} />

        {!!unit.can_add && unit.stations.length === 0 && (
          <View style={styles.canAdd}>
            <Text style={styles.emptyUnit}>{t('text_no_sub_unit_yet')}</Text>
          </View>
        )}
      </View>

      <AddMenu
        unit={unit}
        afterItemClick={hidePopover}
        showAdd={showAdd}
        setHideAdd={setHideAdd}
      />
      <MoreMenu
        unit={unit}
        hidePopover={hidePopover}
        isOwner={isOwner}
        childRef={childRef}
        showingPopover={showingPopover}
      />
    </WrapParallaxScrollView>
  );
};

export default UnitDetail;
