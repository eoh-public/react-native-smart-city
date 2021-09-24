import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppState, RefreshControl, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

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
import CameraDevice from '../../commons/CameraDevice';
import { ModalFullVideo } from '../../commons/Modal';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../utils/Route';
import SubUnitAutomate from '../../commons/SubUnit/OneTap';
import { AUTOMATE_TYPE } from '../../configs/Constants';

const UnitDetail = ({ route }) => {
  const t = useTranslations();
  const { unitId, unitData } = route.params;
  const isFocused = useIsFocused();
  const { stateData, setAction } = useContext(SCContext);
  const { navigate } = useNavigation();

  const [unit, setUnit] = useState(unitData || { id: unitId });
  const [appState, setAppState] = useState(AppState.currentState);
  const [listMenuItem, setListMenuItem] = useState([]);
  const [listStation, setListStation] = useState([]);
  const [oneTap, setOneTap] = useState([]);
  const [script, setScript] = useState([]);
  const [isGGHomeConnected, setIsGGHomeConnected] = useState(false);
  const [station, setStation] = useState([]);
  const [indexStation, setIndexStation] = useState(0);
  const [showAdd, setShowAdd, setHideAdd] = useBoolean();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [dataFullScreen, setDataFullScreen] = useState();

  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();

  const { isOwner } = useIsOwnerOfUnit(unit.user_id);

  const handleFullScreen = (data) => {
    setIsFullScreen(!isFullScreen);
    setDataFullScreen(data);
  };

  const onClose = useCallback(() => {
    setIsFullScreen(false);
  }, []);

  const prepareData = useCallback(
    (rawUnitData) => {
      rawUnitData.stations.unshift({
        isOneTap: true,
        name: 'One-Tap',
      });
      const favorites = {
        isFakeStation: true,
        isFavorites: true,
        name: t('favorites'),
        sensors: [],
      };
      rawUnitData.stations.unshift(favorites);
      rawUnitData.stations.forEach((stationItem) => {
        if (stationItem.sensors) {
          const favoriteDevices = stationItem.sensors.filter(
            (sensorItem) => sensorItem.is_favourite
          );
          favorites.sensors = favorites.sensors.concat(favoriteDevices);
        }
      });
      rawUnitData.stations.push({
        isScript: true,
        name: t('Script'),
      });
    },
    [t]
  );

  const fetchDetails = useCallback(async () => {
    getAutomates();
    await fetchWithCache(API.UNIT.UNIT_DETAIL(unitId), {}, (response) => {
      const { success, data } = response;
      if (success) {
        prepareData(data);
        setUnit(data);
      }
    });
  }, [setUnit, unitId, prepareData, getAutomates]);

  const getAutomates = useCallback(async () => {
    await fetchWithCache(API.UNIT.AUTOMATE(unitId), {}, (response) => {
      const { success, data } = response;
      if (success) {
        setOneTap(data.filter((item) => item.type === AUTOMATE_TYPE.ONE_TAP));
        setScript(data.filter((item) => item.type !== AUTOMATE_TYPE.ONE_TAP));
      }
    });
  }, [unitId]);

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

  const goToPlayBack = (item, thumbnail) => () => {
    navigate(Routes.PlaybackCamera, { item, thumbnail });
  };

  const renderDetailSubUnit = () => {
    if (station.camera_devices) {
      return (
        <CameraDevice
          station={station}
          handleFullScreen={handleFullScreen}
          goToPlayBack={goToPlayBack}
        />
      );
    } else if (station.isOneTap) {
      return (
        <SubUnitAutomate
          isOwner={isOwner}
          type={AUTOMATE_TYPE.ONE_TAP}
          automates={oneTap}
          unitId={unitId}
        />
      );
    } else if (station.isScript) {
      return (
        <SubUnitAutomate
          isOwner={isOwner}
          type={AUTOMATE_TYPE.VALUE_CHANGE}
          automates={script}
          unitId={unitId}
        />
      );
    } else if (station) {
      return (
        <ShortDetailSubUnit
          unit={unit}
          station={station}
          isGGHomeConnected={isGGHomeConnected}
        />
      );
    }
  };
  return (
    <WrapParallaxScrollView
      uriImg={unit.background}
      title={t('Welcome {name}', {
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
        {renderDetailSubUnit()}
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
      <ModalFullVideo
        isVisible={isFullScreen}
        data={dataFullScreen}
        modalStyles={styles.modal}
        onClose={onClose}
      />
    </WrapParallaxScrollView>
  );
};

export default UnitDetail;
