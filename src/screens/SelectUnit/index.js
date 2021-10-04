import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from '@ant-design/react-native';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { API, Colors } from '../../configs';
import Text from '../../commons/Text';
import styles from './Styles/indexStyles';
import { axiosGet } from '../../utils/Apis/axios';
import { useTranslations } from '../../hooks/Common/useTranslations';
import FImage from '../../commons/FImage';

const SelectUnit = () => {
  const t = useTranslations();
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(data[0]);

  const onPressItem = (item) => () => {
    setSelectedItem(item);
  };

  const getAllUnits = useCallback(async () => {
    const { success, data } = await axiosGet(API.AUTOMATE.GET_ALL_UNITS());
    if (success) {
      setData(data);
    }
  }, []);

  const handleClose = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({ item = {} }) => {
    const {
      id,
      name = '',
      is_owner = false,
      number_sensor = 0,
      icon = '',
    } = item;
    const isSelectedItem = selectedItem?.id === id;
    return (
      <TouchableOpacity onPress={onPressItem(item)} style={styles.wrapItem}>
        <View style={[styles.notSelected, isSelectedItem && styles.selected]}>
          {isSelectedItem && <View style={styles.childSelected} />}
        </View>
        <FImage source={icon} style={styles.icon} />
        <View style={styles.wrap}>
          <Text numberOfLines={1} type="H4">
            {name}
          </Text>
          <Text numberOfLines={2} type="Body" color={Colors.Gray7}>
            {`${t(
              is_owner ? 'owner_unit' : 'shared_unit'
            )} - ${number_sensor} ${t(
              number_sensor > 0 ? 'sensor_devices' : 'sensor_device'
            )}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightComponent = useMemo(
    () => (
      <TouchableOpacity style={styles.buttonClose} onPress={handleClose}>
        <Icon name={'close'} size={24} color={Colors.Black} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    getAllUnits();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('select_unit')}
        headerAniStyle={styles.headerAniStyle}
        rightComponent={rightComponent}
        onRefresh={getAllUnits}
      >
        <View style={styles.wrapContent}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={renderItem}
          />
        </View>
      </WrapHeaderScrollable>
    </View>
  );
};

export default SelectUnit;
