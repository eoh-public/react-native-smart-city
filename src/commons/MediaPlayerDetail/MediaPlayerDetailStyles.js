import { Colors } from '../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: Colors.TextGray,
    overflow: 'hidden',
  },
  loadingWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: Colors.White,
  },
  player: {
    zIndex: 0,
    flex: 1,
    borderRadius: 10,
  },
  videoBtn: {
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
  },
  buttonPause: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
