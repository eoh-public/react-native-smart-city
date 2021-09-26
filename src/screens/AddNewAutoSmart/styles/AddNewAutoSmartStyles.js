import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  titleCreate: {
    fontStyle: 'normal',
    fontWeight: '600',
    color: Colors.Gray9,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  titleChoose: {
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.Gray8,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  container: {
    position: 'relative',
    height: 'auto',
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
