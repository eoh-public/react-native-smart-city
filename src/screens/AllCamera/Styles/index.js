import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { normalize } from '../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  camera: {
    borderRadius: 0,
    height: '100%',
  },
  wrapStyles: {
    borderRadius: 0,
  },
  wrapItem: {
    width: '100%',
    height: 224,
    backgroundColor: Colors.Gray4,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  wrapAmount: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  buttonAmount: {
    width: normalize(45),
    height: normalize(24),
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
    backgroundColor: Colors.White,
  },
  buttonAmountActive: {
    backgroundColor: Colors.Primary,
  },
  wrap2: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(-100),
    width: '60%',
  },
  buttonNext: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraName: {
    paddingHorizontal: normalize(20),
    flex: 1,
    textAlign: 'center',
    fontSize: normalize(16),
  },
  wrapCarousel: {
    height: normalize(224),
    marginBottom: normalize(14),
    marginTop: normalize(10),
  },
  modal: {
    margin: 0,
    padding: 0,
  },
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
  arrowRight: {
    transform: [{ rotate: '180deg' }],
  },
});
