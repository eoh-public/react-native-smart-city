import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  title: {
    marginHorizontal: 16,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 100,
  },
  bottomButtonView: {
    paddingTop: 24,
    paddingBottom: 32,

    backgroundColor: Colors.White,
    borderColor: Colors.ShadownTransparent,
    borderTopWidth: 1,
  },
});
