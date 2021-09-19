import React, { memo, useState, useEffect, useCallback } from 'react';
import { ScrollView, View } from 'react-native';
import { t } from 'i18n-js';
import Text from '../../commons/Text';
import NavBar from '../../commons/NavBar';
import { fetchWithCache } from '../../utils/Apis/axios';
import { API } from '../../configs';
import Device from './Device';
import BottomButtonView from '../../commons/BottomButtonView';
import { HeaderCustom } from '../../commons/Header';
import styles from './Styles/SelectDeviceStyles';

const SelectDevice = memo(({ route }) => {
  const { unitId } = route.params;

  const [listStation, setListStation] = useState([]);
  const [listMenuItem, setListMenuItem] = useState([]);
  const [indexStation, setIndexStation] = useState(0);
  const [station, setStation] = useState([]);
  const [device, setDevice] = useState(-1);

  const onSnapToItem = useCallback(
    (item, index) => {
      setIndexStation(index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [unitId, indexStation]
  );

  const fetchDetails = useCallback(async () => {
    await fetchWithCache(API.UNIT.DEVICE_CONTROL(unitId), {}, (response) => {
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
  }, [unitId]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const onPressDevice = (sensor) => {
    if (device === sensor.id) {
      setDevice(-1);
    } else {
      setDevice(sensor.id);
    }
  };

  const onPressContinue = () => {
    alert(t('feature_under_development'));
  };

  return (
    <View style={styles.wrap}>
      <HeaderCustom isShowClose />

      <ScrollView
        style={styles.wrap}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <Text bold type="H2" style={styles.title}>
          {t('select_devices')}
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
                isSelectDevice={device === sensor.id}
                onPress={onPressDevice}
              />
            ))}
        </View>
      </ScrollView>

      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t('continue')}
        onPressMain={onPressContinue}
      />
    </View>
  );
});

export default SelectDevice;
