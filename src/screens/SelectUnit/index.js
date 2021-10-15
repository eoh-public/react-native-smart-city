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
import BottomButtonView from '../../commons/BottomButtonView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { popAction } from '../../navigations/utils';
import Routes from '../../utils/Route';

const SelectUnit = () => {
  const t = useTranslations();
  const { navigate, dispatch, goBack } = useNavigation();
  const { params = {} } = useRoute();
  const {
    type,
    isAutomateTab,
    isMultiUnits,
    automateId,
    scriptName,
    routeName,
    isCreateNewAction,
    unit,
  } = params;
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

  const handleOnGoBackAndClose = useCallback(() => {
    if (automateId) {
      navigate(Routes.ScriptDetail, {
        id: automateId,
        name: scriptName,
        type: type,
        havePermission: true,
        unit,
        isMultiUnits,
        isCreateNewAction,
      });
    } else {
      dispatch(popAction(2));
      isAutomateTab && goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  const onContinue = useCallback(() => {
    navigate(
      isCreateNewAction || !routeName ? Routes.SelectSensorDevices : routeName,
      {
        ...params,
        selectedItem,
        type,
        isAutomateTab,
        isMultiUnits,
        routeName,
        unit: selectedItem,
        automateId,
        scriptName,
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, type, isAutomateTab, isMultiUnits, routeName]);

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
        <FImage
          source={{ uri: icon }}
          style={styles.icon}
          resizeMode={'cover'}
        />
        <View style={styles.wrap}>
          <Text numberOfLines={1} type="H4">
            {name}
          </Text>
          <Text numberOfLines={2} type="Body" color={Colors.Gray7}>
            {`${t(
              is_owner ? 'owner_unit' : 'shared_unit'
            )} - ${number_sensor} ${t(
              number_sensor > 1 ? 'sensor_devices' : 'sensor_device'
            )}`}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightComponent = useMemo(
    () => (
      <TouchableOpacity
        style={styles.buttonClose}
        onPress={handleOnGoBackAndClose}
      >
        <Icon name={'close'} size={24} color={Colors.Black} />
      </TouchableOpacity>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params]
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
        onGoBack={handleOnGoBackAndClose}
      >
        <View style={styles.wrapContent}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            renderItem={renderItem}
          />
        </View>
      </WrapHeaderScrollable>
      <BottomButtonView
        style={styles.bottomButtonView}
        mainTitle={t('continue')}
        onPressMain={onContinue}
        typeMain={selectedItem ? 'primary' : 'disabled'}
      />
    </View>
  );
};

export default SelectUnit;
