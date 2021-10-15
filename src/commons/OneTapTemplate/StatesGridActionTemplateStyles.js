import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  textwithline: {
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
});
