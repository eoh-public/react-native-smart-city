import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from '../../../configs';
import { Constants, normalize } from '../../../configs/Constants';

export default StyleSheet.create({
  containerAndroid: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: StatusBar.currentHeight,
  },
  containerIOS: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.Gray9,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  subtitle: {
    color: Colors.Gray8,
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 16,
    marginBottom: 6,
  },
  checkBoxTile: {
    marginLeft: 5,
  },
  wrapSensor: {
    borderRadius: normalize(20),
    borderWidth: 1,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
  },
  viewGroup: {
    marginTop: normalize(8),
  },
  wrapAllDevices: {
    marginBottom: -10,
    marginLeft: 5,
  },
  textNodata: {
    alignSelf: 'center',
    marginTop: normalize(Constants.height * 0.3),
  },
});
