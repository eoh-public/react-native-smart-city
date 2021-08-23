import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import { normalize } from '../../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.Gray8,
    fontSize: normalize(14),
    lineHeight: normalize(22),
    fontWeight: '600',
    fontStyle: 'normal',
  },
});
