import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    height: 76,
    backgroundColor: Colors.White,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    shadowColor: Colors.Gray6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 9,
  },
  active: {
    borderWidth: 2,
    borderColor: Colors.Primary,
  },
  row: {
    flexDirection: 'row',
  },
  wrapIcon: {
    justifyContent: 'center',
    marginRight: 16,
  },
});
