import { StyleSheet } from 'react-native';
import { Colors, Device } from '../../../configs';

export default StyleSheet.create({
  boxImage: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 8,
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
  viewAll: {
    color: Colors.Orange,
  },
  UnitsHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 3,
  },
});
