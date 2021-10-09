import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import Text from '../../commons/Text';
import NavBar from '../../commons/NavBar';
import { fetchWithCache } from '../../utils/Apis/axios';
import { API, Colors } from '../../configs';
import Device from './Device';
import BottomButtonView from '../../commons/BottomButtonView';
import { HeaderCustom } from '../../commons/Header';
import Routes from '../../utils/Route';
import styles from './Styles/SelectSensorDevicesStyles';
import { AUTOMATE_SELECT } from '../../configs/Constants';
import { popAction } from '../../navigations/utils';
import { Icon } from '@ant-design/react-native';

const SelectSensorDevices = memo(({ route }) => {
  const t = useTranslations();
  const {
    unit,
    automateId,
    title = AUTOMATE_SELECT.SELECT_DEVICES,
    type,
    isScript,
    scriptName,
    isAutomateTab,
    isCreateNewAction,
    isMultiUnits,
  } = route.params;

  const [listStation, setListStation] = useState([]);
  const [listMenuItem, setListMenuItem] = useState([]);
  const [indexStation, setIndexStation] = useState(0);
  const [station, setStation] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState();
  const { navigate, dispatch, goBack } = useNavigation();

  const onSnapToItem = useCallback(
    (item, index) => {
      setIndexStation(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unit.id, indexStation]
  );

  const fetchDetails = useCallback(async () => {
    let callAPI = API.UNIT.DEVICE_CONTROL(unit.id);
    if (title === AUTOMATE_SELECT.SELECT_SENSOR) {
      // TODO will update API later
      callAPI = API.UNIT.DEVICE_CONTROL(unit.id);
    }
    await fetchWithCache(callAPI, {}, (response) => {
      const { success, data } = response;
      if (success) {
        const listMenu = data.map((item, index) => ({
          text: item.name,
          station: item,
          index: index,
        }));
        setStation(data);
        setListMenuItem(listMenu);
        setListStation(listMenu.concat([{ text: '' }]));
      }
    });
  }, [title, unit.id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const onPressDevice = (sensor) => {
    if (selectedDevice && selectedDevice.id === sensor.id) {
      setSelectedDevice(false);
    } else {
      setSelectedDevice(sensor);
    }
  };

  const onPressContinue = useCallback(() => {
    navigate(Routes.SelectAction, {
      unit,
      device: selectedDevice,
      automateId: automateId,
      stationName: station[indexStation]?.name,
      isScript,
      type,
      scriptName,
      isAutomateTab,
      isCreateNewAction,
      isMultiUnits,
    });
  }, [
    selectedDevice,
    automateId,
    station,
    indexStation,
    navigate,
    unit,
    type,
    isScript,
    scriptName,
    isMultiUnits,
    isAutomateTab,
    isCreateNewAction,
  ]);

  const onClose = useCallback(() => {
    if (isCreateNewAction) {
      goBack();
    } else if (isScript) {
      dispatch(popAction(2));
      isAutomateTab && goBack();
    } else {
      alert(t('feature_under_development'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScript, isCreateNewAction]);

  const handleOnGoBackAndClose = useCallback(() => {
    if (automateId) {
      navigate(Routes.ScriptDetail, {
        id: automateId,
        name: scriptName,
        type: type,
        havePermission: true,
        unit,
        isMultiUnits,
        isCreateNewAction,
      });
    } else {
      dispatch(popAction(2));
      isAutomateTab && goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  const rightComponent = useMemo(
    () => (
      <TouchableOpacity
        style={styles.buttonClose}
        onPress={handleOnGoBackAndClose}
      >
        <Icon name={'close'} size={24} color={Colors.Black} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [route.params]
  );

  return (
    <View style={styles.wrap}>
      <HeaderCustom onClose={onClose} rightComponent={rightComponent} />

      <ScrollView
        style={styles.wrap}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text bold type="H2" style={styles.title}>
          {t(title)}
        </Text>

        <NavBar
          listStation={listStation}
          listMenuItem={listMenuItem}
          onSnapToItem={onSnapToItem}
          indexStation={indexStation}
          style={styles.navbar}
        />

        <View style={styles.boxDevices}>
          {station[indexStation]?.sensors &&
            station[indexStation].sensors.map((sensor) => (
              <Device
                svgMain={sensor.icon || 'sensor'}
                title={sensor.name}
                sensor={sensor}
                isSelectDevice={
                  selectedDevice && selectedDevice.id === sensor.id
                }
                onPress={onPressDevice}
              />
            ))}
        </View>
      </ScrollView>

      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t('continue')}
        onPressMain={onPressContinue}
        typeMain={selectedDevice ? 'primary' : 'disabled'}
      />
    </View>
  );
});

export default SelectSensorDevices;
