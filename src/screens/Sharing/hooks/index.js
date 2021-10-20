import { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import { API } from '../../../configs';
import Routes from '../../../utils/Route';
import { axiosDelete, axiosGet } from '../../../utils/Apis/axios';
import { ToastBottomHelper } from '../../../utils/Utils';

const useDataMember = (unitId) => {
  const t = useTranslations();
  const { navigate, addListener } = useNavigation();
  const [dataMembers, setDataMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefresh, setRefresh] = useState(false);

  const loadMembers = useCallback(async (id) => {
    const { success, data } = await axiosGet(API.SHARE.UNITS_MEMBERS(id));
    if (success) {
      setDataMembers(data);
    }
  }, []);

  const removeMember = useCallback(
    async (id, name) => {
      await axiosDelete(API.SHARE.UNITS_MEMBER_DETAIL(unitId, id));
      ToastBottomHelper.success(
        t('sharing_removed_user', {
          name,
        })
      );
      setDataMembers(dataMembers.filter((item) => item.share_id !== id));
    },
    [dataMembers, t, unitId]
  );
  const leaveUnit = useCallback(
    async (unitName) => {
      await axiosDelete(API.SHARE.UNITS_MEMBER_DETAIL(unitId, 'me'));
      ToastBottomHelper.success(t('sharing_you_left', { name: unitName }));
      setDataMembers([]);
      navigate(Routes.Dashboard);
    },
    [navigate, t, unitId]
  );

  const onRefresh = useCallback(async () => {
    setRefresh(true);
    await loadMembers(unitId);
    setRefresh(false);
  }, [unitId, loadMembers]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await loadMembers(unitId);
      setLoading(false);
    })();
  }, [loadMembers, unitId]);

  useEffect(() => {
    return addListener('focus', () => {
      onRefresh();
    });
  }, [addListener, onRefresh]);

  return {
    dataMembers,
    loading,
    leaveUnit,
    removeMember,
    loadMembers,
    isRefresh,
    onRefresh,
  };
};

const useStateAlertAction = () => {
  const t = useTranslations();
  const [stateAlertAction, setStateAlertAction] = useState({
    visible: false,
    title: '',
    message: '',
    leftButton: t('cancel'),
    rightButton: '',
    member: {},
  });
  const hideAlertAction = useCallback(() => {
    setStateAlertAction({ ...stateAlertAction, visible: false });
  }, [stateAlertAction]);
  const onPressRemoveUser = useCallback(
    (member) => {
      setStateAlertAction((action) => {
        let name = member.name || 'N/A';
        return {
          ...action,
          visible: true,
          title: t('sharing_remove_user', { name: name }),
          message: t('sharing_remove_user_message', { name: name }),
          rightButton: t('remove'),
          member: member,
        };
      });
    },
    [t]
  );
  const stateLeaveUnit = useCallback(() => {
    setStateAlertAction((action) => {
      return {
        ...action,
        visible: true,
        title: t('sharing_leave_unit'),
        message: t('sharing_leave_unit_message'),
        rightButton: t('leave'),
        member: null,
      };
    });
  }, [t]);

  return {
    stateAlertAction,
    hideAlertAction,
    onPressRemoveUser,
    stateLeaveUnit,
  };
};
export { useDataMember, useStateAlertAction };
