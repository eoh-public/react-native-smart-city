import { StyleSheet } from 'react-native';
import { Device } from '../../../configs';

export default StyleSheet.create({
  boxImage: {
    flexDirection: 'row',
    marginTop: 8,
    overflow: 'hidden',
    width: Device.screenWidth - 32,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: 160,
  },
  boxDevices: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },
  noShadow: {
    shadowOpacity: 0,
    elevation: 0,
  },
  device: {
    marginTop: 24,
  },
});
