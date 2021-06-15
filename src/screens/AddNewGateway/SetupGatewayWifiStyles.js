import { StyleSheet } from 'react-native';

import { Colors, Device } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  txtHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  txtNote: {
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  textInput: {
    width: '100%',
    height: 58,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    fontSize: 16,
    fontFamily: 'SFProDisplay-Regular',
    lineHeight: 24,
  },
  textWifi: {
    marginTop: 15,
    marginBottom: 0,
    paddingBottom: 0,
  },
  wifiInput: {
    marginTop: 0,
    paddingTop: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Primary,
    paddingLeft: 0,
  },
  noMarginTop: {
    marginTop: 0,
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
