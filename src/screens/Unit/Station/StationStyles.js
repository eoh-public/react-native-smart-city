import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 5,
    color: Colors.Gray7,
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    color: Colors.Gray6,
    fontSize: 14,
  },
  wrapTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleActive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.Gray9,
  },
  viewSeparated: {
    width: 1,
    backgroundColor: Colors.Gray4,
    height: '100%',
    marginHorizontal: 10,
  },
  viewSeparatedFavorites: {
    height: '120%',
  },
});
