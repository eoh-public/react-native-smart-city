import { useState, useCallback } from 'react';
import { useTranslations } from '../../../hooks/Common/useTranslations';

const useStateAlertAction = () => {
  const t = useTranslations();
  const [stateAlertAction, setStateAlertAction] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: '',
    isDelete: true,
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertAction({ ...stateAlertAction, visible: false });
  }, [stateAlertAction]);

  const onShowRename = useCallback(() => {
    setStateAlertAction((action) => {
      return {
        ...action,
        visible: true,
        title: t('rename_automate'),
        message: '',
        leftButton: t('cancel'),
        rightButton: t('rename'),
        isDelete: false,
      };
    });
  }, [t]);

  const onShowDelete = useCallback(
    (scriptName) => () => {
      setStateAlertAction((action) => {
        return {
          ...action,
          visible: true,
          title: t('title_delete_script', {
            scriptName: scriptName,
          }),
          message: t('message_delete_script', {
            scriptName: scriptName,
          }),
          leftButton: t('cancel'),
          rightButton: t('remove'),
          isDelete: true,
        };
      });
    },
    [t]
  );

  return [stateAlertAction, hideAlertAction, onShowRename, onShowDelete];
};
export { useStateAlertAction };
