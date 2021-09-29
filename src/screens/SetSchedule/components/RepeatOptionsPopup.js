import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import Text from '../../../commons/Text';
import { useTranslations } from '../../../hooks/Common/useTranslations';

import styles from '../styles/RepeatOptionsPopupStyles';
import { Colors } from '../../../configs';

export const REPEAT_OPTIONS = {
  ONCE: 'once',
  EVERYDAY: 'every_day',
  EVERYWEEK: 'every_week',
};

const RepeatOptionsPopup = ({ isVisible, onHide, onSetRepeat }) => {
  const t = useTranslations();

  const ItemRepeatOption = useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          style={styles.rowRepeatOption}
          onPress={() => onSetRepeat(item)}
        >
          <Text type="H4" color={Colors.Gray9} style={styles.textRepeatOption}>
            {t(`${item}`)}
          </Text>
        </TouchableOpacity>
      );
    },
    [t, onSetRepeat]
  );

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={styles.wrapPopup}
    >
      <View style={styles.popup}>
        {Object.values(REPEAT_OPTIONS).map((item, index) => (
          <ItemRepeatOption item={item} key={index} />
        ))}
      </View>
    </Modal>
  );
};

export default RepeatOptionsPopup;
