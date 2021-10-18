import { useState, useCallback } from 'react';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { Colors } from '../../../configs';
import { AUTOMATE_TYPE } from '../../../configs/Constants';
import Routes from '../../../utils/Route';
import { useNavigation } from '@react-navigation/native';

const useStateAlertAction = () => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const [stateAlertAction, setStateAlertAction] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: '',
    rightColor: Colors.Primary,
    isDelete: true,
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertAction({ ...stateAlertAction, visible: false });
  }, [stateAlertAction]);

  const onShowRename = useCallback(
    (havePermission) => () => {
      const data = havePermission
        ? {
            visible: true,
            title: t('rename_automate'),
            message: '',
            leftButton: t('cancel'),
            rightButton: t('rename'),
            rightColor: Colors.Primary,
            isDelete: false,
          }
        : {
            visible: true,
            title: t('rename_automate'),
            message: t('you_do_not_have_permission_to', {
              doAction: t('rename_automate').toLowerCase(),
            }),
            leftButton: t('ok'),
            rightButton: null,
            isDelete: false,
          };
      setStateAlertAction((action) => {
        return {
          ...action,
          ...data,
        };
      });
    },
    [t]
  );

  const onShowActivityLog = useCallback(
    (havePermission, id, type, unit) => () => {
      if (havePermission) {
        navigate(Routes.ActivityLog, {
          id: id,
          type:
            type === AUTOMATE_TYPE.ONE_TAP
              ? `automate.${AUTOMATE_TYPE.ONE_TAP}`
              : 'automate',
          share: unit,
        });
      } else {
        setStateAlertAction((action) => {
          return {
            ...action,
            visible: true,
            title: t('activity_log'),
            message: t('you_do_not_have_permission_to_access', {
              doAction: t('activity_log').toLowerCase(),
            }),
            leftButton: t('ok'),
            rightButton: null,
            isDelete: true,
          };
        });
      }
    },
    [navigate, t]
  );

  const onShowDelete = useCallback(
    (scriptName, havePermission) => () => {
      const data = havePermission
        ? {
            visible: true,
            title: t('title_delete_script', {
              scriptName: scriptName,
            }),
            message: t('message_delete_script', {
              scriptName: scriptName,
            }),
            leftButton: t('cancel'),
            rightButton: t('remove'),
            rightColor: Colors.Gray6,
            isDelete: true,
          }
        : {
            visible: true,
            title: t('title_delete_script', {
              scriptName: scriptName,
            }),
            message: t('you_do_not_have_permission_to', {
              doAction: t('delete_script').toLowerCase(),
            }),
            leftButton: t('ok'),
            rightButton: null,
            isDelete: true,
          };
      setStateAlertAction((action) => {
        return {
          ...action,
          ...data,
        };
      });
    },
    [t]
  );

  return [
    stateAlertAction,
    hideAlertAction,
    onShowRename,
    onShowActivityLog,
    onShowDelete,
  ];
};
export { useStateAlertAction };
