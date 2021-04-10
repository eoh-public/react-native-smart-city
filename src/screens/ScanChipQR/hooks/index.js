import { useNavigation } from '@react-navigation/native';
import API from '../../../configs/API';
import { useCallback, useState } from 'react';
import { axiosPost } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';

const useChipScan = (route) => {
  const { station_id, phoneNumber, chipName } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onChipScan = useCallback(
    async (data) => {
      setLoading(true);
      const body = JSON.parse(data);
      const { success, data: new_chip } = await axiosPost(
        API.SUB_UNIT.CHIP_SCAN(station_id),
        {
          ...body,
          phone: phoneNumber,
          name: chipName,
        }
      );
      if (success) {
        navigation.navigate(Routes.ConnectingGateway, {
          new_chip,
          ...route.params,
        });
      } else {
        navigation.goBack();
      }
    },
    [chipName, navigation, phoneNumber, route.params, station_id]
  );

  return {
    onChipScan,
    loading,
    setLoading,
  };
};

export { useChipScan };
