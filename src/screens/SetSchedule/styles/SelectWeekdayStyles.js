import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    marginTop: 16,
  },
  row: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  item: {
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: Colors.Gray3,
  },
  selected: {
    backgroundColor: Colors.Primary,
  },
  text: {
    marginTop: 4,
  },
});
