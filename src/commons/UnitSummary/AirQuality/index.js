import React, { memo, useCallback, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { IconOutline } from '@ant-design/icons-react-native';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import { Colors } from '../../../configs';
import { Section } from '../../../commons/index';
import Text from '../../../commons/Text';
import ConfigHistoryChart from '../ConfigHistoryChart';

import SegmentedRoundDisplay from './SegmentedRoundDisplay';
import { TESTID } from '../../../configs/Constants';
import styles from './styles';

const AirQuality = memo(({ summaryDetail }) => {
  const t = useTranslations();
  const {
    outdoor_pm10_id,
    outdoor_pm2_5_id,
    outdoor_co_id,
    outdoorColor,
    outdoorColorLight,
    outdoorStatus,
    outdoorIcon,
    advices,
  } = summaryDetail;
  const outdoorValues = [];
  if (summaryDetail.outdoor_pm2_5_value !== null) {
    outdoorValues.push({
      id: '0',
      title: 'PM2.5',
      value:
        summaryDetail.outdoor_pm2_5_value !== undefined
          ? summaryDetail.outdoor_pm2_5_value
          : t('loading'),
      color: summaryDetail.outdoor_pm2_5_color,
    });
  }
  if (summaryDetail.outdoor_pm10_value !== null) {
    outdoorValues.push({
      id: '1',
      title: 'PM10',
      value:
        summaryDetail.outdoor_pm10_value !== undefined
          ? summaryDetail.outdoor_pm10_value
          : t('loading'),
      color: summaryDetail.outdoor_pm10_color,
    });
  }
  if (summaryDetail.outdoor_co_value !== null) {
    outdoorValues.push({
      id: '2',
      title: 'CO',
      value:
        summaryDetail.outdoor_co_value !== undefined
          ? summaryDetail.outdoor_co_value
          : t('loading'),
      color: summaryDetail.outdoor_co_color,
    });
  }

  const showBoxHistory = useMemo(() => {
    return outdoor_pm10_id || outdoor_pm2_5_id || outdoor_co_id ? true : false;
  }, [outdoor_pm10_id, outdoor_pm2_5_id, outdoor_co_id]);

  const [indexOutdoor, setIndexOutdoor] = useState(0);
  const onSelectOutdoor = useCallback((i) => {
    setIndexOutdoor(i);
  }, []);

  return (
    <View>
      {!!outdoorValues.length && (
        <Section type={'border'} style={styles.boxOutdoor}>
          <Text semibold style={styles.textOutdoor}>
            {t('text_outdoor')}
          </Text>
          <View style={styles.boxStatus}>
            <View
              style={[styles.boxEmotion, { backgroundColor: outdoorColor }]}
            >
              <IconOutline name={outdoorIcon} size={35} />
            </View>
            <View
              style={[
                styles.boxTextStatus,
                { backgroundColor: outdoorColorLight },
              ]}
            >
              <Text semibold style={styles.textStatus}>
                {outdoorStatus}
              </Text>
            </View>
          </View>
          <View style={styles.boxOutdoorValues}>
            {outdoorValues.map((item, i) => {
              let active = i === indexOutdoor;
              const borderWidth = active ? 0 : 1;
              return (
                <TouchableOpacity
                  testID={TESTID.AIR_QUALITY_OUTDOOR_VALUE_TOUCH}
                  style={[
                    styles.touchOption,
                    {
                      backgroundColor: active ? Colors.Primary : Colors.White,
                      borderWidth: borderWidth,
                    },
                  ]}
                  key={i}
                  onPress={() => onSelectOutdoor(i)}
                >
                  <Text size={14} color={active ? Colors.White : Colors.Gray8}>
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <SegmentedRoundDisplay
            filledArcColor={outdoorValues[indexOutdoor].color}
            value={outdoorValues[indexOutdoor].value}
            valueText={outdoorValues[indexOutdoor].value}
            totalValue={500}
            title={outdoorValues[indexOutdoor].title}
            style={styles.segment}
            textHeader={t('text_air_quality_index')}
          />
          {!!advices && !!advices.length && (
            <View style={styles.boxHealth}>
              <IconOutline name="alert" size={20} style={styles.iconMargin} />
              <Text semibold color={Colors.Gray9} size={16}>
                {t('Health advices:')}
              </Text>
            </View>
          )}
          {!!advices &&
            advices.map((item, index) => {
              return (
                <View key={index} style={styles.boxContentHealth}>
                  <View
                    style={[styles.boxDot, { backgroundColor: outdoorColor }]}
                  />
                  <Text
                    testID={TESTID.AIR_QUALITY_OUTDOOR_ADVICE_TEXT}
                    color={Colors.Gray7}
                    size={14}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
        </Section>
      )}
      {showBoxHistory && (
        <Section type={'border'}>
          <ConfigHistoryChart
            configs={[
              { id: outdoor_pm2_5_id, title: 'PM2.5', color: 'red' },
              { id: outdoor_pm10_id, title: 'PM10', color: 'blue' },
              { id: outdoor_co_id, title: 'CO', color: 'orange' },
            ]}
          />
        </Section>
      )}
    </View>
  );
});

export default AirQuality;
