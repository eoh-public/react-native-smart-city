import { useNavigation } from '@react-navigation/native';
import API from '../../../configs/API';
import { useCallback, useState } from 'react';
import { axiosPost } from '../../../utils/Apis/axios';
import Routes from '../../../utils/Route';

const useChipScan = (route) => {
  const {
    unit_id,
    stationName,
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
        API.UNIT.CHIP_SCAN(unit_id),
        {
          imei: imei,
          qr_code: body.imei,
          phone: phoneNumber,
          name: chipName,
          station_name: stationName,
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
      stationName,
      unit_id,
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
