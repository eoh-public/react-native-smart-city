import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import QualityIndicatorItem from '../WaterQualitySensor/QualityIndicatorsItem';
import styles from './PMSensorIndicatorStyles';

//using for PM2.5-10, CO, UV, Rainflow Sensor
const keyExtractor = (item) => item.id.toString();
const PMSensorIndicatior = memo(({ data, style }) => {
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <QualityIndicatorItem
          key={item.id.toString()}
          color={item.color}
          standard={item.standard}
          value={item.value}
          evaluate={item.evaluate}
          measure={item.measure}
          style={style}
        />
      );
    },
    [style]
  );

  const isScrollMode = data.length > 3;

  return (
    <FlatList
      bounces={false}
      numColumns={1}
      horizontal={isScrollMode}
      contentContainerStyle={[
        styles.standard,
        !isScrollMode && styles.centerItem,
      ]}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});

export default PMSensorIndicatior;
