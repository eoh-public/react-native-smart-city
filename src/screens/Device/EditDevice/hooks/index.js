import { useCallback, useState } from 'react';
import { useTranslations } from '../../../../hooks/Common/useTranslations';

export default (unit, sensor, inputName) => {
  const t = useTranslations();
  const [stateAlertAction, setStateAlertAction] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: null,
    isDelete: true,
  });

  const hideAlertAction = useCallback(() => {
    setStateAlertAction({ ...stateAlertAction, visible: false });
  }, [stateAlertAction]);

  const onShowRename = useCallback(() => {
    setStateAlertAction(() => {
      return {
        visible: true,
        title: t('rename_device'),
        message: '',
        leftButton: t('cancel'),
        rightButton: t('rename'),
        isDelete: false,
      };
    });
  }, [t]);

  const onShowDelete = useCallback(
    (sensorName) => () => {
      setStateAlertAction(() => {
        return {
          visible: true,
          title: t('remove_device'),
          message: t('message_delete_device', { name: sensorName }),
          leftButton: t('cancel'),
          rightButton: t('remove'),
          isDelete: true,
        };
      });
    },
    [t]
  );

  return {
    stateAlertAction,
    hideAlertAction,
    onShowRename,
    onShowDelete,
  };
};
