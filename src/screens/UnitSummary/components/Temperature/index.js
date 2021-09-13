import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import t, { useTranslations } from '../../../../hooks/Common/useTranslations';

import { Colors } from '../../../../configs';
import { Section, Today } from '../../../../commons';
import ItemTemperature from './ItemTemperature';
import ConfigHistoryChart from '../../../../commons/UnitSummary/ConfigHistoryChart';
import SvgHumidity from '../../../../../assets/images/Device/humidity.svg';
import SvgRain from '../../../../../assets/images/Device/rain-outline.svg';
import SvgTemperature from '../../../../../assets/images/Device/temperature.svg';
import SvgWind from '../../../../../assets/images/Device/wind.svg';

const getDataTemperature = (summaryDetail) => {
  return [
    {
      id: '0',
      svgMain: <SvgTemperature />,
      title: `${t('text_temperature')}`,
      value: `${summaryDetail.tempValue || t('loading')}`,
    },
    {
      id: '1',
      svgMain: <SvgHumidity />,
      title: `${t('text_humidity')}`,
      value: `${summaryDetail.humiValue || t('loading')}`,
    },
    {
      id: '2',
      svgMain: <SvgWind />,
      title: `${t('text_wind')}`,
      value: summaryDetail.windValue || t('loading'),
      des: `${t('text_win_direction')}: ${
        summaryDetail.windDirection || t('loading')
      }`,
    },
    {
      id: '3',
      svgMain: <SvgRain />,
      title: `${t('text_rain')}`,
      value: summaryDetail.rainValue || t('loading'),
    },
  ];
};

const Temperature = memo(({ summaryDetail }) => {
  const t = useTranslations();
  const { listConfigs } = summaryDetail;

  const showBoxHistory = useMemo(() => {
    return !!listConfigs;
  }, [listConfigs]);

  const dataTemperature = useMemo(
    () => getDataTemperature(summaryDetail),
    [summaryDetail]
  );

  return (
    <>
      <Section type={'border'}>
        <Today style={styles.textIndoor} />
        <View style={styles.boxTemperature}>
          {dataTemperature.map((item, index) => {
            const { title, value, des, svgMain } = item;

            return (
              <ItemTemperature
                title={title}
                value={value}
                des={des}
                svgMain={svgMain}
                key={index.toString()}
              />
            );
          })}
        </View>
      </Section>
      {showBoxHistory && (
        <Section type={'border'}>
          <ConfigHistoryChart
            configs={[
              {
                id: listConfigs.temp,
                title: t('text_temperature'),
                color: Colors.Blue10,
              },
              {
                id: listConfigs.humi,
                title: t('text_humidity'),
                color: Colors.Red6,
              },
            ]}
          />
        </Section>
      )}
    </>
  );
});

export default Temperature;

const styles = StyleSheet.create({
  textIndoor: {
    marginVertical: 16,
  },
  boxTemperature: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  rowAverage: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  txtAverage: {
    marginRight: 20,
  },
  boxLastDay: {
    paddingVertical: 24,
    borderRadius: 20,
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginTop: 16,
    marginBottom: 25,
    paddingHorizontal: 0,
  },
});
