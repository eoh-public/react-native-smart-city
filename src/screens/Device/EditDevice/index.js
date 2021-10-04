import React, { memo, useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
import Routes from '../../../utils/Route';

import useEditDevice from './hooks';

const EditDevice = memo(() => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const { params = {} } = useRoute();
  const { unit, sensor } = params;
  const [inputName, setInputName] = useState('');
  const [sensorName, setSensorName] = useState(sensor?.name);
  const { stateAlertAction, hideAlertAction, onShowRename, onShowDelete } =
    useEditDevice(unit, sensor);
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
      navigate(Routes.UnitStack, {
        screen: Routes.UnitDetail,
        params: {
          unitId: unit.id,
          unitData: unit,
        },
      });
    } else {
      ToastBottomHelper.error(t('remove_failed'));
    }
  }, [hideAlertAction, sensor.id, navigate, unit, t]);

  const handleRenameOrDelete = useCallback(async () => {
    if (stateAlertAction.isDelete) {
      await deleteSensor();
    } else {
      renameSensor();
    }
  }, [stateAlertAction.isDelete, deleteSensor, renameSensor]);

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
              {' '}
              {t('device_name')}{' '}
            </Text>
          </View>
          <View style={styles.DeviceButtonRight}>
            <Text type="Body" Reugular color={Colors.Grey7}>
              {' '}
              {sensorName}{' '}
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
      >
        {!stateAlertAction.isDelete && (
          <_TextInput
            onChange={(text) => setInputName(text)}
            defaultValue={sensorName}
            textInputStyle={styles.textInput}
          />
        )}
      </AlertAction>
    </View>
  );
});

export default EditDevice;
