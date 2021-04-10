import React, { memo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import QRScan from '../../commons/QRScan';
import { useChipScan } from './hooks';

const ScanChipQR = memo(({ route }) => {
  const { onChipScan, loading, setLoading } = useChipScan(route);

  const onScan = useCallback(
    (data) => {
      onChipScan(data);
    },
    [onChipScan]
  );

  return (
    <View style={styles.container}>
      <QRScan onScan={onScan} loading={loading} setLoading={setLoading} />
    </View>
  );
});

export default ScanChipQR;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
