import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import { normalize } from '../../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: Colors.Gray9,
    fontSize: normalize(16),
    lineHeight: normalize(24),
    fontWeight: '600',
  },
});
