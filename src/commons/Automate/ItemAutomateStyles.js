import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    padding: 16,
    margin: 16,
    marginTop: 0,
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
  active: {
    borderWidth: 2,
    borderColor: Colors.Primary,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
  },
  wrapIcon: {
    justifyContent: 'center',
    marginRight: 16,
  },
});
