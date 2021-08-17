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
  wrapItem: {
    flexDirection: 'row',
  },
  separatedView: {
    paddingLeft: 16,
    paddingRight: 20,
    alignItems: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  straightLine: {
    width: 1,
    height: 40,
    backgroundColor: Colors.Primary,
  },
  textLeft: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.Gray8,
    marginTop: -6,
    width: '10%',
  },
  name: {
    fontWeight: 'bold',
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
  wrapText: {
    flexShrink: 1,
  },
  text: {
    marginTop: -6,
    lineHeight: 22,
    flexShrink: 1,
  },
});
