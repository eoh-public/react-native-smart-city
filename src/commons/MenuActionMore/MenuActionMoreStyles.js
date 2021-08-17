import { Colors } from 'configs/Colors';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    backgroundColor: Colors.TextTransparent,
  },
  menuStyle: {
    marginTop: -25,
    borderRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  menuWrapper: {
    flex: 1,
    flexDirection: 'column',
    borderRadius: 20,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  modalHeaderCenter: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.white,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
});
