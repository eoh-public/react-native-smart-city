import { Colors } from '../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  card: {
    marginTop: 14,
    marginBottom: 14,
    marginHorizontal: 16,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  headerTitle: {
    display: 'flex',
    alignItems: 'flex-end',
    color: Colors.Gray8,
    fontSize: 16,
    lineHeight: 24,
  },
});
