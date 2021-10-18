import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity, Platform } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { HeaderCustom } from '../../../commons/Header';
import { IconOutline } from '@ant-design/icons-react-native';
import { Colors } from '../../../configs';
import Text from '../../../commons/Text';
import { useRoute } from '@react-navigation/native';
import { TESTID } from '../../../configs/Constants';
import AlertAction from '../../../commons/AlertAction';
import _TextInput from '../../../commons/Form/TextInput';
import styles from './styles/EditDeviceStyles';
import { axiosPatch, axiosDelete } from '../../../utils/Apis/axios';
import API from '../../../configs/API';
import { useNavigation } from '@react-navigation/native';
import { ToastBottomHelper } from '../../../utils/Utils';
import useKeyboardAnimated from '../../../hooks/Explore/useKeyboardAnimated';

import useEditDevice from './hooks';

const EditDevice = memo(() => {
  const t = useTranslations();
  const navigation = useNavigation();
  const { params = {} } = useRoute();
  const { sensor, sensorNewName } = params;
  const [inputName, setInputName] = useState('');
  const [sensorName, setSensorName] = useState(
    sensorNewName ? sensorNewName : ''
  );
  const { stateAlertAction, hideAlertAction, onShowRename, onShowDelete } =
    useEditDevice();
  const renameSensor = useCallback(async () => {
    const { success, data } = await axiosPatch(
      API.SENSOR.RENAME_SENSOR(sensor?.id),
      {
        name: inputName,
      }
    );
    if (success) {
      setSensorName(data?.name);
      ToastBottomHelper.success(t('rename_successfully'));
    } else {
      ToastBottomHelper.error(t('rename_failed'));
    }
    hideAlertAction();
  }, [sensor.id, inputName, hideAlertAction, t]);

  const deleteSensor = useCallback(async () => {
    hideAlertAction();
    const { success } = await axiosDelete(API.SENSOR.REMOVE_SENSOR(sensor?.id));

    if (success) {
      navigation.pop(2);
    } else {
      ToastBottomHelper.error(t('remove_failed'));
    }
  }, [hideAlertAction, sensor.id, navigation, t]);

  const handleRenameOrDelete = useCallback(async () => {
    if (stateAlertAction.isDelete) {
      await deleteSensor();
    } else {
      await renameSensor();
    }
  }, [stateAlertAction.isDelete, deleteSensor, renameSensor]);

  const [transY] = useKeyboardAnimated(-16);
  const animatedStyle = Platform.select({
    ios: {
      marginBottom: transY,
    },
  });
  return (
    <View style={styles.wrap}>
      <HeaderCustom title={t('edit_device')} isShowSeparator />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.DeviceButton}
          onPress={onShowRename}
          testID={TESTID.DEVICE_SHOW_RENAME}
        >
          <View style={styles.DeviceButtonLeft}>
            <Text type="H4" semibold>
              {t('device_name')}
            </Text>
          </View>
          <View style={styles.DeviceButtonRight}>
            <Text type="Body" Reugular color={Colors.Grey7}>
              {sensorName}
            </Text>
            <IconOutline
              name="right"
              size={20}
              color={Colors.Gray7}
              style={styles.iconRight}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={onShowDelete(sensor?.name)}
          testID={TESTID.DEVICE_SHOW_REMOVE}
        >
          <Text
            type={'H4'}
            semibold
            color={Colors.Red}
            style={styles.removeBorderBottom}
          >
            {t('remove_device')}
          </Text>
        </TouchableOpacity>
      </View>
      <AlertAction
        visible={stateAlertAction.visible}
        hideModal={hideAlertAction}
        title={stateAlertAction.title}
        message={stateAlertAction.message}
        leftButtonTitle={stateAlertAction.leftButton}
        leftButtonClick={hideAlertAction}
        rightButtonTitle={stateAlertAction.rightButton}
        rightButtonClick={handleRenameOrDelete}
        animatedStyle={animatedStyle}
      >
        {!stateAlertAction.isDelete && (
          <_TextInput
            onChange={(text) => setInputName(text)}
            defaultValue={sensorName}
            textInputStyle={styles.textInputStyle}
            wrapStyle={styles.textInputWrapStyle}
            selectionColor={Colors.Primary}
          />
        )}
      </AlertAction>
    </View>
  );
});

export default EditDevice;
