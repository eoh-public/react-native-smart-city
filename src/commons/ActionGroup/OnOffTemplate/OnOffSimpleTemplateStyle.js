import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    paddingVertical: 36,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconAndText: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginRight: {
    marginRight: 10,
  },
});
