import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AlertStatusMachine from './WaterPurifierStatus/AlertStatusMachine';
import { TESTID } from '../../configs/Constants';
import { Colors } from '../../configs';
import { useTranslations } from '../../hooks/Common/useTranslations';

const DeviceAlertStatus = memo(
  ({ data, style, offsetTitle, setOffsetTitle }) => {
    const t = useTranslations();
    const listStatus = data.filter((item) => item.value === 1);

    useEffect(() => {
      if (!!listStatus.length && offsetTitle !== listStatus.length) {
        !!listStatus.length &&
          setOffsetTitle &&
          setOffsetTitle(listStatus.length);
      }
    }, [listStatus.length, offsetTitle, setOffsetTitle]);

    const stylesOffset = StyleSheet.create({
      moveDownOffset: {
        top: 50 - 10,
      },
    });

    const getColorStyle = (status) => {
      let _styles = StyleSheet.create({
        green: {
          backgroundColor: Colors.Green1,
          borderColor: Colors.Green6,
        },
        yellow: {
          backgroundColor: Colors.BGNotRain,
          borderColor: Colors.Yellow6,
        },
        red: {
          backgroundColor: Colors.Red1,
          borderColor: Colors.Red6,
        },
      });

      switch (status) {
        case 'tank_is_full':
          return _styles.green;
        case 'insufficient_water_input':
          return _styles.yellow;
        case 'exceed_5_filter':
          return _styles.yellow;
        case 'check_water_leak':
          return _styles.red;
        default:
          return _styles.green;
      }
    };

    const getIcon = (status) => {
      switch (status) {
        case 'tank_is_full':
          return 'check-circle';
        case 'insufficient_water_input':
          return 'warning';
        case 'exceed_5_filter':
          return 'warning';
        case 'check_water_leak':
          return 'warning';
        default:
          return 'check-circle';
      }
    };

    return (
      <View style={[style, stylesOffset.moveDownOffset]}>
        {listStatus &&
          listStatus.map((status) => (
            <AlertStatusMachine
              testID={TESTID.ALERT_STATUS_MACHINE}
              message={
                (status.standard && t(status.standard)) ||
                t('tank_working_normally')
              }
              style={{
                ...styles.alert,
                ...getColorStyle(
                  (status && status.standard) || 'tank_working_normally'
                ),
              }}
              icon={getIcon(
                (status && status.standard) || 'tank_working_normally'
              )}
            />
          ))}
      </View>
    );
  }
);

export default DeviceAlertStatus;

const styles = StyleSheet.create({
  alert: {
    paddingVertical: 9,
    marginRight: 16,
    marginBottom: 10,
  },
});
