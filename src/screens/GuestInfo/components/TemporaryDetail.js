import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';
import Text from '../../../commons/Text';
import { Colors } from '../../../configs';
import styles from '../styles/AccessScheduleDetailStyles';
import { TESTID } from '../../../configs/Constants';

const TemporaryDetail = ({
  onShowSetDateTime,
  temporaryTimeStart,
  temporaryTimeEnd,
  setTemporaryTimeStart,
  setTemporaryTimeEnd,
}) => {
  const t = useTranslations();
  const onSetTimeStart = useCallback(() => {
    onShowSetDateTime(temporaryTimeStart, setTemporaryTimeStart, 'datetime');
  }, [onShowSetDateTime, temporaryTimeStart, setTemporaryTimeStart]);

  const onSetTimeEnd = useCallback(() => {
    onShowSetDateTime(temporaryTimeEnd, setTemporaryTimeEnd, 'datetime');
  }, [onShowSetDateTime, temporaryTimeEnd, setTemporaryTimeEnd]);

  return (
    <View>
      <Text type="Body" color={Colors.Gray8} style={styles.title}>
        {t('start')}
      </Text>
      <TouchableOpacity
        onPress={onSetTimeStart}
        testID={TESTID.TEMPORARY_TEXT_BUTTON}
      >
        <Text type="Body" color={Colors.Orange} style={styles.value}>
          {temporaryTimeStart.format('hh:mm A DD/MM/YYYY')}
        </Text>
      </TouchableOpacity>
      <Text type="Body" color={Colors.Gray8} style={styles.title}>
        {t('end')}
      </Text>
      <TouchableOpacity
        onPress={onSetTimeEnd}
        testID={TESTID.TEMPORARY_TEXT_BUTTON}
      >
        <Text type="Body" color={Colors.Orange} style={styles.value}>
          {temporaryTimeEnd.format('hh:mm A DD/MM/YYYY')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TemporaryDetail;
