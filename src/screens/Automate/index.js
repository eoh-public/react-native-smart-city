import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { View, TouchableOpacity, FlatList, Image } from 'react-native';
import { IconFill } from '@ant-design/icons-react-native/es';
import { useNavigation } from '@react-navigation/native';

import styles from './Styles/indexStyles';
import { API, Colors, Images } from '../../configs';
import { axiosGet } from '../../utils/Apis/axios';
import Text from '../../commons/Text';
import ItemOneTap from '../../commons/SubUnit/OneTap/ItemOneTap';
import Routes from '../../utils/Route';
import Loading from './Components/Loading';
import ItemAddNew from '../../commons/Device/ItemAddNew';
import { useTranslations } from '../../hooks/Common/useTranslations';

const keyExtractor = (item) => item.id;
const MULTI_UNIT = 'MultiUnit';

const Automate = () => {
  const t = useTranslations();
  const { setOptions, navigate } = useNavigation();
  const [automatesData, setAutomatesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getAutomates = useCallback(async () => {
    setIsLoading(true);
    const { success, data } = await axiosGet(API.AUTOMATE.GET_AUTOMATES());
    if (success && data && data.length) {
      setAutomatesData(data);
    }
    const timeout = setTimeout(() => {
      setIsLoading(false);
      clearTimeout(timeout);
    }, 1000);
  }, []);

  const onPressItem = (item) => () => {
    navigate(Routes.UnitStack, {
      screen: Routes.ScriptDetail,
      params: {
        id: item?.id,
        name: item?.script?.name,
        type: item?.type,
        havePermission: true,
        unit: {},
      },
    });
  };

  const handleOnAddNew = useCallback(() => {
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItemAutomate = useCallback(
    ({ item }) => {
      return (
        <ItemOneTap
          isOwner={true}
          automate={item}
          wrapSyles={styles.wrapAutomateItem}
          onPressItem={onPressItem(item)}
        />
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [automatesData]
  );

  const renderItem = useCallback(
    ({ item = {} }) => {
      const { type = '', unit_name = '', automates = [] } = item;
      return (
        <View style={styles.wrapUniItem}>
          <View style={styles.titleItem}>
            <Text type="H3" semibold>
              {type === MULTI_UNIT ? 'Multi Units' : unit_name}
            </Text>
            <TouchableOpacity style={styles.arrowRightButon}>
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
            ListFooterComponent={renderListFooterComponent}
          />
        </View>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [automatesData]
  );

  const renderListFooterComponent = useMemo(
    () => (
      <ItemAddNew
        title={t('add_new')}
        onAddNew={handleOnAddNew}
        wrapStyle={styles.addNewItem}
      />
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
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
  }, []);

  return (
    <View style={styles.wrap}>
      {isLoading && <Loading />}
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
