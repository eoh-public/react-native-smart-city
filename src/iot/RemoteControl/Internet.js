import t from '../../hooks/Common/useTranslations';

import { ToastBottomHelper } from '../../utils/Utils';
import { axiosPost } from '../../utils/Apis/axios';
import { API } from '../../configs';

export const sendCommandOverInternet = async (sensor, action, data, source) => {
  if (data !== null) {
    if (Number.isInteger(data)) {
      data = data.toString(16).toUpperCase();
    }
  }
  ToastBottomHelper.success(t('Sending command via internet'));
  const { success } = await axiosPost(API.SENSOR.QUICK_ACTION(sensor.id), {
    key: action.key,
    data,
    source,
  });
  if (success) {
    ToastBottomHelper.success(t('Command is sent to device via internet'));
  } else {
    ToastBottomHelper.error(t('Command is fail to send via internet'));
  }
};
