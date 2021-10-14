import { StyleSheet } from 'react-native';
import { Colors, Theme } from '../../configs';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  commonWrap: {
    flex: 1,
  },
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: getStatusBarHeight(),
  },
  padding: {
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginTop: 20,
    lineHeight: 28,
    marginBottom: 16,
  },
  textInput: {
    marginTop: 0,
  },
  formWrapper: {
    ...Theme.whiteBoxRadius,
    paddingTop: 0,
    paddingBottom: 24,
  },
  roomName: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    paddingLeft: 0,
    fontSize: 16,
    lineHeight: 24,
    margin: 0,
    padding: 0,
  },
  wrapWallpaper: {
    marginTop: 6,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addWallpaper: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 14,
    paddingTop: 14,
  },
  wallpaper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  wallpaperEmpty: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: Colors.Pink1,
  },
});
