import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  useRoute,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';

import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { axiosGet } from '../../utils/Apis/axios';
import { API, Colors } from '../../configs';
import Text from '../../commons/Text';
import styles from './Styles/MultiUnitsStyles';
import { AUTOMATE_TYPE } from '../../configs/Constants';
import ItemOneTap from '../../commons/SubUnit/OneTap/ItemOneTap';
import Routes from '../../utils/Route';
import { useGetIdUser } from '../../hooks/Common';
import ItemAddNew from '../../commons/Device/ItemAddNew';

const MultiUnits = () => {
  const t = useTranslations();
  const isFocused = useIsFocused();
  const idUser = useGetIdUser();
  const { navigate } = useNavigation();
  const { params = {} } = useRoute();
  const { isMultiUnits = false, unitName = '', unit } = params;
  const [data, setData] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tabName = useMemo(() => [t('One-Tap'), t('Scenario')], []);
  const [tabActive, setTabActive] = useState(tabName[0]);

  const getData = useCallback(async (params) => {
    const { success, data } = await axiosGet(
      API.AUTOMATE.GET_MULTI_UNITS(),
      params
    );
    success && setData(data);
  }, []);

  const onPressTabName = (tab) => () => {
    setTabActive(tab);
  };

  const onPressItem = (item) => () => {
    navigate(Routes.UnitStack, {
      screen: Routes.ScriptDetail,
      params: {
        id: item?.id,
        name: item?.script?.name,
        type: item?.type,
        havePermission: idUser === item?.user,
        unit,
        isMultiUnits,
      },
    });
  };

  const handleOnAddNew = useCallback(() => {
    navigate(Routes.UnitStack, {
      screen: Routes.AddNewAutoSmart,
      params: {
        type:
          tabActive === t('One-Tap')
            ? AUTOMATE_TYPE.ONE_TAP_ONLY
            : AUTOMATE_TYPE.VALUE_CHANGE,
        isAutomateTab: true,
        isMultiUnits: true,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabActive]);

  const renderTab = useMemo(
    () => (
      <View style={styles.wrapTab}>
        {tabName.map((item) => (
          <TouchableOpacity
            onPress={onPressTabName(item)}
            key={item}
            style={[styles.tabName, item === tabActive && styles.tabNameActive]}
          >
            <Text
              type="Body"
              semibold
              color={item === tabActive ? Colors.Primary : Colors.Gray6}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tabActive]
  );

  const renderContent = useMemo(() => {
    const listItems = data.filter((item) =>
      tabActive === t('One-Tap')
        ? item?.type === AUTOMATE_TYPE.ONE_TAP
        : item?.type !== AUTOMATE_TYPE.ONE_TAP
    );
    return (
      <View style={styles.wrapItem}>
        {listItems.map((item, index) => (
          <ItemOneTap
            isOwner={idUser === item?.user}
            automate={item}
            wrapSyles={[
              styles.wrapAutomateItem,
              index % 2 === 0 && styles.marginRigt8,
            ]}
            onPressItem={onPressItem(item)}
          />
        ))}
        <ItemAddNew
          title={t('add_new')}
          onAddNew={handleOnAddNew}
          wrapStyle={styles.addNewItem}
        />
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, tabActive]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={isMultiUnits ? t('multi_units_automate') : unitName}
        headerAniStyle={styles.headerAniStyle}
      >
        <View style={styles.wrapContent}>
          {renderTab}
          {renderContent}
        </View>
      </WrapHeaderScrollable>
    </View>
  );
};

export default MultiUnits;
