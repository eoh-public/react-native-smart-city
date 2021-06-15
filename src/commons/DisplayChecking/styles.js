import { StyleSheet } from 'react-native';

import { Colors, Device } from '../../configs';

export default StyleSheet.create({
  maskOutter: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  viewVerifing: {
    marginLeft: 16,
    height: 54,
    width: Device.screenWidth - 32,
    borderRadius: 27,
    flexDirection: 'row',
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonShadow: {
    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    marginRight: 16,
  },
  text: {
    marginLeft: 8,
  },
});
