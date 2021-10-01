import { StatusBar, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../configs';

export default StyleSheet.create({
  containerAndroid: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: StatusBar.currentHeight,
  },
  containerIOS: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: 0,
  },
  textHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  noMarginTop: {
    margin: 16,
  },
  textInput: {
    marginTop: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray4,
    paddingLeft: 0,
    backgroundColor: Colors.Gray2,
  },
  viewBottomFixed: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 32,
    paddingTop: 24,
    backgroundColor: Colors.White,
    borderColor: Colors.ShadownTransparent,
    borderTopWidth: 1,
  },
});
