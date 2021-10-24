import React from 'react';
import Modal from 'react-native-modal';
import { Colors } from '../../configs';

const ModalCustom = (props) => {
  return (
    <Modal
      hasBackdrop
      useNativeDriver
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={500}
      animationOutTiming={500}
      backdropColor={Colors.BlackTransparent5}
      hideModalContentWhileAnimating
      {...props}
    >
      {props.children}
    </Modal>
  );
};

export default ModalCustom;
