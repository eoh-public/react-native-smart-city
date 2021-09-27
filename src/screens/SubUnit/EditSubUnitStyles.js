import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  wraper: {
    flex: 1,
  },
  title: {
    paddingLeft: 22,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 16,
  },
  subUnitData: {
    backgroundColor: Colors.White,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 20,
    padding: 16,
    paddingTop: 8,
    paddingBottom: 24,
    marginBottom: 24,
  },
  textWraper: {
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 0.5,
  },
  subUnitName: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  removeButton: {
    position: 'absolute',
    bottom: 0,
    borderWidth: 0,
    alignSelf: 'center',
    paddingBottom: 16 + getBottomSpace(),
  },
  removeText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray6,
  },
  backgroundContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
  textBackground: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 16,
  },
  //Modal
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
  buttonContacts: {
    marginTop: 8,
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
