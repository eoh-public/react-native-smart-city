import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },
  textHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  textNote: {
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
});
