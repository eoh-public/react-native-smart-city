import React, { memo, useCallback, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';

import styles from '../styles/NotificationItemStyles';
import Text from '../../../commons/Text';
import { Colors, API } from '../../../configs';
import IconComponent from '../../../commons/IconComponent';
import { NOTIFICATION_TYPES } from '../../../configs/Constants';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import { axiosPost } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';

const NotificationItem = memo(({ item }) => {
  const t = useTranslations();
  const navigation = useNavigation();
  const { id, icon, created_at, is_read, params, content_code } = item;
  const [isRead, setIsRead] = useState(is_read);
  const timeFormat = moment(created_at).format('LT DD/MM/YYYY');
  let arrParams = useMemo(() => {
    const values = [];
    const paramsJSON = JSON.parse(params.replace(/'/g, '"'));
    Object.entries(paramsJSON).forEach(([key, value]) => {
      values.push(value);
    });
    return values;
  }, [params]);

  const customColorText = (text, params) => {
    return text.split('**').map((str, i) =>
      i % 2 === 0 ? (
        <Text type="Body" key={i}>
          {str}
        </Text>
      ) : (
        <Text type="Body" bold key={i}>
          {params[(i - 1) / 2]}
        </Text>
      )
    );
  };

  const renderItem = useCallback(() => {
    const paramsJSON = JSON.parse(params.replace(/'/g, '"'));
    const booking_id = paramsJSON.booking_id && paramsJSON.booking_id;
    switch (content_code) {
      case NOTIFICATION_TYPES.NOTIFY_INVITE_MEMBER:
        const unitId = paramsJSON?.unit_id;
        return {
          content: customColorText(
            t('text_notification_content_invite_member'),
            arrParams
          ),
          redirect: () => {
            navigation.navigate(Routes.UnitStack, {
              screen: Routes.UnitDetail,
              params: {
                unitId,
              },
            });
          },
          textInviteMember: t('accept_invitation'),
        };
      case NOTIFICATION_TYPES.REMIND_TO_MAKE_PAYMENT:
        return {
          content: customColorText(
            t('text_notification_content_remind_to_make_payment'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };

      case NOTIFICATION_TYPES.EXPIRE_PARKING_SESSION:
        return {
          content: customColorText(
            t('text_notification_content_expire_parking_session'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
      case NOTIFICATION_TYPES.REMIND_TO_SCAN_QR_CODE:
        return {
          content: customColorText(
            t('text_notification_content_remind_to_scan_qr_code'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
      case NOTIFICATION_TYPES.USER_CANCEL:
        return {
          content: customColorText(
            t('text_notification_content_user_cancel'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.MyBookingList,
              params: { tab: 1 },
            }),
        };
      case NOTIFICATION_TYPES.SYSTEM_CANCEL_NO_PAYMENT:
        return {
          content: customColorText(
            t('text_notification_content_system_cancel_no_payment'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.MyBookingList,
              params: { tab: 1 },
            }),
        };
      case NOTIFICATION_TYPES.BOOKING_SUCCESSFULLY:
        return {
          content: customColorText(
            t('text_notification_content_booking_successfully'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
      case NOTIFICATION_TYPES.PARKING_COMPLETED:
        return {
          content: customColorText(
            t('text_notification_content_parking_completed'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.MyBookingList,
              params: { tab: 1 },
            }),
        };
      case NOTIFICATION_TYPES.BOOKING_EXPIRED_AND_VIOLATION_CREATED:
        const violated_booking_id = paramsJSON.violated_booking_id;
        return {
          content: customColorText(
            t(
              'text_notification_content_not_move_car_after_parking_session_expire'
            ),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: violated_booking_id || booking_id },
            }),
        };
      case NOTIFICATION_TYPES.MOVE_CAR_WITHOUT_PAY_VIOLATION:
        return {
          content: customColorText(
            t('text_notification_content_move_car_without_pay_violation'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
      case NOTIFICATION_TYPES.PAY_FINE_SUCCESSFULLY:
        return {
          content: customColorText(
            t('text_notification_content_pay_fine_successfully'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
      case NOTIFICATION_TYPES.PAY_FINE_AND_EXTEND_SUCCESSFULLY:
        const new_booking_id = paramsJSON.booking_id_new;
        return {
          content: customColorText(
            t('text_notification_content_pay_fine_and_extend_successfully'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: new_booking_id },
            }),
        };
      case NOTIFICATION_TYPES.STOP_VIOLATION_FREE_PARKING_ZONE:
        return {
          content: customColorText(
            t('text_notification_content_stop_violation_free_parking_zone'),
            arrParams
          ),
          redirect: () =>
            navigation.navigate(Routes.SmartParkingStack, {
              screens: Routes.SmartParkingBookingDetails,
              params: { id: booking_id },
            }),
        };
    }
  }, [arrParams, content_code, navigation, params, t]);

  const { content, redirect, textInviteMember } = renderItem() || {};

  const onItemPress = useCallback(() => {
    if (!isRead) {
      axiosPost(API.NOTIFICATION.SET_READ(id));
    }
    redirect && redirect();
    setIsRead(true);
  }, [id, isRead, redirect]);

  return (
    <TouchableOpacity onPress={onItemPress}>
      <View style={[styles.container, !isRead && styles.backgroundGray]}>
        <View style={styles.wrapIcon}>
          {textInviteMember ? (
            <IconComponent
              icon_outlined={'usergroup-add'}
              style={styles.iconInviteMember}
            />
          ) : (
            <IconComponent iconKit={icon} style={styles.iconNotification} />
          )}
        </View>

        <View style={styles.viewRight}>
          <Text type="Body" color={Colors.Gray9}>
            {content}
          </Text>
          <Text color={Colors.Gray7} type="Label" style={[styles.time]}>
            {timeFormat}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

export default NotificationItem;
