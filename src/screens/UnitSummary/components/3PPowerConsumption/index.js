import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../../../../commons/Text';
import { API, Colors } from '../../../../configs';
import moment from 'moment';
import { Section, Today } from '../../../../commons';
import ListQualityIndicator from '../../../../commons/Device/WaterQualitySensor/ListQualityIndicator';
import PMSensorIndicatior from '../../../../commons/Device/PMSensor/PMSensorIndicatior';
import ConfigHistoryChart from '../../../../commons/UnitSummary/ConfigHistoryChart';
import { useTranslations } from '../../../../hooks/Common/useTranslations';
import HistoryChart from '../../../../commons/Device/HistoryChart';
import { axiosGet } from '../../../../utils/Apis/axios';
import { TESTID } from '../../../../configs/Constants';

const ThreePhasePowerConsumption = memo(({ unit, summary, summaryDetail }) => {
  const t = useTranslations();
  const {
    volt1Value,
    volt2Value,
    volt3Value,
    current1Value,
    current2Value,
    current3Value,
    activePowerValue,
    powerFactor1Value,
    powerFactor2Value,
    powerFactor3Value,
    totalPowerValue,
    listConfigs,
  } = summaryDetail;

  const volt1Item = {
    id: 1,
    color: Colors.Red6,
    standard: 'Voltage 1',
    value: volt1Value,
    measure: '',
  };
  const volt2Item = {
    id: 2,
    color: Colors.Red6,
    standard: 'Voltage 2',
    value: volt2Value,
    measure: '',
  };
  const volt3Item = {
    id: 3,
    color: Colors.Red6,
    standard: 'Voltage 3',
    value: volt2Value,
    measure: '',
  };

  const current1Item = {
    id: 4,
    color: Colors.Blue10,
    standard: 'Current 1',
    value: current1Value,
    measure: '',
  };
  const current2Item = {
    id: 5,
    color: Colors.Blue10,
    standard: 'Current 2',
    value: current2Value,
    measure: '',
  };
  const current3Item = {
    id: 6,
    color: Colors.Blue10,
    standard: 'Current 3',
    value: current3Value,
    measure: '',
  };

  const activeItem = {
    id: 7,
    color: Colors.Orange,
    standard: 'Active Power',
    value: activePowerValue,
    measure: '',
  };

  const powerFactor1Item = {
    id: 8,
    color: Colors.Green6,
    standard: 'Power Factor 1',
    value: powerFactor1Value,
    measure: '',
  };
  const powerFactor2Item = {
    id: 9,
    color: Colors.Green6,
    standard: 'Power Factor 2',
    value: powerFactor2Value,
    measure: '',
  };
  const powerFactor3Item = {
    id: 10,
    color: Colors.Green6,
    standard: 'Power Factor 3',
    value: powerFactor3Value,
    measure: '',
  };

  const totalPower = {
    id: 11,
    color: Colors.Green7,
    standard: 'Total Power Consumption',
    value: totalPowerValue,
    measure: '',
  };

  const dataList = [];
  volt1Value !== undefined && dataList.push(volt1Item);
  volt2Value !== undefined && dataList.push(volt2Item);
  volt3Value !== undefined && dataList.push(volt3Item);

  current1Value !== undefined && dataList.push(current1Item);
  current2Value !== undefined && dataList.push(current2Item);
  current3Value !== undefined && dataList.push(current3Item);

  activePowerValue !== undefined && dataList.push(activeItem);

  powerFactor1Value !== undefined && dataList.push(powerFactor1Item);
  powerFactor2Value !== undefined && dataList.push(powerFactor2Item);
  powerFactor3Value !== undefined && dataList.push(powerFactor3Item);

  const dataTotal = [];
  dataTotal.push(totalPower);

  const showBoxHistory = useMemo(() => {
    return !!listConfigs;
  }, [listConfigs]);

  const listIdsConfig = useMemo(() => {
    return listConfigs;
  }, [listConfigs]);

  const [startDate, setStartDate] = useState(
    moment().subtract(7, 'days').valueOf()
  );
  const [endDate, setEndDate] = useState(moment().valueOf());
  const [getData, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let params = new URLSearchParams();
      params.append('config', listConfigs.total_power);
      params.append('date_from', new Date(startDate).setHours(0, 0) / 1000);
      params.append('date_to', new Date(endDate).setHours(23, 59) / 1000);
      const { success, data } = await axiosGet(
        API.POWER_CONSUME.DISPLAY_HISTORY,
        {
          params,
        }
      );
      if (success) {
        setData(data);
      }
    };
    if (listConfigs?.total_power) {
      fetchData();
    }
  }, [startDate, endDate, listConfigs]);
  return (
    <>
      <Section type={'border'}>
        <Today style={styles.textIndoor} />
        <ListQualityIndicator
          data={dataList}
          style={styles.styleList}
          testID={TESTID.LIST_QUALITY_INDICATOR_3PC}
        />
        {showBoxHistory && (
          <View>
            <ConfigHistoryChart
              configs={[
                {
                  id: listIdsConfig.volt_1,
                  title: 'Volt 1',
                  color: Colors.Red6,
                },
                {
                  id: listIdsConfig.volt_2,
                  title: 'Volt 2',
                  color: Colors.Red8,
                },
                {
                  id: listIdsConfig.volt_3,
                  title: 'Volt 3',
                  color: Colors.Red9,
                },
                {
                  id: listIdsConfig.current_1,
                  title: 'Current 1',
                  color: Colors.Blue10,
                },
                {
                  id: listIdsConfig.current_2,
                  title: 'Current 2',
                  color: Colors.Blue11,
                },
                {
                  id: listIdsConfig.current_3,
                  title: 'Current 3',
                  color: Colors.Blue12,
                },
                {
                  id: listIdsConfig.active_power,
                  title: 'Active Power',
                  color: Colors.Orange6,
                },
                {
                  id: listIdsConfig.power_factor_1,
                  title: 'Power Factor 1',
                  color: Colors.Green6,
                },
                {
                  id: listIdsConfig.power_factor_2,
                  title: 'Power Factor 2',
                  color: Colors.Green9,
                },
                {
                  id: listIdsConfig.power_factor_3,
                  title: 'Power Factor 3',
                  color: Colors.Green10,
                },
              ]}
            />
          </View>
        )}
      </Section>

      <Section type={'border'}>
        <Text semibold style={styles.textIndoor} size={20}>
          {t('text_total_power_consumption')}
        </Text>

        <PMSensorIndicatior data={dataTotal} style={styles.styleTotalPower} />
        {!!getData?.length && (
          <HistoryChart
            unit={'kWh'}
            datas={getData}
            formatType={'date'}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            configuration={{ type: 'horizontal_bar_chart' }}
          />
        )}
      </Section>
    </>
  );
});

export default ThreePhasePowerConsumption;

const styles = StyleSheet.create({
  textIndoor: {
    marginTop: 16,
  },
  styleList: {
    paddingHorizontal: 0,
  },
  styleTotalPower: {
    width: 200,
  },
});
