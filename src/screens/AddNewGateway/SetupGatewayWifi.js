import React, { memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import { AlertAction, Section, ViewButtonBottom } from '../../commons';
import { BLE_INIT_NAME, BLE_NOTIFY_WIFI_OK } from '../../configs/Constants';
import base64 from 'react-native-base64';
import Text from '../../commons/Text';
import Routes from '../../utils/Route';
import _TextInput from '../../commons/Form/TextInput';
import DisplayChecking from '../../commons/DisplayChecking';
import _TextInputPassword from '../../commons/Form/TextInputPassword';
import {
  getDeviceByName,
  readCharacteristic,
  scanBluetoothDevices,
  sendDataOverBluetooth,
  subcribeCharacteristicNotify,
} from '../../iot/RemoteControl/Bluetooth';
import styles from './SetupGatewayWifiStyles';

const SetupGatewayWifi = memo(({ route }) => {
  const { unit_id } = route.params;
  const isFocused = useIsFocused();
  const { navigate, goBack } = useNavigation();
  const [wifiName, setWifiName] = useState('');
  const [wifiPass, setWifiPass] = useState('');
  const [displayLoadingConnect, setDisplayLoadingConnect] = useState(false);
  const [displayConnectFail, setDisplayConnectFail] = useState(false);
  const [timeoutSubcribtion, setTimeoutSubcribtion] = useState(null);

  useEffect(() => {
    if (isFocused) {
      scanBluetoothDevices([BLE_INIT_NAME]);
    }
    return () => {
      clearTimeout(timeoutSubcribtion);
    };
  }, [isFocused, timeoutSubcribtion]);

  const onRight = useCallback(async () => {
    // get device and send wifi + pass
    const device = getDeviceByName(BLE_INIT_NAME);
    await sendDataOverBluetooth(
      device,
      {
        type: 'init',
        ssid: wifiName,
        password: wifiPass,
      },
      true
    );

    // subcribe + handle if right notify
    const subcription = await subcribeCharacteristicNotify(
      device,
      async (error, characteristicNotify) => {
        if (error) {
          throw error;
        }

        const notify = base64.decode(characteristicNotify.value);
        if (notify === BLE_NOTIFY_WIFI_OK) {
          const characteristicRead = await readCharacteristic(device);

          const readJsonData = base64.decode(characteristicRead.value);
          const readData = JSON.parse(readJsonData);

          subcription.remove();
          await device.cancelConnection();
          setDisplayLoadingConnect(false);

          navigate(Routes.AddNewGateway, {
            unit_id,
            wifiName,
            wifiPass,
            imei: readData.imei,
          });
        }
      }
    );

    setDisplayLoadingConnect(true);

    const timeoutId = setTimeout(async () => {
      subcription.remove();
      await device.cancelConnection();
      setDisplayLoadingConnect(false);
      setDisplayConnectFail(true);
    }, parseInt(7000, 10));
    setTimeoutSubcribtion(timeoutId);
  }, [navigate, unit_id, wifiName, wifiPass]);

  const onChangeWifiName = useCallback((text) => {
    setWifiName(text);
  }, []);

  const onChangeWifiPass = useCallback((text) => {
    setWifiPass(text);
  }, []);

  const onHideDisplayConnectFail = useCallback(() => {
    setDisplayConnectFail(false);
  }, []);

  const onHideDisplayLoading = useCallback(() => {
    setDisplayLoadingConnect(false);
  }, []);

  return (
    <SafeAreaView style={styles.wrap}>
      <Text semibold size={20} color={Colors.Black} style={styles.txtHeader}>
        {t('add_new_gateway')}
      </Text>
      <Text size={14} color={Colors.Gray8} style={styles.txtNote}>
        {t('please_select_a_wifi_network')}
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Section type={'border'}>
          <Text style={styles.textWifi} bold color={Colors.Primary}>
            {t('wifi_name')}
          </Text>
          <_TextInput
            placeholder={t('wifi')}
            wrapStyle={styles.noMarginTop}
            onChange={onChangeWifiName}
            textInputStyle={styles.wifiInput}
            selectionColor={Colors.Primary}
          />
          <Text style={styles.textWifi} bold color={Colors.Primary}>
            {t('password')}
          </Text>
          <_TextInputPassword
            secureTextEntry
            placeholder={t('password')}
            wrapStyle={styles.noMarginTop}
            onChange={onChangeWifiPass}
            value={wifiPass}
            textInputStyle={styles.wifiInput}
            selectionColor={Colors.Primary}
          />
        </Section>
      </ScrollView>

      <DisplayChecking
        isOpacityLayout
        visible={displayLoadingConnect}
        onClose={onHideDisplayLoading}
        message={t('push_and_wait_chip_response')}
      />

      <AlertAction
        visible={displayConnectFail} // TODO display True based on bluetooth response with imei
        hideModal={onHideDisplayConnectFail}
        title={wifiName ? `"${wifiName}"` : ''}
        message={t('could_not_connect_to_network')}
        leftButtonTitle={t('ok')}
        leftButtonClick={onHideDisplayConnectFail}
      />

      <ViewButtonBottom
        leftTitle={t('cancel')}
        onLeftClick={goBack}
        rightTitle={t('text_next')}
        onRightClick={onRight}
      />
    </SafeAreaView>
  );
});

export default SetupGatewayWifi;
