import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { useRoute } from '@react-navigation/core';

import WrapHeaderScrollable from '../../commons/Sharing/WrapHeaderScrollable';
import { useTranslations } from '../../hooks/Common/useTranslations';
import Text from '../../commons/Text';
import styles from './Styles/indexStyles';
import { Colors } from '../../configs';
import FImage from '../../commons/FImage';
import Rearrange from '../../../assets/images/Rearrange.svg';
import Close from '../../../assets/images/Close.svg';

const EditActionsList = () => {
  const t = useTranslations();
  const { params = {} } = useRoute();
  const { data = [] } = params;
  const [actionsList, setActionList] = useState(
    [...data].map((item) => {
      return {
        ...item,
        key: `item-${item?.id}`,
      };
    })
  );

  const onPressCancel = useCallback(() => {
    setActionList(
      [...data].map((item) => {
        return {
          ...item,
          key: `item-${item?.id}`,
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressSave = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressRemove = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert(t('feature_under_development'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <TouchableOpacity onPress={onPressRemove} style={styles.closeButton}>
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
    </View>
  );
};

export default EditActionsList;
