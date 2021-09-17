import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { getStatusBarHeight } from '../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 16,
    paddingBottom: 6,
    paddingTop: getStatusBarHeight(),
    borderBottomWidth: 0.5,
    borderColor: Colors.Border,
  },
  icon: {
    width: 12,
    height: 18,
  },
  button: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapTitle: {
    flex: 1,
    alignItems: 'center',
  },
});
