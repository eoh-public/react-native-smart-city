import React, { memo } from 'react';
import { View } from 'react-native';
import { ModalCustom } from '../Modal';
import Text from '../Text';
import styles from './styles';

const BottomSheet = ({
  isVisible,
  onBackdropPress,
  onHide,
  title,
  children,
}) => {
  return (
    <ModalCustom
      isVisible={isVisible}
      onBackButtonPress={onBackdropPress}
      onBackdropPress={onBackdropPress}
      onModalHide={onHide}
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
    </ModalCustom>
  );
};

export default memo(BottomSheet);
