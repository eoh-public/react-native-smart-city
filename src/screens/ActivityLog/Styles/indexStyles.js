import { Colors } from '../../../configs';
import { Constants } from '../../../configs';
import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapList: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.Gray9,
    marginBottom: 20,
    marginTop: 10,
  },
  textDesNoActivity: {
    alignSelf: 'center',
    marginTop: Constants.height * 0.3,
    fontSize: 16,
  },
  loadMore: {
    marginTop: 10,
    marginBottom: 16 + getBottomSpace(),
  },
  contentContainerStyle: {
    paddingBottom: 16,
  },
});
