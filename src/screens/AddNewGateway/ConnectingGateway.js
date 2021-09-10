import React, { memo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { API, Colors } from '../../configs';
import Text from '../../commons/Text';
import { t } from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../utils/Route';
import { axiosGet } from '../../utils/Apis/axios';

const ConnectingGateway = memo(({ route }) => {
  const { navigate } = useNavigation();
  const { new_chip } = route.params;

  useEffect(() => {
    const checkChipFinalized = setInterval(async () => {
      const { success } = await axiosGet(
        API.CHIP.CHECK_FINALIZED(),
        {
          params: {
            chip_id: new_chip.id,
          },
        },
        true
      );
      if (success) {
        navigate(Routes.ConnectedGateway, route.params);
      }
    }, 3000);
    return () => clearInterval(checkChipFinalized);
  }, [navigate, new_chip.id, route.params]);

  return (
    <View style={styles.wrap}>
      <Text semibold size={20} color={Colors.Black} style={styles.txtHeader}>
        {t('connecting_your_gateway')}
      </Text>
      <Text size={14} color={Colors.Gray8} style={styles.txtNote}>
        {t('dont_turn_off_the_device_or_close_this_app')}
      </Text>
    </View>
  );
});

export default ConnectingGateway;

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
