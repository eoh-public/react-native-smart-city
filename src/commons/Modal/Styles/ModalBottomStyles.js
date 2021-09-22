import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  modal: {
    margin: 0,
    padding: 0,
  },
  wrap: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 24,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 24,
    backgroundColor: Colors.White,
  },
  padding16: {
    paddingHorizontal: 16,
  },
  viewSeparated: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginTop: 16,
  },
  viewBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 67,
    marginTop: 8,
  },
});
