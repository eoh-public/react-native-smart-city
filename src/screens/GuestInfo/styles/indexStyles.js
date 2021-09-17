import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  userWrap: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: Colors.Primary,
  },
  loading: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  rowRight: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 8,
    width: 15,
  },
  separator: {
    borderBottomColor: Colors.Gray3,
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
});
