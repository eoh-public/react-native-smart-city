import { StyleSheet } from 'react-native';
import { normalize } from '../../../configs/Constants';
import { Colors, Constants } from '../../../configs';

export default StyleSheet.create({
  wrapFull: {
    width: Constants.width,
    height: Constants.height,
    position: 'absolute',
    zIndex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    width: Constants.width,
    height: 224,
  },
  loadingWrap: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.TextGray,
  },
  loadingText: {
    color: Colors.White,
  },
  player: {
    zIndex: 0,
    flex: 1,
    borderRadius: 10,
  },
  flex1: {
    flex: 1,
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  cameraName: {
    top: 15,
    left: 10,
    color: Colors.Gray1,
    position: 'absolute',
    width: '60%',
  },
  buttonPause: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cameraName2: {
    fontSize: normalize(10),
    top: '75%',
  },
  wrapIconFullScreen: {
    position: 'absolute',
    width: 40,
    height: 40,
    bottom: 5,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconFullScreen: {
    width: 22,
    height: 20,
  },
  video: {
    width: '100%',
    height: '100%',
  },
});
