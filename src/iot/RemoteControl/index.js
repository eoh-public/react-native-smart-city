import {
  SEND_COMMAND_OVER_BLUETOOTH_FAIL,
  sendCommandOverBluetooth,
} from './Bluetooth';
import { sendCommandOverInternet } from './Internet';
import { sendCommandOverGoogleHome } from './GoogleHome';
import { ToastBottomHelper } from '../../utils/Utils';
import { t } from 'i18n-js';
import { sendCommandOverLGThinq } from './LG';

export const sendRemoteCommand = async (sensor, action, data) => {
  // No action, raise not authorized
  if (!action) {
    ToastBottomHelper.error(
      t('your_account_has_not_been_authorized_to_control')
    );
    return;
  }

  if (action.command_prefer_over_bluetooth) {
    try {
      await sendCommandOverBluetooth(sensor, action, data);
    } catch (err) {
      if (err === SEND_COMMAND_OVER_BLUETOOTH_FAIL) {
        await sendCommandOverInternet(sensor, action, data, 'bluetooth');
      } else {
        throw err;
      }
    }
  }

  if (action.command_prefer_over_internet) {
    await sendCommandOverInternet(sensor, action, data, 'internet');
  }

  if (action.command_prefer_over_googlehome) {
    await sendCommandOverGoogleHome(sensor, action, data);
  }

  if (action.command_prefer_over_lg) {
    await sendCommandOverLGThinq(sensor, action, data);
  }
};
