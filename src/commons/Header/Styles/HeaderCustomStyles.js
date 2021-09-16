import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 10,
    paddingBottom: 6,
    paddingTop: getStatusBarHeight() + 10,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderColor: Colors.Border,
  },
  iconBack: {
    width: 12,
    height: 18,
  },
  buttonBack: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonAdd: {
    paddingRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    flexDirection: 'row',
  },
  iconFresh: {
    width: 20,
    height: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  title2: {
    marginLeft: -20,
  },
  wrapTitle: {
    flex: 1,
    marginHorizontal: 12,
  },
});
