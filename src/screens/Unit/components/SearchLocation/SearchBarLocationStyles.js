import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../configs';

export default StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 10,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.Gray2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.Gray2,
  },
  buttonLeft: {
    paddingLeft: 20,
    paddingRight: 10,
    justifyContent: 'center',
  },
  buttonRight: {
    paddingLeft: 10,
    paddingRight: 16,
    justifyContent: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  textInput: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
    paddingLeft: 10,
    fontFamily: Fonts.Regular,
    fontSize: 14,
    color: Colors.Gray9,
  },
});
