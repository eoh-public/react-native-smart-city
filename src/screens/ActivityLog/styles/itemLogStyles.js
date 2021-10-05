import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapItem: {
    flexDirection: 'row',
  },
  separatedView: {
    paddingLeft: 16,
    paddingRight: 20,
    alignItems: 'center',
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.Primary,
  },
  straightLine: {
    width: 1,
    height: 40,
    backgroundColor: Colors.Primary,
  },
  textLeft: {
    fontSize: 12,
    lineHeight: 20,
    color: Colors.Gray8,
    marginTop: -6,
    width: '10%',
  },
  name: {
    fontWeight: 'bold',
  },
  wrapText: {
    flexShrink: 1,
  },
  text: {
    marginTop: -6,
    lineHeight: 22,
    flexShrink: 1,
  },
});
