import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
  },
  unitSummary: {
    flex: 1,
    flexDirection: 'row',
  },
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
  canAdd: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subUnitTitle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Gray8,
  },
  emptyUnit: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray6,
    top: 60,
  },
  subUnitsHeading: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  boxUnitEmpty: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  containerUnit: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modal: {
    margin: 0,
    padding: 0,
  },
});
