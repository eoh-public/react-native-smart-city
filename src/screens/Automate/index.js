import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { IconFill } from '@ant-design/icons-react-native/es';
import { useNavigation, useIsFocused } from '@react-navigation/native';

import styles from './Styles/indexStyles';
import { API, Colors, Images } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import Text from '../../commons/Text';
import ItemOneTap from '../../commons/SubUnit/OneTap/ItemOneTap';
import Routes from '../../utils/Route';
import Loading from './Components/Loading';
import ItemAddNew from '../../commons/Device/ItemAddNew';
import { useTranslations } from '../../hooks/Common/useTranslations';
import { useGetIdUser } from '../../hooks/Common';
import { AUTOMATE_TYPE, TESTID, UNIT_TYPES } from '../../configs/Constants';

const keyExtractor = (item) => item.id;

const Automate = () => {
  const t = useTranslations();
  const idUser = useGetIdUser();
  const isFocused = useIsFocused();
  const { setOptions, navigate } = useNavigation();
  const [automatesData, setAutomatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const prepareData = useCallback((rawData) => {
    rawData.forEach((item) => {
      item.automates = item.automates.sort((a, b) => {
        const aIsStar = a.script.is_star;
        const bIsStar = b.script.is_star;
        if ((aIsStar && bIsStar) || (!aIsStar && !bIsStar)) {
          return 0;
        } else if (aIsStar && !bIsStar) {
          return -1;
        } else if (!aIsStar && bIsStar) {
          return 1;
        }
      });
    });
  }, []);

  const getAutomates = useCallback(async () => {
    setIsLoading(true);
    const { success, data } = await axiosGet(API.AUTOMATE.GET_SMART());
    if (success && data && data.length) {
      prepareData(data);
      setAutomatesData(data);
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timeout);
    }, 1000);
  }, [prepareData]);

  const onPressItem = (item, id, type, isOwner) => () => {
    navigate(Routes.UnitStack, {
      screen: Routes.ScriptDetail,
      params: {
        id: item?.id,
        name: item?.script?.name,
        type: item?.type,
        havePermission: isOwner || idUser === item?.user,
        unit: { id },
        isAutomateTab: true,
        isMultiUnits: type === UNIT_TYPES.MULTI,
      },
    });
  };

  const handleOnAddNew = (unitType, id) => () => {
    navigate(Routes.UnitStack, {
      screen: Routes.AddNewAutoSmart,
      params: {
        unit: { id },
        type: AUTOMATE_TYPE.AUTOMATE,
        isAutomateTab: true,
        isMultiUnits: unitType === UNIT_TYPES.MULTI,
      },
    });
  };

  const onPressArrowRight = (isMultiUnits, unitName, unitId) => () => {
    isMultiUnits
      ? navigate(Routes.MultiUnits, {
          isMultiUnits,
          unitName,
          unit: { id: unitId },
        })
      : navigate(Routes.UnitStack, {
          screen: Routes.UnitDetail,
          params: { unitId, isOneTap: true },
        });
  };

  const renderItem = useCallback(
    ({ item = {} }) => {
      const {
        type = '',
        unit_name = '',
        owner_unit_id,
        automates = [],
        unit_id,
      } = item;
      const isOwner = owner_unit_id
        ? owner_unit_id === idUser
        : type === UNIT_TYPES.MULTI;
      const renderItemAutomate = ({ item }) => {
        return (
          <ItemOneTap
            isOwner={isOwner}
            automate={item}
            wrapSyles={styles.wrapAutomateItem}
            onPressItem={onPressItem(item, unit_id, type, isOwner)}
          />
        );
      };

      return (
        <View style={styles.wrapUniItem}>
          <View style={styles.titleItem}>
            <Text type="H3" semibold>
              {type === UNIT_TYPES.MULTI ? t('multi_unit') : unit_name}
            </Text>
            <TouchableOpacity
              onPress={onPressArrowRight(
                type === UNIT_TYPES.MULTI,
                unit_name,
                unit_id
              )}
              style={styles.arrowRightButton}
              testID={TESTID.ICON_ARROW_RIGHT}
            >
              <Image source={Images.arrowBack} style={styles.arrowRight} />
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            keyExtractor={keyExtractor}
            data={automates}
            renderItem={renderItemAutomate}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentContainerStyle2}
            ListFooterComponent={renderListFooterComponent(type, unit_id)}
          />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [automatesData]
  );

  const renderListFooterComponent = (type, unit_id) => (
    <ItemAddNew
      title={t('add_new')}
      onAddNew={handleOnAddNew(type, unit_id)}
      wrapStyle={styles.addNewItem}
    />
  );

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.buttonAdd}>
          <IconFill name={'plus-circle'} size={28} color={Colors.Orange} />
        </TouchableOpacity>
      ),
    });
  }, [setOptions]);

  useEffect(() => {
    getAutomates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <View style={styles.wrap}>
      {isLoading && !automatesData?.length && <Loading />}
      <FlatList
        keyExtractor={keyExtractor}
        data={automatesData}
        extraData={automatesData}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainerStyle}
        refreshing={false}
        onRefresh={getAutomates}
      />
    </View>
  );
};

export default Automate;
