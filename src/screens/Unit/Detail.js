import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppState, RefreshControl, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18n-js';

import styles from './styles';
import AddMenu from './AddMenu';
import MoreMenu from './MoreMenu';
import Summaries from './Summaries';

import Text from '../../commons/Text';
import { API } from '../../configs';
import { useBoolean, useIsOwnerOfUnit, usePopover } from '../../hooks/Common';
import { scanBluetoothDevices } from '../../iot/RemoteControl/Bluetooth';
import { googleHomeConnect } from '../../iot/RemoteControl/GoogleHome';
import { axiosPost, fetchWithCache } from '../../utils/Apis/axios';
import { lgThinqConnect } from '../../iot/RemoteControl/LG';
import ShortDetailSubUnit from '../../commons/SubUnit/ShortDetail';
import NavBar from '../../commons/NavBar';
import WrapParallaxScrollView from '../../commons/WrapParallaxScrollView';
import { SCContext } from '../../context';
import { Action } from '../../context/actionType';

const UnitDetail = ({ route }) => {
  const { unitId, unitData } = route.params;
  const isFocused = useIsFocused();
  const { stateData, setAction } = useContext(SCContext);

  const [unit, setUnit] = useState(unitData || { id: unitId });
  const [appState, setAppState] = useState(AppState.currentState);
  const [listMenuItem, setListMenuItem] = useState([]);
  const [listStation, setListStation] = useState([]);
  const [isGGHomeConnected, setIsGGHomeConnected] = useState(false);
  const [station, setStation] = useState([]);
  const [indexStation, setIndexStation] = useState(0);
  const [showAdd, setShowAdd, setHideAdd] = useBoolean();

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  const { isOwner } = useIsOwnerOfUnit(unit.user_id);

  const prepareData = useCallback((rawUnitData) => {
    const favorites = {
      isFakeStation: true,
      isFavorites: true,
      name: t('favorites'),
      sensors: [],
    };
    rawUnitData.stations.unshift(favorites);
    rawUnitData.stations.forEach((stationItem) => {
      const favoriteDevices = stationItem.sensors.filter(
        (sensorItem) => sensorItem.is_favourite
      );
      favorites.sensors = favorites.sensors.concat(favoriteDevices);
    });
  }, []);

  const fetchDetails = useCallback(async () => {
    await fetchWithCache(API.UNIT.UNIT_DETAIL(unitId), {}, (response) => {
      const { success, data } = response;
      if (success) {
        prepareData(data);
        setUnit(data);
      }
    });
  }, [setUnit, unitId, prepareData]);

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

  const handleGoogleHomeConnect = useCallback(
    async (options) => {
      let isConnected = await googleHomeConnect(options); // this may wrong if have multiple connection
      setIsGGHomeConnected(isConnected);
      let chipId = options[0].chip_id;
      if (!isConnected) {
        setAction(Action.LIST_DEVICE_TYPES, {
          chipId: chipId,
          sentEmail: true,
        });
        await axiosPost(API.GOOGLE_HOME.CHECK_SEND_EMAIL(), {
          chip_id: chipId,
          is_connected: false,
        });
      } else if (isConnected && stateData?.listDevice[chipId]?.sentEmail) {
        setAction(Action.LIST_DEVICE_TYPES, {
          chipId: chipId,
          sentEmail: false,
        });
        await axiosPost(API.GOOGLE_HOME.CHECK_SEND_EMAIL(), {
          chip_id: chipId,
          is_connected: true,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let isCalled = false;

  const handleLgThinqConnect = useCallback(async (options) => {
    if (isCalled) {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    isCalled = true;
    await lgThinqConnect(options);
  }, []);

  useEffect(() => {
    if (unit.remote_control_options) {
      if (unit.remote_control_options.bluetooth) {
        scanBluetoothDevices(unit.remote_control_options.bluetooth);
      }
      if (unit.remote_control_options.googlehome?.length) {
        handleGoogleHomeConnect(unit.remote_control_options.googlehome);
      }
      if (unit.remote_control_options.lg_thinq) {
        (async () => {
          await handleLgThinqConnect(unit.remote_control_options.lg_thinq);
        })();
      }
    }
  }, [handleGoogleHomeConnect, handleLgThinqConnect, unit]);

  useEffect(() => {
    if (isFocused) {
      fetchDetails();
    }
  }, [fetchDetails, isFocused]);

  useEffect(() => {
    if (unit.stations) {
      let listMenu = unit.stations.map((item, index) => ({
        text: item.name,
        station: item,
        index: index,
      }));
      setStation(unit.stations[indexStation]);
      setListMenuItem(listMenu);
      setListStation(listMenu.concat([{ text: '' }]));
    }
  }, [unit, indexStation, isGGHomeConnected]);

  const onSnapToItem = useCallback(
    (item, index) => {
      setStation(unit.stations[index]);
      setIndexStation(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unit, indexStation]
  );

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
        <NavBar
          listStation={listStation}
          listMenuItem={listMenuItem}
          onSnapToItem={onSnapToItem}
          indexStation={indexStation}
        />

        <ShortDetailSubUnit
          unit={unit}
          station={station}
          isGGHomeConnected={isGGHomeConnected}
        />

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
