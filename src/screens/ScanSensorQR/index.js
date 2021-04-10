import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import QRScan from '../ScanChipQR/components/QRScan';
import { useSensorScan } from './hooks';

const ScanSensorQR = memo(({ route }) => {
  const { station_id, unit_id, unit_name } = route.params;
  const { onSensorScan, loading, setLoading } = useSensorScan(
    station_id,
    unit_id,
    unit_name
  );

  const onScan = useCallback(
    (data) => {
      onSensorScan(data);
    },
    [onSensorScan]
  );

  return (
    <View style={styles.container}>
      <QRScan onScan={onScan} loading={loading} setLoading={setLoading} />
    </View>
  );
});

export default ScanSensorQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
