import { useCallback, useState } from 'react';
import { t } from 'i18n-js';

import { API } from 'configs';
import { axiosPost, axiosPut } from '../../../utils/Apis/axios';
import { ToastBottomHelper } from '../../../utils/Utils';
import { useCountDown } from '../../../hooks/SmartParking';

const initTimeCountDown = 5;

const useEmergencyButton = (fetchDataDeviceDetail) => {
  const [deviceId, setDeviceId] = useState({});
  const [showAlertSent, setShowAlertSent] = useState(false);
  const [showAlertConfirm, setShowAlertConfirm] = useState(false);

  const [timeoutEmergencyId, setTimeoutEmergencyId] = useState(0);
  const { countDown, resetCountDown } = useCountDown(
    initTimeCountDown,
    false,
    showAlertConfirm
  );

  const sendAlertNow = useCallback(async () => {
    const { success } = await axiosPost(API.EMERGENCY_BUTTON.SEND_ALERT, {
      device: deviceId,
    });
    if (success) {
      setShowAlertConfirm(false);
      setShowAlertSent(true);
      await fetchDataDeviceDetail();
    } else {
      setShowAlertConfirm(false);
      ToastBottomHelper.error(t('alert_send_error'));
    }
    clearTimeout(timeoutEmergencyId);
  }, [deviceId, fetchDataDeviceDetail, timeoutEmergencyId]);

  const onCancelConfirmAlert = useCallback(() => {
    resetCountDown();
    setShowAlertConfirm(false);
    clearTimeout(timeoutEmergencyId);
  }, [resetCountDown, timeoutEmergencyId]);

  const onSendNowAlert = useCallback(() => {
    sendAlertNow();
  }, [sendAlertNow]);

  const onEmergencyButtonPress = useCallback(() => {
    setShowAlertConfirm(true);
    if (countDown.seconds > 0) {
      const id = setTimeout(() => sendAlertNow(), initTimeCountDown * 1000);
      setTimeoutEmergencyId(id);
    }
  }, [countDown.seconds, sendAlertNow]);

  const onCloseAlertSent = useCallback(() => {
    setShowAlertSent(false);
  }, []);

  const onViewDetails = useCallback(() => {
    setShowAlertSent(false);
  }, []);

  return {
    setDeviceId,
    showAlertConfirm,
    countDown,
    onCancelConfirmAlert,
    onSendNowAlert,
    onEmergencyButtonPress,
    showAlertSent,
    onCloseAlertSent,
    onViewDetails,
  };
};

export const useAlertResolveEmergency = (lastEvent, fetchDataDeviceDetail) => {
  const [showPopupResolveSuccess, setShowPopupResolveSuccess] = useState(false);
  const [stateAlertResolve, setStateAlertResolve] = useState({
    visible: false,
    title: t('resolve_emergency'),
    message: t('are_you_sure_this_resolved'),
    leftButton: t('cancel'),
    rightButton: t('resolve'),
    member: {},
  });
  const showAlertResolve = useCallback(() => {
    setStateAlertResolve({
      ...stateAlertResolve,
      visible: true,
    });
  }, [stateAlertResolve]);

  const hideAlertResolve = useCallback(() => {
    setStateAlertResolve({
      ...stateAlertResolve,
      visible: false,
    });
  }, [stateAlertResolve]);

  const onPressResolveSituationConfirm = useCallback(() => {
    showAlertResolve();
  }, [showAlertResolve]);

  const onCloseShowPopupResolveSuccess = useCallback(() => {
    setShowPopupResolveSuccess(false);
  }, []);

  const onPressResolveSituation = useCallback(async () => {
    const { success } = await axiosPut(
      API.EMERGENCY_BUTTON.RESOLVE(lastEvent.id)
    );
    if (success) {
      setShowPopupResolveSuccess(true);
      hideAlertResolve();
      fetchDataDeviceDetail();
    } else {
      hideAlertResolve();
      ToastBottomHelper.error(t('alert_resolve_error'));
    }
  }, [hideAlertResolve, lastEvent, fetchDataDeviceDetail]);

  return {
    showPopupResolveSuccess,
    onPressResolveSituationConfirm,
    onCloseShowPopupResolveSuccess,
    onPressResolveSituation,
    stateAlertResolve,
    showAlertResolve,
    hideAlertResolve,
  };
};

export { useEmergencyButton };
