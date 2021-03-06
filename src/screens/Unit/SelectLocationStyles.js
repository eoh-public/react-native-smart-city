import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomButton: {
    backgroundColor: Colors.White,
  },
  pointCircle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 109,
    height: 109,
    borderRadius: 50,
    backgroundColor: Colors.BlueTransparent5,
    borderWidth: 1,
    borderColor: Colors.Blue10,
  },
  searchLocation: {
    paddingVertical: 8,
    position: 'absolute',
    zIndex: 1,
    minHeight: 48,
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: Colors.White,
  },
  searchData: {
    paddingHorizontal: 16,
    position: 'relative',
    width: '100%',
    maxHeight: 100,
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 9,
    backgroundColor: Colors.White,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    borderRadius: 30,
  },
  activeSessionView: {
    marginHorizontal: 16,
  },
  popupIcon: {
    marginLeft: '44%',
    marginBottom: 15,
  },
  popupTitle: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  popupDes: {
    alignSelf: 'center',
    textAlign: 'center',
    width: '95%',
  },
  buttonAgree: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: 30,
  },
  childrenStyle: {
    padding: 16,
  },
  scrollViewTerm: {
    height: 300,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderTopColor: Colors.WrapGray,
    borderBottomColor: Colors.WrapGray,
  },
});
