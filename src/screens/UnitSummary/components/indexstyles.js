import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  summaryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: Colors.Gray4,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftValue: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  leftText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
  },
  rightValue: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    lineHeight: 20,
    top: 2,
  },
  rightText: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 20,
    top: 4,
  },
});
