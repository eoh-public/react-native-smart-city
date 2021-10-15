import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    flex: 1,
  },
  DeviceButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray3,
  },
  DeviceButtonLeft: {
    paddingLeft: 16,
  },
  DeviceButtonRight: {
    flexDirection: 'row',
    paddingRight: 16,
  },
  iconRight: {
    paddingLeft: 16,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 32 + getBottomSpace(),
  },
  removeBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Red,
  },
  textInputStyle: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    fontSize: 16,
    marginLeft: 16,
    marginRight: 16,
    paddingHorizontal: 0,
  },
  textInputWrapStyle: {
    marginTop: 0,
  },
});
