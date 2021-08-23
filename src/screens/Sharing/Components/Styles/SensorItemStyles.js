import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import { normalize } from '../../../../configs/Constants';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: normalize(16),
  },
  viewLeft: {
    marginRight: normalize(16),
    width: normalize(24),
    height: normalize(24),
    marginTop: normalize(14),
  },
  viewRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: normalize(16),
  },
  text: {
    color: Colors.Gray9,
    fontWeight: '400',
    fontSize: normalize(16),
    flex: 1,
    paddingRight: normalize(20),
    fontStyle: 'normal',
  },
  viewSeparated: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginTop: normalize(16),
  },
  wrapRight: {
    flex: 1,
  },
  isRenderSeparated: {
    paddingBottom: normalize(16),
  },
  wrapCheckBoxStyle: {
    marginLeft: normalize(-10),
  },
  wrapChild: {
    zIndex: -1,
    marginTop: normalize(10),
    marginRight: normalize(30),
  },
  titleStyle: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  wrapExpand: {
    marginTop: 10,
  },
});
