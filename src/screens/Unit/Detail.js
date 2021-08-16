import { useIsFocused } from '@react-navigation/native';
import Text from '../../commons/Text';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';

import { API } from '../../configs';
import { useBoolean, useIsOwnerOfUnit, usePopover } from '../../hooks/Common';
import { t } from 'i18n-js';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';
import { googleHomeConnect } from '../../iot/RemoteControl/GoogleHome';
import React, { useCallback, useEffect, useState } from 'react';
import { AppState, RefreshControl, View } from 'react-native';
import { fetchWithCache } from '../../utils/Apis/axios';
import { mqttConnect } from '../../iot/RemoteControl/Mqtt';
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
  const [isGGHomeConnected, setIsGGHomeConnected] = useState(false);

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  const { isOwner } = useIsOwnerOfUnit(unit.user_id);

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

  const handleGoogleHomeConnect = useCallback(async (options) => {
    let isConnected = await googleHomeConnect(options); // this may wrong if have multiple connection
    setIsGGHomeConnected(isConnected);
  }, []);

  useEffect(() => {
    if (unit.remote_control_options) {
      if (unit.remote_control_options.bluetooth) {
        scanBluetoothDevices(unit.remote_control_options.bluetooth);
      }
      if (unit.remote_control_options.googlehome) {
        handleGoogleHomeConnect(unit.remote_control_options.googlehome);
      }
      if (unit.remote_control_options.mqtt) {
        mqttConnect(unit.remote_control_options.mqtt);
      }
    }
  }, [handleGoogleHomeConnect, unit]);

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
        <Stations unit={unit} isGGHomeConnected={isGGHomeConnected} />

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
