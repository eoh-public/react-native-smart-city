import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    paddingBottom: 250,
  },
  title: {
    marginVertical: 16,
    marginLeft: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  viewBottom: {
    borderColor: Colors.Gray4,
    paddingVertical: 24,
    borderTopWidth: 1,
    backgroundColor: Colors.White,
  },
  automate: { marginRight: 16, marginLeft: 16 },
});
