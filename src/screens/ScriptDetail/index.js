import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect,
} from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { IconFill, IconOutline } from '@ant-design/icons-react-native';
import { Icon } from '@ant-design/react-native';

import { useTranslations } from '../../hooks/Common/useTranslations';
import styles from './Styles/indexStyles';
import Text from '../../commons/Text';
import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { API, Colors, Images } from '../../configs';
import { usePopover } from '../../hooks/Common';
import MenuActionMore from '../../commons/MenuActionMore';
import Add from '../../../assets/images/Add.svg';
import { useNavigation, useRoute } from '@react-navigation/core';
import { axiosGet, axiosPost } from '../../utils/Apis/axios';
import FImage from '../../commons/FImage';
import Routes from '../../utils/Route';
import { ToastBottomHelper } from '../../utils/Utils';
import ItemAutomate from '../../commons/Automate/ItemAutomate';
import { AUTOMATE_TYPE } from '../../configs/Constants';

const ScriptDetail = () => {
  const { navigate } = useNavigation();
  const { params = {} } = useRoute();
  const refMenuAction = useRef();
  const { childRef, showingPopover, showPopoverWithRef, hidePopover } =
    usePopover();
  const t = useTranslations();
  const { id, name = '', type, havePermission, unitId } = params;
  const [isFavourite, setIsFavourite] = useState(false);
  const [data, setData] = useState([]);

  const listMenuItem = [
    { text: 'Rename' },
    { text: 'Activity Log' },
    { text: 'Delete Script' },
  ];

  const onPressFavourite = useCallback(() => {
    setIsFavourite(!isFavourite);
  }, [isFavourite]);

  const handleShowMenuAction = useCallback(
    () => showPopoverWithRef(refMenuAction),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onItemClick = useCallback((item) => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressAdd = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOneTapDetail = useCallback(async () => {
    const { success, data } = await axiosGet(API.AUTOMATE.ONE_TAP_DETAIL(id));
    success && setData(data?.script_actions || []);
  }, [id]);

  const onPressEdit = useCallback(() => {
    navigate(Routes.EditActionsList, { data, id, setData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPressAddAction = useCallback(() => {
    navigate(Routes.SelectDevice, {
      unitId,
    });
  }, [navigate, unitId]);

  const handleScriptAction = useCallback(async () => {
    const { success } = await axiosPost(API.AUTOMATE.ACTION_ONE_TAP(id));
    if (success) {
      ToastBottomHelper.success(t('Activated successfully.'));
    } else {
      ToastBottomHelper.error(t('Activation failed.'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const Item = useCallback(({ item, index }) => {
    return (
      <View style={styles.wrapItem}>
        <View style={styles.leftItem}>
          <Text color={Colors.Gray9} type="H4" semibold>
            {index + 1 < 10 ? '0' + (index + 1) : index + 1}
          </Text>
        </View>
        <View style={styles.rightItem}>
          <FImage
            source={{ uri: item?.sensor_icon_kit }}
            style={styles.iconItem}
          />
          <View style={styles.contentItem}>
            <Text numberOfLines={1} type="Label" color={Colors.Gray7}>
              {item?.station_name}
            </Text>
            <Text numberOfLines={1} type="H4" color={Colors.Gray9} semibold>
              {item?.sensor_name}
            </Text>
            <Text numberOfLines={1} type="H4" color={Colors.Gray9}>
              {item?.action_name}
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  const ItemAdd = useCallback(({ item, index }) => {
    return (
      <View style={styles.wrapItem}>
        <View style={styles.leftItemAdd}>
          <Text style={styles.number} type="H4" semibold color={Colors.Gray7}>
            {index + 1 < 10 ? '0' + (index + 1) : index + 1}
          </Text>
        </View>
        <TouchableOpacity
          onPress={onPressAddAction}
          style={[styles.rightItemAdd]}
        >
          <Add />
          <Text type="H4" color={Colors.Gray8} style={styles.addAction}>
            {t('add_action')}
          </Text>
        </TouchableOpacity>
      </View>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderButtonStar = useMemo(() => {
    return (
      <TouchableOpacity
        style={[styles.buttonStar, styles.headerButton]}
        onPress={onPressFavourite}
      >
        {isFavourite ? (
          <IconFill name="star" size={25} color={Colors.Yellow6} />
        ) : (
          <IconOutline name="star" size={25} />
        )}
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFavourite]);

  const rightComponent = useMemo(
    () => (
      <View style={styles.rightComponent}>
        {renderButtonStar}
        <TouchableOpacity onPress={onPressAdd} style={styles.headerButton}>
          <Icon name={'plus'} size={27} color={Colors.Black} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShowMenuAction}
          ref={refMenuAction}
          style={[styles.headerButton, styles.moreButton]}
        >
          <Icon name={'more'} size={27} color={Colors.Black} />
        </TouchableOpacity>
      </View>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isFavourite]
  );

  useEffect(() => {
    getOneTapDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={name}
        headerAniStyle={styles.headerAniStyle}
        rightComponent={rightComponent}
      >
        <View style={styles.wrapContent}>
          <Text type="H3" semibold>
            {t('how_to_start')}
          </Text>
          <ItemAutomate type={type} />
          {type === AUTOMATE_TYPE.ONE_TAP && (
            <TouchableOpacity
              onPress={handleScriptAction}
              style={styles.activeButton}
            >
              <Image source={Images.activeButton} />
            </TouchableOpacity>
          )}

          <View style={styles.row}>
            <Text type="H3" color={Colors.Gray9} semibold>
              {t('active_list')}
            </Text>
            {havePermission && (
              <TouchableOpacity onPress={onPressEdit} style={styles.editButton}>
                <Text type="Label" hilight>
                  {t('edit')}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {data.map((item, index) => (
            <Item key={item?.id} item={item} index={index} />
          ))}
          <ItemAdd index={data.length} />
        </View>
      </WrapHeaderScrollable>
      <MenuActionMore
        isVisible={showingPopover}
        hideMore={hidePopover}
        listMenuItem={listMenuItem}
        childRef={childRef}
        onItemClick={onItemClick}
        isTextCenter={false}
        wrapStyle={styles.wrapStyle}
      />
    </View>
  );
};

export default ScriptDetail;
