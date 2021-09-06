import { StyleSheet } from 'react-native';
import { normalize } from '../../../configs/Constants';

export default StyleSheet.create({
  modalContent: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonFullScreen: {
    position: 'absolute',
    zIndex: 10,
    width: normalize(40),
    height: normalize(40),
    bottom: normalize(30),
    left: normalize(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapStyles: {
    borderRadius: 0,
  },
});
