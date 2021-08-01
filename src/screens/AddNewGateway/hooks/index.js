import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { axiosGet } from '../../../utils/Apis/axios';
import { API } from '../../../configs';

const useConnectGateway = (unit_id) => {
  const navigation = useNavigation();

  const fetchDetails = useCallback(async () => {
    const { success: fetchSuccess, data: unit } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    return { fetchSuccess, unit };
  }, [unit_id]);

  const onPressDone = useCallback(async () => {
    const { fetchSuccess } = await fetchDetails();
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
