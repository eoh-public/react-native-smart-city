import { Colors } from '../../../../configs';
import { normalize } from '../../../../configs/Constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapBtn: {
    width: normalize(40),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapView: {
    width: normalize(18),
    height: normalize(18),
    borderRadius: normalize(9),
    borderWidth: normalize(1),
    borderColor: Colors.Gray5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
  },
  viewChecked: {
    borderColor: Colors.Primary,
    backgroundColor: Colors.Cyan1,
  },
});
