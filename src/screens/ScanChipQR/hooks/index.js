import { useNavigation } from '@react-navigation/native';
import API from '../../../configs/API';
import { useCallback, useState } from 'react';
import { axiosPost } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';

const useChipScan = (route) => {
  const {
    station_id,
    phoneNumber,
    chipName,
    wifiName,
    wifiPass,
    imei,
  } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const onChipScan = useCallback(
    async (data) => {
      setLoading(true);
      const body = JSON.parse(data);
      const { success, data: new_chip } = await axiosPost(
        API.SUB_UNIT.CHIP_SCAN(station_id),
        {
          imei: imei,
          qr_code: body.imei,
          phone: phoneNumber,
          name: chipName,
          wifi_ssid: wifiName,
          wifi_pass: wifiPass,

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
    [
      chipName,
      imei,
      navigation,
      phoneNumber,
      route.params,
      station_id,
      wifiName,
      wifiPass,
]
  );

  return {
    onChipScan,
    loading,
    setLoading,
  };
};

export { useChipScan };
