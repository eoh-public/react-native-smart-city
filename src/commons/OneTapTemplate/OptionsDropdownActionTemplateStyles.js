import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  popoverStyle: {
    width: '100%',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  textwithline: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  wrapContent: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  lineBottom: {
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContent: {
    marginLeft: 8,
    paddingTop: 4,
  },
  textTemperature: {
    paddingLeft: 64,
    paddingRight: 64,
  },
  wrapButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 16,
  },
  flexContent: {
    //   flexDirection: 'row',
  },
});
