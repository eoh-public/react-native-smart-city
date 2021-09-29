import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapPopup: {
    marginHorizontal: 16,
  },
  popup: {
    backgroundColor: Colors.White,
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  rowRepeatOption: {
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 0.5,
    paddingVertical: 16,
  },
  textRepeatOption: {
    marginBottom: -4,
  },
});
