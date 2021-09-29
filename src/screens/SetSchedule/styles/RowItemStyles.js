import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.White,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  itemLeft: {},
  itemRight: {
    justifyContent: 'flex-end',
    paddingVertical: 4,
  },
  center: {
    justifyContent: 'center',
  },
});
