import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  title: {
    marginTop: 16,
  },
  value: {
    marginTop: 8,
  },
  repeatWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  repeatItem: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0,
    borderColor: Colors.Orange,
  },
  repeatItemSelected: {
    borderWidth: 1,
  },
  repeatText: {
    lineHeight: 16,
  },
});
