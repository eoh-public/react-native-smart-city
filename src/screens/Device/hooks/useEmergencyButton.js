import { useCallback, useState } from 'react';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import { API } from '../../../configs';
import { axiosPost, axiosPut } from '../../../utils/Apis/axios';
import { ToastBottomHelper } from '../../../utils/Utils';
import { useCountDown } from '../../../hooks/EmergencyButton';

const initTimeCountDown = 5;

const useEmergencyButton = (fetchDataDeviceDetail, acquireLockShowing) => {
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
    const { success, message } = await axiosPost(
      API.EMERGENCY_BUTTON.SEND_ALERT(),
      {
        device: deviceId,
      }
    );
    if (success) {
      acquireLockShowing();
      setShowAlertConfirm(false);
      setShowAlertSent(true);
      await fetchDataDeviceDetail();
    } else {
      setShowAlertConfirm(false);
      ToastBottomHelper.error(message);
    }
    clearTimeout(timeoutEmergencyId);
  }, [deviceId, fetchDataDeviceDetail, acquireLockShowing, timeoutEmergencyId]);

  const onCancelConfirmAlert = useCallback(() => {
    setShowAlertConfirm(false);
    clearTimeout(timeoutEmergencyId);
  }, [timeoutEmergencyId]);

  const onSendNowAlert = useCallback(() => {
    sendAlertNow();
  }, [sendAlertNow]);

  const onEmergencyButtonPress = useCallback(() => {
    resetCountDown();
    setShowAlertConfirm(true);
    if (countDown.seconds > 0) {
      const id = setTimeout(() => sendAlertNow(), initTimeCountDown * 1000);
      setTimeoutEmergencyId(id);
    }
  }, [countDown.seconds, sendAlertNow, resetCountDown]);

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

export const useAlertResolveEmergency = (
  lastEvent,
  fetchDataDeviceDetail,
  acquireLockShowing
) => {
  const t = useTranslations();
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
      acquireLockShowing();
      hideAlertResolve();
      setShowPopupResolveSuccess(true);
      fetchDataDeviceDetail();
    } else {
      hideAlertResolve();
      ToastBottomHelper.error(t('alert_resolve_error'));
    }
  }, [
    lastEvent.id,
    hideAlertResolve,
    fetchDataDeviceDetail,
    acquireLockShowing,
    t,
  ]);

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
