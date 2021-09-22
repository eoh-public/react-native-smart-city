import React, { memo, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { Colors, Theme } from '../../configs';
import useTitleHeader from '../../hooks/Common/useTitleHeader';
import { TESTID } from '../../configs/Constants';

import Text from '../../commons/Text';
import SvgSmile from '../../../assets/images/Feeling/smile.svg';
import SvgMeh from '../../../assets/images/Feeling/meh.svg';
import SvgFrown from '../../../assets/images/Feeling/frown.svg';
import SvgTired from '../../../assets/images/Feeling/tired.svg';
import SvgVeryTired from '../../../assets/images/Feeling/very-tired.svg';
import { useSCContextSelector } from '../../context';

const AQIGuide = memo(() => {
  const t = useTranslations();
  useTitleHeader(t('AQI Guide'));
  const language = useSCContextSelector((state) => state.language);
  const data = useMemo(
    () => ({
      titles: [
        {
          title: t('What is AQI?'),
          des: t('text_what_aqi'),
        },
        {
          title: t('Understanding the AQI'),
          des: t('text_understand_aqi'),
        },
      ],
      uvIndex: [
        {
          svg: <SvgSmile width={24} height={24} />,
          title: t('0 - 50 Good'),
          color: '#52C41A',
          des: t('text_0_50_aqi'),
        },
        {
          svg: <SvgMeh width={24} height={24} />,
          title: t('51 - 100 Moderate'),
          color: '#FADB14',
          des: t('text_51_100_aqi'),
        },
        {
          svg: <SvgFrown width={24} height={24} />,
          title: t('101 - 150 Unhealthy for Sensitive groups'),
          color: '#FA8C16',
          des: t('text_101_150_aqi'),
        },
        {
          svg: <SvgTired width={24} height={24} />,
          title: t('151 - 200 Unhealthy'),
          color: '#F5222D',
          des: t('text_151_200_aqi'),
        },
        {
          svg: <SvgVeryTired width={24} height={24} />,
          title: t('201 - 300 Very Unhealthy'),
          color: '#722ED1',
          des: t('text_201_300_aqi'),
        },
        {
          svg: <SvgVeryTired width={24} height={24} />,
          title: t('301 - 500 Hazardous'),
          color: '#9E1068',
          des: t('text_301_500_aqi'),
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const { titles, uvIndex } = data;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {titles.map((item, index) => {
          const { title, des } = item;
          return (
            <View key={index.toString()}>
              <Text
                testID={TESTID.AQI_GUIDE_MAIN_TITLE}
                semibold
                size={20}
                color={Colors.Gray9}
                style={styles.titles}
              >
                {title}
              </Text>
              <Text size={14} color={Colors.Gray8} style={styles.des}>
                {des}
              </Text>
            </View>
          );
        })}
        {uvIndex.map((item, index) => {
          const { title, color, des, svg } = item;
          return (
            <TouchableOpacity style={styles.containerUV} key={index.toString()}>
              <View
                style={{
                  ...styles.box,
                  backgroundColor: color,
                }}
              >
                {svg}
              </View>
              <View style={styles.contentBox}>
                <Text
                  testID={TESTID.AQI_GUIDE_UVINDEX_TITLE}
                  semibold
                  size={16}
                  color={color}
                >
                  {title}
                </Text>
                <Text size={14} color={Colors.Gray8}>
                  {des}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
});

export default AQIGuide;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.color.backgroundColor,
  },
  titles: {
    marginHorizontal: 16,
    lineHeight: 28,
    marginBottom: 8,
    marginTop: 24,
  },
  des: {
    marginHorizontal: 16,
  },
  containerUV: {
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
  },
  box: {
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentBox: {
    marginLeft: 16,
    flex: 1,
  },
});
