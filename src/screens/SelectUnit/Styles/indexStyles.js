import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  buttonClose: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  wrapContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: getBottomSpace() + 10,
  },
  wrapItem: {
    marginBottom: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginHorizontal: 16,
  },
  notSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Gray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    borderColor: Colors.Primary,
  },
  childSelected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Primary,
  },
  bottomButtonView: {
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: Colors.White,
    borderColor: Colors.ShadownTransparent,
    borderTopWidth: 1,
  },
});
