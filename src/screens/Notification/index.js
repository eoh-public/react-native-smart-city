import React, { memo, useMemo, useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from '@ant-design/react-native';

import styles from './styles/indexStyles';
import { API, Colors } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import { useTranslations } from '../../hooks/Common/useTranslations';
import NotificationItem from './components/NotificationItem';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';

let page = 1;

const Notification = memo(() => {
  const t = useTranslations();
  const [notifications, setNotifications] = useState([]);
  const [maxPageNotification, setMaxPageNotification] = useState(1);
  const rightComponent = useMemo(
    () => (
      <View style={styles.rightComponent}>
        <TouchableOpacity
          style={styles.iconPlus}
          onPress={() => alert(t('feature_under_development'))}
        >
          <Icon name={'plus'} size={27} color={Colors.Black} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => alert(t('feature_under_development'))}>
          <Icon name={'search'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const fetchNotifications = useCallback(async (pageParam) => {
    const { success, data } = await axiosGet(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(pageParam, '')
    );
    if (success) {
      setNotifications((preState) => preState.concat(data.results));
      setMaxPageNotification(Math.ceil(data.count / 10));
    }
  }, []);

  useEffect(() => {
    fetchNotifications(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnLoadMore = useCallback(() => {
    page += 1;
    if (page <= maxPageNotification) {
      fetchNotifications(page);
    }
  }, [maxPageNotification, fetchNotifications]);

  const onRefresh = useCallback(async () => {
    page = 1;
    const { success, data } = await axiosGet(
      API.NOTIFICATION.LIST_ALL_NOTIFICATIONS(1, '')
    );
    if (success) {
      setNotifications(data.results);
    }
  }, []);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('notifications')}
        rightComponent={rightComponent}
        onLoadMore={handleOnLoadMore}
        onRefresh={onRefresh}
        disableLoadMore={page >= maxPageNotification}
      >
        {notifications.map((item, index) => (
          <NotificationItem item={item} key={index} />
        ))}
      </WrapHeaderScrollable>
    </View>
  );
});

export default Notification;
