import React, { memo, useCallback, useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { t } from 'i18n-js';

import { Colors, Theme } from '../../configs';
import Text from '../../commons/Text';
import useTitleHeader from '../../hooks/Common/useTitleHeader';
import { TESTID } from '../../configs/Constants';

const UVIndexGuide = memo(() => {
  useTitleHeader(t('UV Index Guide'));
  const language = useSelector((state) => state.language);

  const data = useMemo(
    () => ({
      titles: [
        {
          title: t('What is UV Index?'),
          des: t('text_what_uv'),
        },
        {
          title: t('Understanding the UV Index'),
          des: t('text_understand_uv'),
        },
      ],
      uvIndex: [
        {
          type: 'Low',
          title: t('1-2 Low'),
          color: '#52C41A',
          des: t('text_1_2_uv'),
        },
        {
          type: 'Moderate',
          title: t('3-5 Moderate'),
          color: '#FADB14',
          des: t('text_3_5_uv'),
        },
        {
          type: 'High',
          title: t('6-7 High'),
          color: '#FA8C16',
          des: t('text_6_7_uv'),
        },
        {
          type: 'Very High',
          title: t('8-10 Very High'),
          color: '#F5222D',
          des: t('text_8_10_uv'),
        },
        {
          type: 'Extreme',
          title: t('11+ Extreme'),
          color: '#722ED1',
          des: t('text_11+_uv'),
        },
      ],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [language]
  );

  const { titles, uvIndex } = data;

  const onPress = useCallback((item) => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {titles.map((item, index) => {
          const { title, des } = item;
          return (
            <View key={index.toString()}>
              <Text
                semibold
                size={20}
                color={Colors.Gray9}
                style={styles.titles}
                testID={TESTID.UV_INDEX_GUIDE_TITLE}
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
          const { title, color, des } = item;
          return (
            <TouchableOpacity
              style={styles.containerUV}
              key={index.toString()}
              onPress={() => onPress(item)}
            >
              <View
                style={{
                  ...styles.box,
                  backgroundColor: color,
                }}
              />
              <View style={styles.contentBox}>
                <Text semibold size={16} color={color}>
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

export default UVIndexGuide;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
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
  },
  contentBox: {
    marginLeft: 16,
    flex: 1,
  },
});
