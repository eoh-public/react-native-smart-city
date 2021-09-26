import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleCreate: {
    fontStyle: 'normal',
    fontWeight: '600',
    color: Colors.Gray9,
  },
  titleChoose: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.Gray8,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: getBottomSpace() + 10,
  },
  bottomButton: {
    borderWidth: 0,
    borderColor: Colors.Gray4,
    paddingTop: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderStyle: 'solid',
    position: 'absolute',
    bottom: 0,
  },
});
