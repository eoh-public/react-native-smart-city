import React, { memo, useCallback, useEffect, useState } from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import styles from './AddLGDeviceStyles';
import { useSCContextSelector } from '../../context';
import { API, Colors } from '../../configs';
import { Section, ViewButtonBottom } from '../../commons';
import Text from '../../commons/Text';
import GroupCheckBox from '../../commons/GroupCheckBox';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';
import { ToastBottomHelper } from '../../utils/Utils';

const AddLGDevice = memo(({ route }) => {
  const { LG_CLIENT_ID, LG_REDIRECT_URI_APP } = useSCContextSelector(
    (state) => state.config
  );
  const { unit_id, code, backend_url } = route.params;
  const { navigate, goBack } = useNavigation();
  const [unit, setUnit] = useState({ stations: [] });
  const [stationId, setStationId] = useState(0);

  const fetchDetails = useCallback(async () => {
    const { success, data } = await axiosGet(
      API.UNIT.UNIT_DETAIL(unit_id),
      {},
      true
    );
    if (success) {
      setUnit(data);
    }
  }, [unit_id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const onRight = useCallback(async () => {
    const { success, data } = await axiosPost(
      API.IOT.LG.GET_TOKEN(LG_CLIENT_ID, code, LG_REDIRECT_URI_APP, backend_url)
    );
    if (!success || !data.access_token) {
      ToastBottomHelper.error(t('lg_sync_failed'));
      navigate(Routes.Dashboard);
      return;
    }

    const { success: successSync } = await axiosPost(
      `${API.IOT.LG.SYNC_DEVICE}`,
      {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        code: code,
        backend_url: backend_url,
        station_id: stationId,
      }
    );
    if (!successSync) {
      ToastBottomHelper.error(t('lg_sync_failed'));
      navigate(Routes.Dashboard);
      return;
    }

    ToastBottomHelper.success(t('lg_sync_success'));
    navigate(Routes.Dashboard);
  }, [
    backend_url,
    code,
    navigate,
    stationId,
    LG_CLIENT_ID,
    LG_REDIRECT_URI_APP,
  ]);

  const stations = unit.stations.map((item) => ({
    ...item,
    title: item.name,
  }));

  return (
    <SafeAreaView style={styles.wrap}>
      <Text
        testID={TESTID.ADD_NEW_DEVICE_LG_ADD}
        semibold
        size={20}
        color={Colors.Black}
        style={styles.txtHeader}
      >
        {t('add_new_device')}
      </Text>
      <Text
        testID={TESTID.ADD_NEW_DEVICE_LG_THEN_SELECT}
        size={14}
        color={Colors.Gray8}
        style={styles.txtNote}
      >
        {t('then_select_a_sub_unit_to_add')}
      </Text>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Section type={'border'}>
          <GroupCheckBox
            data={stations}
            onSelect={(itemSelect) => {
              setStationId(itemSelect.id);
            }}
          />
        </Section>
      </ScrollView>
      <ViewButtonBottom
        leftTitle={t('text_back')}
        onLeftClick={goBack}
        rightTitle={t('text_next')}
        rightDisabled={!stationId}
        onRightClick={onRight}
      />
    </SafeAreaView>
  );
});

export default AddLGDevice;
