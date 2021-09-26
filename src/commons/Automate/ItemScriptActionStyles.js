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
    padding: 10,
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
    height: '100%',
    marginRight: 24,
  },
  border: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.Gray4,
  },
  row: {
    flexDirection: 'row',
  },
  unitName: {
    marginRight: 4,
  },
  iconItem: {
    width: 40,
    height: 40,
  },
});
