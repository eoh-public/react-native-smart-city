import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors, Constants, Theme } from '../../../configs';

export default StyleSheet.create({
  ...Theme,
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
  wrapCondition: {
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 10,
  },
  wrapItem: {
    marginTop: 32,
  },
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 14,
    color: Colors.Gray9,
    fontWeight: '400',
  },
  description: {
    textAlign: 'center',
    marginTop: 4,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ rotate: '180deg' }],
    tintColor: Colors.Gray7,
    width: 7,
    height: 11,
  },
  wrapStyleCheckBox: {
    marginLeft: 3,
  },
  container: {
    height: Constants.height,
  },
});
