import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

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
  previewImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  hideImage: {
    opacity: 0,
    height: 0,
    width: 0,
  },
  player: {
    zIndex: 0,
    borderRadius: 10,
    height: '100%',
  },
  videoBtn: {
    flex: 1,
  },
  bottomView: {
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    left: 0,
    height: '100%',
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'rgba(0,0,0,0)',
  },
});
