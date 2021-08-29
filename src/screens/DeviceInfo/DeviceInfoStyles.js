import { Colors } from '../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  content: {
    margin: 16,
  },
  textLeft: {
    borderColor: Colors.Gray9,
    fontWeight: 'bold',
    fontSize: 16,
  },
  textRight: {
    borderColor: Colors.Gray7,
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
    marginBottom: 16,
  },
});
