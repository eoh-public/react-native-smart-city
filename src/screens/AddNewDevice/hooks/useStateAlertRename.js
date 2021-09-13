import { useTranslations } from '../../../hooks/Common/useTranslations';
import { useCallback, useState } from 'react';

export const useStateAlertRename = () => {
  const t = useTranslations();
  const [stateAlertRename, setStateAlertRename] = useState({
    visible: false,
    title: t('rename_device'),
    message: '',
    leftButton: t('cancel'),
    rightButton: t('rename'),
    vehicle: {},
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertRename({ ...stateAlertRename, visible: false });
  }, [stateAlertRename]);

  const onShowRenameAlert = useCallback(() => {
    setStateAlertRename((stateAlertAction) => {
      return {
        ...stateAlertAction,
        visible: true,
      };
    });
  }, []);

  return {
    stateAlertRename,
    hideAlertAction,
    onShowRenameAlert,
  };
};
