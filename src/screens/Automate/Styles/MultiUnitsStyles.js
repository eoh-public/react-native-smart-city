import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Theme, Colors, Constants } from '../../../configs';

export default StyleSheet.create({
  ...Theme,
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  wrapTab: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  tabName: {
    height: 30,
    paddingHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabNameActive: {
    backgroundColor: Colors.Gray3,
  },
  wrapContent: {
    paddingHorizontal: 16,
    paddingBottom: 70 + getBottomSpace(),
  },
  wrapAutomateItem: {
    backgroundColor: Colors.White,
    height: 106,
    width: (Constants.width - 40) / 2,
    borderRadius: 8,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 5,
  },
  wrapItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  marginRigt8: {
    marginRight: 8,
  },
  addNewItem: {
    marginTop: 7,
    width: 166,
    height: 104,
  },
});
