import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { ButtonPopup } from '../index';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { IconFill } from '@ant-design/icons-react-native';
import Text from '../Text';
import { Colors } from '../../configs';

const AlertSent = ({
  showAlertSent,
  onClose,
  onPressSecondary,
  onPressMain,
  onPressThird,
  unit,
  station,
  isDashboard,
}) => {
  const t = useTranslations();
  const data = useMemo(() => {
    if (isDashboard) {
      return {
        secondaryTitle: t('dismiss'),
        title: t('emergency_alert'),
        message: t('the_emergency_button_has_been_activated'),
        thirdTitle: null,
        typeMain: 'alert',
        typeSecondary: 'cancel',
        typeThird: null,
      };
    } else {
      return {
        title: t('alert_sent'),
        message: t('please_standby_your_requesting_for_help'),
        typeMain: 'alertBorder',
      };
    }
  }, [isDashboard, t]);

  return (
    <ButtonPopup
      rowButton
      visible={showAlertSent}
      mainTitle={t('view_details')}
      secondaryTitle={data.secondaryTitle}
      thirdTitle={data.thirdTitle}
      onClose={onClose}
      onPressSecondary={onPressSecondary}
      onPressMain={onPressMain}
      onPressThird={onPressThird}
      bodyStyle={styles.buttonPopupBody}
      typeMain={data.typeMain}
      typeSecondary={data.typeSecondary}
      typeThird={data.typeThird}
    >
      <Text
        type="H5"
        style={styles.location}
      >{`${unit.name} - ${station.name}`}</Text>
      <IconFill name="alert" size={42} style={styles.alert} />
      <Text semibold style={styles.textAlertSent}>
        {data.title}
      </Text>
      <Text type="H4" style={styles.textPleaseStandby}>
        {data.message}
        {isDashboard && (
          <Text type="H4" semibold>
            {` ${unit.name}: ${station.name}.`}
          </Text>
        )}
      </Text>
    </ButtonPopup>
  );
};

export { AlertSent };

const styles = StyleSheet.create({
  location: {
    marginBottom: 19,
  },
  alert: {
    color: Colors.Red6,
    marginBottom: 19,
  },
  textAlertSent: {
    fontSize: 30,
    lineHeight: 35,
    color: Colors.Red6,
    marginBottom: 24,
  },
  textPleaseStandby: {
    textAlign: 'center',
  },
  buttonPopupBody: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
});
