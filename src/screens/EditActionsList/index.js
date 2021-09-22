import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useNavigation, useRoute } from '@react-navigation/core';
import ParsedText from 'react-native-parsed-text';

import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useTranslations } from '../../hooks/Common/useTranslations';
import Text from '../../commons/Text';
import styles from './Styles/indexStyles';
import { API, Colors } from '../../configs';
import FImage from '../../commons/FImage';
import Rearrange from '../../../assets/images/Rearrange.svg';
import Close from '../../../assets/images/Close.svg';
import { axiosDelete, axiosPut } from '../../utils/Apis/axios';
import { ModalBottom } from '../../commons/Modal';
import { ToastBottomHelper } from '../../utils/Utils';

const EditActionsList = () => {
  const t = useTranslations();
  const { goBack } = useNavigation();
  const { params = {} } = useRoute();
  const { data = [], id, setData } = params;
  const [itemRemove, setItemRemove] = useState({
    id: '',
    actionName: '',
    stationName: '',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [actionsList, setActionList] = useState(
    [...data].map((item) => {
      return {
        ...item,
        key: `item-${item?.id}`,
      };
    })
  );

  const onPressCancel = useCallback(() => {
    goBack();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSave = useCallback(async () => {
    const { success } = await axiosPut(API.AUTOMATE.ORDER_SCRIPT_ACTION(id), {
      id_script_actions: actionsList.map((i) => i.id),
    });
    if (success) {
      setData && setData(actionsList);
      ToastBottomHelper.success(t('text_done'));
      goBack();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionsList, id, setData]);

  const onPressRemove = (item) => () => {
    setIsVisible(true);
    setItemRemove(item);
  };

  const onClose = useCallback(() => {
    setIsVisible(false);
  }, []);

  const onRemove = useCallback(async () => {
    const { success } = await axiosDelete(
      API.AUTOMATE.DELETE_SCRIPT_ACTION(id, itemRemove.id)
    );
    if (success) {
      ToastBottomHelper.success(t('removed_successfully'));
      onClose();
      const temp = [...actionsList];
      const index = actionsList.findIndex((item) => item.id === itemRemove.id);
      temp.splice(index, 1);
      setActionList(temp);
      setData && setData(temp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, itemRemove, actionsList]);

  const renderItem = useCallback(({ item, index, drag }) => {
    return (
      <TouchableOpacity style={styles.wrapItem} onLongPress={drag}>
        <View style={styles.leftItem}>
          <Text color={Colors.Gray9} type="H4" semibold>
            {index + 1 < 10 ? '0' + (index + 1) : index + 1}
          </Text>
          <Rearrange />
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
          <TouchableOpacity
            onPress={onPressRemove({
              id: item?.id,
              actionName: item?.sensor_name,
              stationName: item?.station_name,
            })}
            style={styles.closeButton}
          >
            <Close />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrap}>
      <WrapHeaderScrollable
        title={t('edit_actions_list')}
        headerAniStyle={styles.headerAniStyle}
      >
        <View style={styles.wrapContent}>
          <Text type="Body" color={Colors.Gray8}>
            {t('des_edit_actions_list')}
          </Text>
          <DraggableFlatList
            data={actionsList}
            renderItem={renderItem}
            keyExtractor={(item) => `draggable-item-${item.key}`}
            onDragEnd={({ data }) => setActionList(data)}
            extraData={actionsList}
            containerStyle={styles.containerStyle}
          />
        </View>
      </WrapHeaderScrollable>
      <View style={styles.wrapBottom}>
        <TouchableOpacity onPress={onPressCancel}>
          <Text type="H4" hilight semibold>
            {t('cancel')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressSave}>
          <Text type="H4" hilight semibold>
            {t('save')}
          </Text>
        </TouchableOpacity>
      </View>
      <ModalBottom
        isVisible={isVisible}
        title={t('delette_action')}
        onClose={onClose}
        onRemove={onRemove}
      >
        <View style={styles.wrapChildModal}>
          <ParsedText
            style={styles.messageDelete}
            parse={[
              {
                pattern: new RegExp(itemRemove?.actionName),
                style: styles.textHighlight,
              },
              {
                pattern: new RegExp(itemRemove?.stationName),
                style: styles.textHighlight,
              },
            ]}
            childrenProps={{ allowFontScaling: false }}
          >
            {t('message_delete_action', {
              actionName: itemRemove?.actionName,
              stationName: itemRemove?.stationName,
            })}
          </ParsedText>
        </View>
      </ModalBottom>
    </View>
  );
};

export default EditActionsList;
