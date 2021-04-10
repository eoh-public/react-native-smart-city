import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { API, Colors } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import Text from '../../commons/Text';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../utils/Route';

const ConnectingDevices = memo(({ route }) => {
  const { navigate } = useNavigation();
  const { new_sensor } = route.params;

  useEffect(() => {
    const checkSensorConnected = setInterval(async () => {
      const { success } = await axiosGet(
        API.SENSOR.CHECK_CONNECTION(new_sensor.id),
        {},
        true
      );
      if (success) {
        navigate(Routes.ConnectDevices, route.params);
      }
    }, 3000);
    return () => clearInterval(checkSensorConnected);
  }, [navigate, new_sensor.id, route.params]);

  return (
    <View style={styles.wrap}>
      <Text semibold size={20} color={Colors.Black} style={styles.txtHeader}>
        {t('connecting_your_device')}
      </Text>
      <Text size={14} color={Colors.Gray8} style={styles.txtNote}>
        {t('dont_turn_off_the_device_or_close_this_app')}
      </Text>
    </View>
  );
});

export default ConnectingDevices;

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  txtHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  txtNote: {
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
});
