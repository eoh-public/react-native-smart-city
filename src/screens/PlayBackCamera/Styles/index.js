import { StyleSheet } from 'react-native';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapCamera: {
    height: 224,
  },
  camera: {
    borderRadius: 0,
    height: '100%',
  },
  wrapStyles: {
    borderRadius: 0,
  },
  modal: {
    margin: 0,
    padding: 0,
  },
  wrapDate: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.White,
  },
  arrowRight: {
    transform: [{ rotate: '180deg' }],
  },
  headerStyle: {
    paddingTop: 16,
  },
  viewSeparated: {
    height: 1,
    backgroundColor: Colors.Gray3,
    marginTop: 5,
  },
  wrapBottomButton: {
    height: 56 + (isIphoneX() ? 10 : 0),
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 80,
    flexDirection: 'row',
    marginTop: -10,
  },
  commomButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    bottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDate: {
    marginLeft: 32,
    marginRight: 10,
  },
  iconDate: {
    marginRight: 32,
  },
  timer: {
    height: 80,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: Colors.Gray4,
  },
});
