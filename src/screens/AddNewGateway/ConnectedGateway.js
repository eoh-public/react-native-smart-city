import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { t } from 'i18n-js';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import AddDeviceIcon from '../../../assets/images/Popover/Dashboard/AddDevice.svg';

import { useConnectGateway } from './hooks';
import { TESTID } from '../../configs/Constants';

const ConnectedGateway = memo(({ route }) => {
  const { new_chip, station_id, unit_id, unit_name } = route.params;
  const { onPressDone } = useConnectGateway(station_id, unit_id);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <IconOutline name="check-circle" size={28} color={Colors.Green6} />
        <Text
          testID={TESTID.CONNECTED_GATEWAY_SUCCESS}
          semibold
          color={Colors.Black}
          size={20}
          style={styles.textStatus}
        >
          {t('successfully_connected')}
        </Text>
        <Text
          testID={TESTID.CONNECTED_GATEWAY_UNIT_NAME}
          size={14}
          color={Colors.Gray9}
          style={styles.textStation}
        >
          {unit_name}
        </Text>

        <View style={styles.boxDevice}>
          <AddDeviceIcon width={43} height={43} />
          <Text
            testID={TESTID.CONNECTED_GATEWAY_CHIP_NAME}
            size={16}
            color={Colors.Gray9}
            style={styles.textDeviceName}
          >
            {`${new_chip.name} - ${new_chip.imei}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.btnDone} onPress={onPressDone}>
        <Text
          testID={TESTID.CONNECTED_GATEWAY_DONE}
          semibold
          size={16}
          color={Colors.Primary}
        >
          {t('done')}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default ConnectedGateway;

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
