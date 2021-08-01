import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrapSummaryItem: {
    paddingTop: 15,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  summaryText: {
    marginTop: 4,
  },
  dashItem: {
    height: 48,
    width: 1,
    backgroundColor: Colors.WrapGray,
  },
});
