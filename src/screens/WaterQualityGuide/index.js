import React, { memo, useCallback, useMemo } from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { t } from 'i18n-js';

import Text from '../../commons/Text';
import { Colors, Theme } from '../../configs';
import useTitleHeader from '../../hooks/Common/useTitleHeader';
import { TESTID } from '../../configs/Constants';
import { useSCContextSelector } from '../../context';

const WaterQualityGuide = memo(({ route }) => {
  const { waterType } = route.params;
  const language = useSCContextSelector((state) => state.language);

  const cloGuide = useMemo(
    () => ({
      headerTitle: t('clo_guide'),
      titles: [
        {
          title: t('what_is_clo'),
          des: t('text_what_clo'),
        },
        {
          title: t('recommended_clo_level'),
          des: t('text_recommended_clo'),
        },
      ],
      level: [
        {
          type: 'Low',
          title: t('text_low_level'),
          color: Colors.Yellow6,
          des: t('text_clo_low_range'),
        },
        {
          type: 'Good',
          title: t('text_moderate_level'),
          color: Colors.Green6,
          des: t('text_clo_good_range'),
        },
        {
          type: 'High',
          title: t('text_high_level'),
          color: Colors.Red6,
          des: t('text_clo_high_range'),
        },
      ],
      titles1: [],
      level1: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const turbidityGuide = useMemo(
    () => ({
      headerTitle: t('turbidity_guide'),
      titles: [
        {
          title: t('what_is_turbidity'),
          des: t('text_what_is_turbidity'),
        },
        {
          title: t('turbidity_for_drinking'),
          des: t('text_turbidity_for_drinking'),
        },
      ],
      level: [
        {
          type: 'Very Good',
          title: t('text_very_good_level'),
          color: Colors.Green6,
          des: t('text_turbidity_very_good_range'),
        },
        {
          type: 'Good',
          title: t('text_good_level'),
          color: Colors.Yellow6,
          des: t('text_turbidity_good_range'),
        },
        {
          type: 'Moderate',
          title: t('text_moderate_level'),
          color: Colors.Orange6,
          des: t('text_turbidity_moderate_range'),
        },
        {
          type: 'Poor',
          title: t('text_poor_level'),
          color: Colors.Red6,
          des: t('text_turbidity_poor_range'),
        },
        {
          type: 'Very Poor',
          title: t('text_very_poor_level'),
          color: Colors.Purple6,
          des: t('text_turbidity_very_poor_range'),
        },
      ],
      titles1: [],
      level1: [],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const phGuide = useMemo(
    () => ({
      headerTitle: t('ph_guide'),
      titles: [
        {
          title: t('what_is_ph'),
          des: t('text_what_ph'),
        },
        {
          title: t('ph_for_drinking'),
          des: t('text_ph_for_drinking'),
        },
      ],
      level: [
        {
          type: 'Very Good',
          title: t('text_very_good_level'),
          color: Colors.Green6,
          des: t('text_ph_very_good_range'),
        },
        {
          type: 'Good',
          title: t('text_good_level'),
          color: Colors.Yellow6,
          des: t('text_ph_good_range'),
        },
        {
          type: 'Moderate',
          title: t('text_moderate_level'),
          color: Colors.Orange6,
          des: t('text_ph_moderate_range'),
        },
        {
          type: 'Poor',
          title: t('text_poor_level'),
          color: Colors.Red6,
          des: t('text_ph_poor_range'),
        },
        {
          type: 'Very Poor',
          title: t('text_very_poor_level'),
          color: Colors.Purple6,
          des: t('text_ph_very_poor_range'),
        },
      ],
      titles1: [
        {
          title: t('ph_scale'),
          des: t('text_ph_scale'),
        },
      ],
      level1: [
        {
          title: t('ph_battery_acid_level'),
          color: Colors.Red6,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_gastic_acid_level'),
          color: Colors.Red5,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_hydrochloric_acid_level'),
          color: Colors.Red4,
          des: t('acidic'),
          desColor: Colors.Red6,
        },
        {
          title: t('ph_rain_acid_level'),
          color: Colors.Red3,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_black_coffee_level'),
          color: Colors.Red2,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_urine_saliva_level'),
          color: Colors.Red1,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_pure_water_level'),
          color: Colors.Gray2,
          des: t('neutral'),
          desColor: Colors.Gray6,
        },
        {
          title: t('ph_sea_water_level'),
          color: Colors.Blue1,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_baking_soda_level'),
          color: Colors.Blue2,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_milk_of_magnesia_level'),
          color: Colors.Blue3,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_ammonia_level'),
          color: Colors.Blue4,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_soapy_water_level'),
          color: Colors.Blue5,
          des: t('alkaline'),
          desColor: Colors.Blue6,
        },
        {
          title: t('ph_bleach_level'),
          color: Colors.Blue6,
          des: null,
          desColor: null,
        },
        {
          title: t('ph_drain_cleaner_level'),
          color: Colors.Blue7,
          des: null,
          desColor: null,
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const getWaterGuideByType = useCallback(
    (type) => {
      let data = turbidityGuide; // default guide

      if (type === 'turbidity') {
        data = turbidityGuide;
      } else if (type === 'clo') {
        data = cloGuide;
      } else if (type === 'ph') {
        data = phGuide;
      }
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useTitleHeader(data.headerTitle);
      return data;
    },
    [cloGuide, phGuide, turbidityGuide]
  );

  const data = getWaterGuideByType(waterType);
  const { titles, level, titles1, level1 } = data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.wrapScroll}>
          {titles.map((item, index) => {
            const { title, des } = item;
            return (
              <View key={index.toString()}>
                <Text
                  testID={TESTID.WATER_QUALITY_GUIDE_TITLE}
                  semibold
                  size={20}
                  color={Colors.Gray9}
                  style={styles.titles}
                >
                  {title}
                </Text>
                <Text
                  testID={TESTID.WATER_QUALITY_GUIDE_DESCRIPTION}
                  size={14}
                  color={Colors.Gray8}
                  style={styles.des}
                >
                  {des}
                </Text>
              </View>
            );
          })}
          {level.map((item, index) => {
            const { title, color, des } = item;
            return (
              <View style={styles.containerLevel} key={index.toString()}>
                <View
                  style={{
                    ...styles.box,
                    backgroundColor: color,
                  }}
                />
                <View style={styles.contentBox}>
                  <Text
                    testID={TESTID.WATER_QUALITY_GUIDE_TITLE_LEVEL}
                    semibold
                    size={16}
                    color={color}
                  >
                    {title}
                  </Text>
                  <Text
                    testID={TESTID.WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL}
                    size={14}
                    color={Colors.Gray8}
                  >
                    {des}
                  </Text>
                </View>
              </View>
            );
          })}
          {titles1.map((item, index) => {
            const { title, des } = item;
            return (
              <View key={index.toString()} style={styles.wrapEachTitle1}>
                <Text
                  testID={TESTID.WATER_QUALITY_GUIDE_TITLE1}
                  semibold
                  size={20}
                  color={Colors.Gray9}
                  style={styles.titles}
                >
                  {title}
                </Text>
                <Text
                  testID={TESTID.WATER_QUALITY_GUIDE_DESCRIPTION1}
                  size={14}
                  color={Colors.Gray8}
                  style={styles.des}
                >
                  {des}
                </Text>
              </View>
            );
          })}
          {level1.map((item, index) => {
            const { title, color, des, desColor } = item;
            return (
              <View style={styles.containerLevel1} key={index.toString()}>
                <View style={styles.level1WrapTitle}>
                  <Text
                    testID={TESTID.WATER_QUALITY_GUIDE_TITLE_LEVEL1}
                    style={styles.level1Title}
                  >
                    {title}
                  </Text>
                </View>
                <View style={styles.level1WrapDes}>
                  <View style={{ ...styles.box1, backgroundColor: color }}>
                    <Text style={styles.level1DesIndex}>{index + 1}</Text>
                  </View>
                  <View>
                    <Text
                      testID={TESTID.WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL1}
                      style={{
                        ...styles.level1PhType,
                        color: desColor ?? Colors.Black,
                      }}
                    >
                      {des}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default WaterQualityGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.backgroundColor,
  },
  wrapScroll: {
    marginBottom: 28,
  },
  titles: {
    marginHorizontal: 16,
    lineHeight: 28,
    marginBottom: 8,
    marginTop: 24,
  },
  des: {
    marginHorizontal: 16,
    lineHeight: 28,
  },
  containerLevel: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
  },
  containerLevel1: {
    flexDirection: 'row',
    marginTop: 2,
    marginHorizontal: 16,
    flex: 1,
  },
  wrapEachTitle1: {
    marginBottom: 14,
  },
  level1WrapTitle: {
    flex: 5,
  },
  level1WrapDes: {
    flex: 5,
    flexDirection: 'row',
  },
  level1Title: {
    textAlign: 'right',
    fontSize: 16,
    marginRight: 24,
    height: 40,
    textAlignVertical: 'center',
  },
  level1DesIndex: {
    fontSize: 16,
    textAlign: 'center',
    height: 40,
    textAlignVertical: 'center',
  },
  level1PhType: {
    position: 'absolute',
    fontSize: 20,
    transform: [{ rotate: '90deg' }],
    left: -28,
    bottom: 8,
    width: 115,
    height: 28,
    textAlign: 'center',
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  box1: {
    width: 127,
    height: 40,
    borderRadius: 1,
  },
  contentBox: {
    marginLeft: 16,
    flex: 1,
  },
});
