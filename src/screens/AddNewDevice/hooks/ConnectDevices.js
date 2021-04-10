import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { axiosGet, axiosPatch } from '../../../utils/Apis/axios';
import { API } from '../../../configs';

const useConnectDevices = (new_sensor, station_id, unit_id) => {
  const navigation = useNavigation();
  const [temporaryDeviceName, setTemporaryDeviceName] = useState(
    new_sensor.name
  );
  const [deviceName, setDeviceName] = useState(new_sensor.name);

  const fetchDetails = useCallback(async () => {
    const { success: fetchSuccess, data: unit } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    const station = unit.stations.find((item) => item.id === station_id);
    return { fetchSuccess, unit, station };
  }, [station_id, unit_id]);

  const updateSensorName = useCallback(
    async (name) => {
      const { success: updateSuccess } = await axiosPatch(
        API.SENSOR.UPDATE_SENSOR(unit_id, station_id, new_sensor.id),
        {
          name,
        }
      );
      return { updateSuccess };
    },
    [new_sensor.id, station_id, unit_id]
  );

  const onPressDone = useCallback(async () => {
    const { updateSuccess } = await updateSensorName(deviceName);
    // eslint-disable-next-line no-unused-vars
    const { fetchSuccess, unit, station } = await fetchDetails();

    if (!updateSuccess && !fetchSuccess) {
      return;
    }
    navigation.dangerouslyGetParent().pop();
    //TODO(phi-mai): need dispatch new device was added to sub unit detail by redux
    // if (isFromSubUnitDetail) {
    //   navigation.navigate(Routes.SubUnitDetail, {
    //     unit,
    //     station,
    //   });
    // }
  }, [deviceName, fetchDetails, navigation, updateSensorName]);

  const onChangeTemporaryDeviceName = useCallback((value) => {
    setTemporaryDeviceName(value);
  }, []);

  return {
    onPressDone,
    onChangeTemporaryDeviceName,
    temporaryDeviceName,
    deviceName,
    setDeviceName,
  };
};

export { useConnectDevices };
