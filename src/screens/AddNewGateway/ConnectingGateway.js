import React, { memo, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { API, Colors } from '../../configs';
import Text from '../../commons/Text';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../utils/Route';
import { axiosGet } from '../../utils/Apis/axios';
import { IconOutline } from '@ant-design/icons-react-native';
import styles from './ConnectingGatewayStyles';

const ProcessItem = ({ title, active, line }) => {
  return (
    <>
      <View style={styles.processItem}>
        <View
          style={[styles.processCircle, active && styles.processCircleActive]}
        >
          <IconOutline
            name="radar-chart"
            size={16}
            color={active ? Colors.White : Colors.Gray5}
          />
        </View>
        <Text
          center
          type="Label"
          color={Colors.Gray7}
          style={styles.textProcessItem}
        >
          {title}
        </Text>
      </View>
      {line && <View style={[styles.line, active && styles.lineActive]} />}
    </>
  );
};

const ConnectingGateway = memo(({ route }) => {
  const t = useTranslations();
  const { navigate } = useNavigation();
  const { new_chip } = route.params;
  const [finalizeStatus, setFinalizeStatus] = useState(0);

  useEffect(() => {
    const checkChipFinalized = setInterval(async () => {
      const { success, data } = await axiosGet(
        API.CHIP.CHECK_FINALIZED(),
        {
          params: {
            chip_id: new_chip.id,
          },
        },
        true
      );
      if (success) {
        const { control, config, bluetooth } = data;
        if (control) {
          setFinalizeStatus(1);
        }
        if (config) {
          setFinalizeStatus(2);
        }
        if (bluetooth) {
          setFinalizeStatus(3);
        }
        if (control && config && bluetooth) {
          navigate(Routes.ConnectedGateway, route.params);
        }
      }
    }, 3000);
    return () => clearInterval(checkChipFinalized);
  }, [navigate, new_chip.id, route.params]);

  const percent = useMemo(() => {
    if (finalizeStatus === 0) {
      return '0%';
    }
    if (finalizeStatus === 1) {
      return '30%';
    }
    if (finalizeStatus === 2) {
      return '60%';
    }
    return '100%';
  }, [finalizeStatus]);

  return (
    <View style={styles.wrap}>
      <Text semibold size={20} color={Colors.Black} style={styles.txtHeader}>
        {t('connecting_your_gateway')}
      </Text>
      <Text size={14} color={Colors.Gray} style={styles.txtNote}>
        {t('dont_turn_off_the_device_or_close_this_app')}
      </Text>
      <View style={styles.scan}>
        <View style={styles.layout}>
          <View style={styles.layout1}>
            <View style={styles.outsideCircle}>
              <View style={styles.circle}>
                <IconOutline name="search" size={28} color={Colors.White} />
              </View>
            </View>
            <Text
              style={styles.textPercent}
              color={Colors.Gray7}
              semibold
              center
            >
              {percent}
            </Text>
          </View>
        </View>
        <View style={styles.layoutProcess}>
          <View style={styles.layoutProcess1}>
            <ProcessItem
              title="Finalize control"
              line
              active={[1, 2, 3].includes(finalizeStatus)}
            />
            <ProcessItem
              title="Finalize config"
              line
              active={[2, 3].includes(finalizeStatus)}
            />
            <ProcessItem
              title="Finalize bluetooth"
              active={[3].includes(finalizeStatus)}
            />
          </View>
        </View>
      </View>
    </View>
  );
});

export default ConnectingGateway;
