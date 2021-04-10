import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { axiosGet } from '../../../utils/Apis/axios';
import { API } from '../../../configs';

const useConnectGateway = (station_id, unit_id) => {
  const navigation = useNavigation();

  const fetchDetails = useCallback(async () => {
    const { success: fetchSuccess, data: unit } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    const station = unit.stations.find((item) => item.id === station_id);
    return { fetchSuccess, unit, station };
  }, [station_id, unit_id]);

  const onPressDone = useCallback(async () => {
    // eslint-disable-next-line no-unused-vars
    const { fetchSuccess, unit, station } = await fetchDetails();
    if (!fetchSuccess) {
      return;
    }
    navigation.dangerouslyGetParent().pop();
  }, [fetchDetails, navigation]);

  return {
    onPressDone,
  };
};

export { useConnectGateway };
