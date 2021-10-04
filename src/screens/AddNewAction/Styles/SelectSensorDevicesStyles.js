import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
  },
  navbar: {
    paddingTop: 16,
  },
  title: {
    marginHorizontal: 16,
  },
  boxDevices: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 22,
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
  },

  bottomButtonView: {
    paddingTop: 24,
    paddingBottom: 32,

    backgroundColor: Colors.White,
    borderColor: Colors.ShadownTransparent,
    borderTopWidth: 1,
  },
});
