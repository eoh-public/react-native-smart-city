import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonPopup } from '../index';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../Text';
import { Colors } from '../../configs';

const AlertSendConfirm = ({
  showAlertConfirm,
  countDown,
  onCancelConfirmAlert,
  onSendNowAlert,
  onHide,
  unit,
  station,
}) => {
  const t = useTranslations();
  return (
    <ButtonPopup
      rowButton
      visible={showAlertConfirm}
      mainTitle={t('text_send_now')}
      secondaryTitle={t('cancel').toUpperCase()}
      onClose={onCancelConfirmAlert}
      onPressSecondary={onCancelConfirmAlert}
      onPressMain={onSendNowAlert}
      onHide={onHide}
      bodyStyle={styles.buttonPopupBody}
    >
      <View style={styles.firstInfo}>
        <IconOutline name="clock-circle" size={42} style={styles.clock} />
        <Text semibold type="H4" style={styles.textAlertWillBe}>
          {t('alert_will_be_sent_in')}
        </Text>
        <Text semibold style={styles.countdownAlert}>
          0{countDown.seconds}
        </Text>
      </View>
      <View style={styles.secondInfo}>
        <Text type="H4" style={styles.textYourLocation}>
          {t('your_location_info')}
        </Text>
        <Text
          type="Body"
          style={styles.textLocation}
        >{`${unit.name} - ${station.name}`}</Text>
        <Text type="Body" style={styles.textAddress}>
          {unit.address}
        </Text>
      </View>
    </ButtonPopup>
  );
};

export { AlertSendConfirm };

const styles = StyleSheet.create({
  clock: {
    color: Colors.Gray6,
    marginBottom: 15,
  },
  buttonPopupBody: {
    padding: 0,
  },
  countdownAlert: {
    color: Colors.Red6,
    fontSize: 56,
    lineHeight: 64,
  },
  firstInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
  },
  secondInfo: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  textAlertWillBe: {
    marginBottom: 16,
  },
  textYourLocation: {
    marginBottom: 16,
  },
  textLocation: {
    marginBottom: 8,
  },
  textAddress: {
    textAlign: 'center',
  },
});
