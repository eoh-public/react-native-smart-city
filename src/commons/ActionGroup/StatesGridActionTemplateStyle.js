import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderTopWidth: 0,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  wrapOption: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 312,
  },
  gridItem: {
    width: 48,
    marginHorizontal: 12,
  },
  textMargin: {
    marginTop: 8,
  },
  textModeMargin: {
    marginBottom: 9,
    marginLeft: 16,
  },
  button: {
    width: 48,
    height: 48,
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    backgroundColor: Colors.White,
  },
});
