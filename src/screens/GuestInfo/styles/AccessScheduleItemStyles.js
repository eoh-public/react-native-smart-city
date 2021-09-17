import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  rowWrap: {
    paddingHorizontal: 16,
  },
  rowContent: {
    paddingVertical: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textAccessSchedule: {
    marginLeft: 8,
  },
  separator: {
    borderBottomColor: Colors.Gray3,
    borderBottomWidth: 1,
  },
});
