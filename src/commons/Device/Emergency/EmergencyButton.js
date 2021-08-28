import React, { memo } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../Text';
import { Colors } from '../../../configs';
import { TESTID } from '../../../configs/Constants';
import SvgEmergencyButton from '../../../../assets/images/Emergency/emergency-button.svg';
import { Card } from '../../../commons/CardShadow';

const EmergencyButton = memo(({ emergency }) => {
  return (
    <Card title={t('button')}>
      <View style={styles.container}>
        <TouchableOpacity
          delayLongPress={3000}
          onLongPress={emergency}
          testID={TESTID.EMERGENCY_BUTTON}
        >
          <SvgEmergencyButton />
        </TouchableOpacity>
        <Text style={styles.emergencyDescription} type="Body">
          {t('press_and_hold_for_3_seconds_emergency')}
        </Text>
      </View>
    </Card>
  );
});

export default EmergencyButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyDescription: {
    color: Colors.Gray8,
    textAlign: 'center',
  },
});
