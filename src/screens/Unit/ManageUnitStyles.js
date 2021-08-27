import { StyleSheet } from 'react-native';
import { Colors, Device } from '../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.White,
  },
  wraper: {
    flex: 1,
    marginHorizontal: 16,
  },
  buttonWrapper: {
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.Gray6,
  },
  buttonInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonValue: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  value: {
    marginRight: 20,
  },
  location: {
    marginTop: 16,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 16 + getBottomSpace(),
  },
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
  removeBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.Red,
  },
  leftButtonStyle: {
    color: Colors.Red,
  },
  rightButtonStyle: {
    color: Colors.Gray7,
  },
  modalContainer: {
    flex: 1,
    margin: 0,
  },
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
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
