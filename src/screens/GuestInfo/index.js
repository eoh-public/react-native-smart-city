import React, { useState, useCallback, useEffect, memo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { useNavigation } from '@react-navigation/native';

import RowGuestInfo from './components/RowGuestInfo';
import HeaderGuestInfo from './components/HeaderGuestInfo';
import AccessScheduleSheet from './components/AccessScheduleSheet';
import { CircleView } from '../../commons/CircleView';
import { IconOutline } from '@ant-design/icons-react-native';
import Text from '../../commons/Text';
import { useBoolean } from '../../hooks/Common';
import { axiosGet, axiosPut } from '../../utils/Apis/axios';

import { API, Colors } from '../../configs';
import {
  ACCESS_SCHEDULE_PROPERTIES,
  typeMaps,
  formatterMaps,
  formatterForUpdateMaps,
  getDefaultValueMaps,
} from './constant';
import styles from './styles/indexStyles';

const GuestInfo = ({ route }) => {
  const t = useTranslations();
  const { id } = route.params;
  const { goBack } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [guest, setGuest] = useState();
  const [accessSchedule, setAccessSchedule] = useState();
  const [
    showAccessScheduleSheet,
    setShowAccessScheduleSheet,
    setHideAccessScheduleSheet,
  ] = useBoolean();

  const prepareData = useCallback((rawData) => {
    const listProperty = ACCESS_SCHEDULE_PROPERTIES[rawData.access_schedule];

    for (const [key, value] of Object.entries(rawData)) {
      const type = typeMaps[key];
      if (!type) {
        continue;
      }
      if (!listProperty.includes(key)) {
        rawData[key] = getDefaultValueMaps[type]();
        continue;
      }
      rawData[key] = formatterMaps[type](value);
    }
  }, []);

  const prepareDataForUpdate = useCallback((data) => {
    const listProperty = ACCESS_SCHEDULE_PROPERTIES[data.access_schedule];

    for (const [key, value] of Object.entries(data)) {
      if (!listProperty.includes(key)) {
        delete data[key];
        continue;
      }
      const type = typeMaps[key];
      const formatter = formatterForUpdateMaps[type];
      if (formatter) {
        data[key] = formatter(value);
      }
    }
  }, []);

  const fetchGuestInfo = useCallback(async () => {
    setIsLoading(true);
    const { success, data } = await axiosGet(API.SHARED_SENSOR.ACCESS(id));
    if (success) {
      setGuest(data.user);
      prepareData(data);
      setAccessSchedule(data);
    }
    setIsLoading(false);
  }, [id, prepareData, setAccessSchedule]);

  const onSave = useCallback(async () => {
    setIsLoading(true);
    prepareDataForUpdate(accessSchedule);
    const { success } = await axiosPut(API.SHARED_SENSOR.ACCESS(id), {
      ...accessSchedule,
    });
    setIsLoading(false);
    success && goBack();
  }, [id, goBack, accessSchedule, prepareDataForUpdate]);

  useEffect(() => {
    fetchGuestInfo();
  }, [fetchGuestInfo]);

  return (
    <>
      <View style={styles.container}>
        <HeaderGuestInfo onSave={onSave} />
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.Primary}
            style={styles.loading}
          />
        ) : (
          <>
            {!!guest && (
              <View style={styles.userWrap}>
                <CircleView size={88} center style={styles.avatar}>
                  <IconOutline name="user" size={44} color={Colors.Pink1} />
                </CircleView>
                <Text type="H3" bold>
                  {guest.name}
                </Text>
              </View>
            )}
            {guest?.id && (
              <RowGuestInfo
                textLeft={t('eoh_account_id')}
                textRight={guest.id}
              />
            )}
            {accessSchedule && (
              <RowGuestInfo
                textLeft={t('access_schedule')}
                textRight={t(`${accessSchedule.access_schedule}`)}
                rightArrow
                onPress={setShowAccessScheduleSheet}
              />
            )}
          </>
        )}
      </View>
      {accessSchedule && (
        <AccessScheduleSheet
          isVisible={showAccessScheduleSheet}
          onShow={setShowAccessScheduleSheet}
          onHide={setHideAccessScheduleSheet}
          data={accessSchedule}
          onSetData={setAccessSchedule}
        />
      )}
    </>
  );
};

export default memo(GuestInfo);
