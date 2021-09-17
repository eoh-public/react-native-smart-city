import React, { memo } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import Text from '../Text';

import styles from './styles';

const BottomSheet = ({ isVisible, onHide, title, children }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      style={styles.modalContainer}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
    >
      <View style={styles.popoverStyle}>
        <View style={styles.modalWrapper}>
          {!!title && (
            <View style={styles.modalHeader}>
              <Text semibold style={styles.modalHeaderText}>
                {title}
              </Text>
            </View>
          )}

          {children}
        </View>
      </View>
    </Modal>
  );
};

export default memo(BottomSheet);
