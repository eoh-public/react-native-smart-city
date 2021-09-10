import { StyleSheet } from 'react-native';
import { Device, Colors, Theme } from '../../configs';
import { standardizeCameraScreenSize } from '../../utils/Utils';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  boxCamera: {
    height: standardizeHeight,
    width: standardizeWidth,
    alignSelf: 'center',
    borderRadius: 10,
    ...Theme.shadow,
  },
  subUnitTitle: {
    fontSize: 20,
    lineHeight: 28,
    color: Colors.Gray8,
    marginLeft: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  emptyDevice: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 28,
    color: Colors.Border,
  },
  boxDevices: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  boxEmptyDevices: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
  },
});
