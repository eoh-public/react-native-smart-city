import { Colors } from '../../configs';

import { StyleSheet, StatusBar, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContainer: {
    width: '100%',
    flex: 1,
  },
  title: {
    color: Colors.Gray9,
    fontSize: 20,
    lineHeight: 28,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 16,
  },
  subtitle: {
    color: Colors.Gray8,
    fontSize: 14,
    lineHeight: 22,
    marginLeft: 16,
    marginBottom: 16,
  },
  row: {
    flex: 1,
    paddingVertical: 16,
    borderBottomColor: Colors.Gray4,
    borderBottomWidth: 1,
    marginRight: 24,
    marginLeft: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  buttonAdd: {
    marginHorizontal: 16,
  },
});
