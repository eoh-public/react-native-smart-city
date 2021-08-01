import { t } from 'i18n-js';
import { useCallback, useState } from 'react';

export const useDropdownAction = () => {
  const [stateAlert, setStateAlert] = useState({
    visible: false,
    title: 'Fan Speed',
    message: '',
    leftButton: t('cancel'),
    rightButton: t('done'),
    vehicle: {},
  });
  const hideAlertAction = useCallback(() => {
    setStateAlert({ ...stateAlert, visible: false });
  }, [stateAlert]);

  const onShowAlert = useCallback(() => {
    setStateAlert((stateAlertAction) => {
      return {
        ...stateAlertAction,
        visible: true,
      };
    });
  }, []);

  return {
    stateAlert,
    hideAlertAction,
    onShowAlert,
  };
};
