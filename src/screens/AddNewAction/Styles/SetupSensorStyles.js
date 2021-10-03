import { StyleSheet } from 'react-native';
import { Theme, Colors } from '../../../configs';

export default StyleSheet.create({
  ...Theme,
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    margin: 0,
    padding: 0,
  },
  modalContent: {
    borderRadius: 8,
    backgroundColor: Colors.White,
    marginHorizontal: 24,
  },
  itemModal: {
    padding: 16,
  },
  separated: {
    height: 1,
    backgroundColor: Colors.Gray4,
    marginHorizontal: 16,
  },
  itemCondition: {
    padding: 10,
    marginTop: 32,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  desciption: {
    marginTop: 4,
  },
  setANumber: {
    marginVertical: 28,
    marginHorizontal: 16,
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 15,
  },
  unit: {
    marginTop: -30,
  },
  underline: {
    width: '90%',
    height: 1,
    backgroundColor: Colors.Black,
    marginLeft: 15,
  },
  bottomButtonView: {
    paddingTop: 24,
    paddingBottom: 32,
    backgroundColor: Colors.White,
    borderColor: Colors.ShadownTransparent,
    borderTopWidth: 1,
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ rotate: '180deg' }],
    tintColor: Colors.Gray7,
    width: 7,
    height: 11,
  },
});
