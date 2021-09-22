import { Colors } from '../../../configs';
import { Platform, StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  wrapContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: getBottomSpace() + 10,
  },
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  box: {
    height: 76,
    backgroundColor: Colors.White,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.22,
    shadowRadius: 4,
    elevation: 3,
  },
  wrapText: {
    flex: 1,
    marginLeft: 16,
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginRight: 20,
  },
  activeButton: {
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  editButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreButton: {
    marginLeft: -5,
  },
  wrapStyle: {
    borderRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    width: 160,
    marginTop: Platform.select({
      android: -25,
      ios: 0,
    }),
    marginLeft: -10,
  },
  wrapItem: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 16,
  },
  leftItem: {
    width: 41,
    height: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.Gray4,
  },
  leftItemAdd: {
    width: 41,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.Gray4,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  rightItem: {
    flex: 1,
    marginLeft: 4,
    borderRadius: 4,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  rightItemAdd: {
    flex: 1,
    marginLeft: 4,
    borderRadius: 4,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderStyle: 'dashed',
    borderWidth: 2,
  },
  noBorder: {
    borderWidth: 0,
  },
  iconItem: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  contentItem: {
    flex: 1,
  },
  addAction: {
    marginLeft: 24,
    marginTop: Platform.select({
      android: 3,
      ios: 0,
    }),
  },
  number: {
    position: 'absolute',
    zIndex: 10,
  },
});
