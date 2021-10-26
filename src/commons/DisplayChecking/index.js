import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';

import { Colors } from '../../configs';
import Text from '../../commons/Text';
import { IconOutline } from '@ant-design/icons-react-native';
import Loading from '../../commons/Explore/ActivityIndicator';
import styles from './styles';
import { ModalCustom } from '../Modal';

const LoadingMessage = memo(({ visible, onClose, message }) => {
  return (
    !!visible && (
      <View style={styles.maskOutter}>
        <TouchableOpacity
          style={[styles.viewVerifing, styles.buttonShadow]}
          onPress={onClose}
        >
          <Loading
            icon={<IconOutline name={'sync'} color={Colors.Green6} size={16} />}
          />
          <Text type={'Body'} style={styles.text}>
            {message}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
});

const LoadingMessageWithModal = memo(({ visible, onClose, message }) => {
  return (
    <ModalCustom
      isVisible={visible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <LoadingMessage visible={true} message={message} />
    </ModalCustom>
  );
});

const DisplayChecking = memo((props) => {
  return props.isOpacityLayout ? (
    <LoadingMessageWithModal {...props} />
  ) : (
    <LoadingMessage {...props} />
  );
});

export default DisplayChecking;
