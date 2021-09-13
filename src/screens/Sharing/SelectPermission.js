import React, { useEffect, useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslations } from '../../hooks/Common/useTranslations';

import { API, Colors } from '../../configs';
import ViewButtonBottom from '../../commons/ViewButtonBottom';
import Text from '../../commons/Text';
import { axiosGet } from '../../utils/Apis/axios';
import Routes from '../../utils/Route';
import { SensorItem, TitleCheckBox } from './Components';
import styles from './Styles/SelectPermissionStyles';

import { TESTID } from '../../configs/Constants';

let dataStationTemp = [];

const SelectPermission = ({ route }) => {
  const t = useTranslations();
  const { unit } = route.params;
  const navigation = useNavigation();
  const [dataStations, setDataStations] = useState([]);
  const [isTickAllDevices, setIsTickAllDevices] = useState(false);
  const [activeItemId, setActiveItemId] = useState(-1);
  const [loading, setLoading] = useState(true);

  const onTickTitle = (idGroup, isChecked, id) => {
    if (!idGroup) {
      setIsTickAllDevices(isChecked);
      const data = dataStations.map((i) => ({
        ...i,
        isChecked,
      }));
      for (let sensor in data) {
        for (let item in data[sensor].sensors) {
          const itemTemp = data[sensor].sensors[item];
          data[sensor].sensors[item] = {
            ...itemTemp,
            actions: itemTemp.actions.map((i) => ({
              ...i,
              isChecked,
            })),
            read_configs: itemTemp.read_configs.map((i) => ({
              ...i,
              isChecked,
            })),
          };
        }
      }
      setDataStations(data);
    } else {
      const data = [...dataStationTemp];
      const index = data.findIndex((item) => item.id === idGroup);
      data[index] = {
        ...data[index],
        isChecked,
        sensors: data[index]?.sensors.map((i) => ({
          ...i,
          actions: i.actions.map((j) => ({ ...j, isChecked })),
          read_configs: i.read_configs.map((j) => ({ ...j, isChecked })),
        })),
      };
      setDataStations(data);
      setIsTickAllDevices(!data.some((item) => !item.isChecked));
    }
  };

  const onTickedChild = (
    idGroup,
    sensorId,
    childId,
    isChecked,
    isReadConfig
  ) => {
    let data = [...dataStationTemp];
    const indexGroup = data.findIndex((item) => item.id === idGroup);
    const indexSensor = (data[indexGroup]?.sensors || []).findIndex(
      (item) => item.id === sensorId
    );
    const indexChild = (data[indexGroup]?.sensors || [])[indexSensor][
      `${isReadConfig ? 'read_configs' : 'actions'}`
    ].findIndex((item) => item.id === childId);
    (data[indexGroup]?.sensors || [])[indexSensor][
      `${isReadConfig ? 'read_configs' : 'actions'}`
    ][indexChild] = {
      ...(data[indexGroup]?.sensors || [])[indexSensor][
        `${isReadConfig ? 'read_configs' : 'actions'}`
      ][indexChild],
      isChecked,
    };
    for (let i of data) {
      if (i.sensors.length) {
        let isChecked;
        let arrChecked = [];
        for (let j of i.sensors) {
          isChecked = !(
            j.actions.some((k) => !k.isChecked) ||
            j.read_configs.some((k) => !k.isChecked)
          );
          arrChecked.push(isChecked);
        }
        i.isChecked = !arrChecked.some((i) => !i);
      }
    }
    setIsTickAllDevices(!dataStationTemp.some((i) => !i.isChecked));
    dataStationTemp = data;
    setDataStations(data);
  };

  const GroupSenSorItem = ({ item = {}, index }) => {
    const { name = '', sensors = [], isChecked, id = '' } = item;
    return (
      <View style={styles.viewGroup}>
        <TitleCheckBox
          title={name}
          wrapCheckBoxStyle={styles.checkBoxTile}
          onPress={onTickTitle}
          titleStyle={styles.GroupSenSorItem}
          isChecked={isChecked}
          idGroup={id}
        />
        <View style={styles.wrapSensor}>
          {sensors.map((i, index) => (
            <SensorItem
              item={i}
              key={i.id}
              isRenderSeparated={index !== sensors.length - 1}
              onTickedChild={onTickedChild}
              titleGroup={name}
              activeItemId={activeItemId}
              setActiveItemId={setActiveItemId}
              idGroup={id}
            />
          ))}
        </View>
      </View>
    );
  };

  const onPressNext = () => {
    let read_permissions = [],
      control_permissions = [];
    for (let sensor of dataStationTemp) {
      for (let item of sensor.sensors) {
        let arrIdControlTemp = [],
          arrIdReadTemp = [];
        for (let i of item.actions) {
          i.isChecked && arrIdControlTemp.push(i.id);
        }
        for (let i of item.read_configs) {
          i.isChecked && arrIdReadTemp.push(i.id);
        }
        arrIdControlTemp.length &&
          control_permissions.push({ id: item.id, values: arrIdControlTemp });
        arrIdReadTemp.length &&
          read_permissions.push({ id: item.id, values: arrIdReadTemp });
      }
    }
    if (!read_permissions.length && !control_permissions.length) {
      Alert.alert('', t('choose_at_least_one'));
      return;
    }
    navigation.navigate(Routes.SharingInviteMembers, {
      unit,
      permissions: { read_permissions, control_permissions },
    });
  };

  const renderGroupItem = ({ item }) => (
    <GroupSenSorItem key={item.id} item={item} />
  );

  const renderFlatList = useMemo(() => {
    return (
      Boolean(dataStations.length) && (
        <FlatList
          keyExtractor={(item) => item.id}
          extraData={dataStations}
          data={dataStations}
          renderItem={renderGroupItem}
          ListHeaderComponent={
            Boolean(dataStations.length) && (
              <TitleCheckBox
                title={t('text_all_devices')}
                wrapStyle={styles.wrapAllDevices}
                onPress={onTickTitle}
                titleStyle={styles.textAllDevice}
                isChecked={isTickAllDevices}
              />
            )
          }
        />
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataStations, isTickAllDevices, activeItemId]);

  useEffect(() => {
    (async () => {
      if (!unit) {
        return;
      }

      const { success, data } = await axiosGet(
        API.SHARE.UNIT_PERMISSIONS(unit.id)
      );
      if (success) {
        setDataStations(data);
      }
      setLoading(false);
    })();
  }, [unit]);

  useEffect(() => {
    dataStationTemp = dataStations;
  }, [dataStations]);

  return (
    <SafeAreaView
      style={
        Platform.OS === 'android'
          ? styles.containerAndroid
          : styles.containerIOS
      }
    >
      <Text semibold style={styles.title}>
        {t('select_devices')}
      </Text>
      <Text style={styles.subtitle}>{t('sharing_select_devices_hint')}</Text>
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator color={Colors.Primary} />
        ) : dataStations.length > 0 ? (
          renderFlatList
        ) : (
          <Text style={styles.textNodata} testID={TESTID.TEXT_NO_DATA_STATIONS}>
            {t('no_data')}
          </Text>
        )}
        <ViewButtonBottom
          testIDPrefix={TESTID.PREFIX.SHARING_SELECT_PERMISSION}
          leftTitle={t('cancel')}
          onLeftClick={() => navigation.goBack()}
          rightTitle={t('next')}
          rightDisabled={false}
          onRightClick={onPressNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default SelectPermission;
