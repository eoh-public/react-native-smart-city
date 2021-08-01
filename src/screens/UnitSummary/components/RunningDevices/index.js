import React, { memo, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ItemDevice from '../../../../commons/Device/ItemDevice';
import { scanBluetoothDevices } from '../../../../iot/RemoteControl/Bluetooth';
import { googleHomeConnect } from '../../../../iot/RemoteControl/GoogleHome';

const RunningDevices = memo(({ unit, summaryDetail }) => {
  const [isGGHomeConnected, setIsGGHomeConnected] = useState(false);
  const { devices } = summaryDetail;
  const handleGoogleHomeConnect = useCallback(async (options) => {
    let isConnected = await googleHomeConnect(options);
    setIsGGHomeConnected(isConnected);
  }, []);

  useEffect(() => {
    if (unit.remote_control_options) {
      if (unit.remote_control_options.bluetooth) {
        scanBluetoothDevices(unit.remote_control_options.bluetooth);
      }
      if (unit.remote_control_options.googlehome) {
        handleGoogleHomeConnect(unit.remote_control_options.googlehome);
      }
    }
  }, [handleGoogleHomeConnect, unit]);
  return (
    <View style={styles.container}>
      {!!devices &&
        devices.map((item, index) => {
          return (
            <ItemDevice
              key={`sensor-${item.id}`}
              id={item.id}
              svgMain={item.icon || 'door'}
              statusIcon={item.action && item.action.icon}
              statusColor={item.action && item.action.color}
              description={item.value}
              title={item.name}
              index={index}
              sensor={item}
              unit={unit}
              station={item.station}
              isGGHomeConnected={isGGHomeConnected}
            />
          );
        })}
    </View>
  );
});
const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
});
export default RunningDevices;
