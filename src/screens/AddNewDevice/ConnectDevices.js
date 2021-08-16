import React, { memo, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import _TextInput from '../../commons/Form/TextInput';
import { AlertAction } from '../../commons';
import SvgDoor from '../../../assets/images/Device/door.svg';

import { useConnectDevices } from './hooks/ConnectDevices';
import { useStateAlertRename } from './hooks/useStateAlertRename';
import { TESTID } from '../../configs/Constants';

const ConnectDevices = memo(({ route }) => {
  const { new_sensor, station_id, unit_id, unit_name } = route.params;
  const {
    onPressDone,
    onChangeTemporaryDeviceName,
    temporaryDeviceName,
    deviceName,
    setDeviceName,
  } = useConnectDevices(new_sensor, station_id, unit_id);
  const { stateAlertRename, onShowRenameAlert, hideAlertAction } =
    useStateAlertRename();

  const onPressRename = useCallback(() => {
    setDeviceName(temporaryDeviceName);
    hideAlertAction();
  }, [hideAlertAction, setDeviceName, temporaryDeviceName]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IconOutline name="check-circle" size={28} color={Colors.Green6} />
        <Text
          testID={TESTID.CONNECTED_DEVICE_SUCCESS}
          semibold
          color={Colors.Black}
          size={20}
          style={styles.textStatus}
        >
          {t('successfully_connected')}
        </Text>
        <Text
          testID={TESTID.CONNECTED_DEVICE_UNIT_NAME}
          size={14}
          color={Colors.Gray9}
          style={styles.textStation}
        >
          {unit_name}
        </Text>

        <View style={styles.boxDevice}>
          <SvgDoor />
          <Text
            testID={TESTID.CONNECTED_DEVICE_DEVICE_NAME}
            size={16}
            color={Colors.Gray9}
            style={styles.textDeviceName}
          >
            {deviceName}
          </Text>
        </View>

        <TouchableOpacity
          testID={TESTID.CONNECTED_DEVICE_BUTTON_RENAME_DEVICE}
          style={styles.textRename}
          onPress={onShowRenameAlert}
        >
          <Text
            testID={TESTID.CONNECTED_DEVICE_RENAME_DEVICE}
            size={14}
            color={Colors.Orange}
          >
            {t('rename_your_device')}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btnDone} onPress={onPressDone}>
        <Text
          testID={TESTID.CONNECTED_DEVICE_DONE}
          semibold
          size={16}
          color={Colors.Primary}
        >
          {t('done')}
        </Text>
      </TouchableOpacity>
      <AlertAction
        visible={stateAlertRename.visible}
        hideModal={hideAlertAction}
        title={stateAlertRename.title}
        message={stateAlertRename.message}
        leftButtonTitle={stateAlertRename.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertRename.rightButton}
        rightButtonClick={onPressRename}
      >
        <View style={styles.wrapRename}>
          <_TextInput
            value={temporaryDeviceName}
            onChange={onChangeTemporaryDeviceName}
            textInputStyle={styles.roomName}
            wrapStyle={styles.textInput}
            selectionColor={Colors.Primary}
          />
        </View>
      </AlertAction>
    </View>
  );
});

export default ConnectDevices;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxDevice: {
    padding: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
    alignItems: 'center',
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 2,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.Gray19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnDone: {
    height: 48,
    width: '100%',
    alignItems: 'center',
  },
  textStatus: {
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 16,
  },
  textStation: {
    lineHeight: 22,
    marginBottom: 8,
  },
  textDeviceName: {
    marginLeft: 8,
  },
  textRename: {
    marginTop: 16,
  },
  textInput: {
    marginTop: 0,
  },
  roomName: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    paddingLeft: 0,
    fontSize: 16,
    lineHeight: 24,
    margin: 0,
    padding: 0,
  },
  wrapRename: {
    marginHorizontal: 16,
  },
});
