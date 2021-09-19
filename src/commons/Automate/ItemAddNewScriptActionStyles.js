import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    height: 110,
  },
  wrapOrder: {
    padding: 8,
    marginRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  wrapIcon: {
    width: 32,
    height: 32,
    backgroundColor: Colors.Gray3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 24,
  },
  border: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.Gray4,
    borderStyle: 'dashed',
  },
});
