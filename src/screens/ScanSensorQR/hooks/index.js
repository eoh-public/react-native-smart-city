import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { axiosPost } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';
import { API } from '../../../configs';

const useSensorScan = (station_id, unit_id, unit_name) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onSensorScan = useCallback(
    async (data) => {
      setLoading(true);
      const body = JSON.parse(data);
      const { success, data: new_sensor } = await axiosPost(
        API.SUB_UNIT.SENSOR_SCAN(station_id),
        body
      );
      if (success) {
        navigation.navigate(Routes.ConnectingDevices, {
          new_sensor: new_sensor,
          station_id: station_id,
          unit_id: unit_id,
          unit_name: unit_name,
        });
      } else {
        navigation.goBack();
      }
    },
    [navigation, station_id, unit_id, unit_name]
  );

  return {
    onSensorScan,
    loading,
    setLoading,
  };
};

export { useSensorScan };
