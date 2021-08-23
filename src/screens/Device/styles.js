import { StyleSheet } from 'react-native';
import { Colors, Device } from '../../configs';
import { standardizeCameraScreenSize } from '../../utils/Utils';

const { standardizeWidth, standardizeHeight } = standardizeCameraScreenSize(
  Device.screenWidth - 32
);

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  title: {
    marginHorizontal: 16,
  },
  mediaContainer: {
    alignSelf: 'center',
    width: standardizeWidth,
    height: standardizeHeight,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  chartStyle: {
    paddingHorizontal: 16,
  },
  bottomButtonEmergencyResolve: {
    borderTopWidth: 1,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
    height: 158,
  },
  bottomButtonEmergencyContact: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
  countDown: {
    marginBottom: 16,
    marginTop: 8,
  },
  messageCountDown: {
    marginBottom: 8,
  },
  locationName: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textName: {
    marginBottom: 19,
  },
  textResolved: {
    fontSize: 30,
    marginTop: 19,
    marginBottom: 24,
  },
  textYourEmergencySituation: {
    textAlign: 'center',
  },
  marginLeft: {
    marginLeft: 16,
  },
  marginVertical: {
    marginVertical: 10,
  },
  menuAction: {
    borderRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  wrapTemplate: {
    marginBottom: 20,
  },
});
