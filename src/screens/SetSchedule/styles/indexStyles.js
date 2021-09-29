import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  title: {
    marginBottom: 32,
  },
  scollView: {
    paddingHorizontal: 16,
    paddingBottom: 150,
  },
  viewBottom: {
    borderColor: Colors.Gray4,
    paddingVertical: 24,
    borderTopWidth: 1,
    backgroundColor: Colors.White,
  },
});
