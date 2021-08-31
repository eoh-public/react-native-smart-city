import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18n-js';

import { API, Colors } from '../../configs';
import { Section, ViewButtonBottom } from '../../commons'; //components/Common
import Text from '../../commons/Text';
import GroupCheckBox from '../../commons/GroupCheckBox';
import { axiosGet } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { TESTID } from '../../configs/Constants';

const AddNewDevice = memo(({ route }) => {
  const { unit_id } = route.params;
  const { navigate, goBack } = useNavigation();
  const [unit, setUnit] = useState({ stations: [] });
  const [stationId, setStationId] = useState(-1);

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

  const onRight = useCallback(() => {
    !!stationId &&
      navigate(Routes.ScanSensorQR, {
        station_id: stationId,
        unit_id: unit.id,
        unit_name: unit.name,
      });
  }, [navigate, stationId, unit.id, unit.name]);

  const stations = unit.stations.map((item) => ({
    ...item,
    title: item.name,
  }));

  const handleOnSelect = (itemSelect) => {
    if (itemSelect.id !== stationId) {
      setStationId(itemSelect.id);
    } else {
      setStationId(-1);
    }
  };

  return (
    <SafeAreaView
      style={
        Platform.OS === 'android'
          ? styles.containerAndroid
          : styles.containerIOS
      }
    >
      <Text
        testID={TESTID.ADD_NEW_DEVICE_ADD}
        semibold
        size={20}
        color={Colors.Black}
        style={styles.txtHeader}
      >
        {t('add_new_device')}
      </Text>
      <Text
        testID={TESTID.ADD_NEW_DEVICE_THEN_SELECT}
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
          <GroupCheckBox data={stations} onSelect={handleOnSelect} />
        </Section>
      </ScrollView>
      <ViewButtonBottom
        leftTitle={t('text_back')}
        onLeftClick={goBack}
        rightTitle={t('text_next')}
        rightDisabled={stationId === -1}
        onRightClick={onRight}
      />
    </SafeAreaView>
  );
});

export default AddNewDevice;

const styles = StyleSheet.create({
  containerAndroid: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: StatusBar.currentHeight,
  },
  containerIOS: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: 0,
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
