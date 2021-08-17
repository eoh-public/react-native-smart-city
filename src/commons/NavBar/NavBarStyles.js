import { Platform, StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 10,
    paddingTop: 27,
  },
  separator: {
    borderBottomWidth: 0.5,
    borderColor: Colors.Border,
  },
  iconBack: {
    width: 12,
    height: 18,
  },
  btnBack: {
    width: 48,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: Colors.Gray3,
    marginTop: 5,
  },
  iconFresh: {
    width: 20,
    height: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  title2: {
    marginLeft: -20,
  },
  wrapTitle: {
    flex: 1,
    marginHorizontal: 12,
  },
  wrapStyle: {
    marginTop: Platform.select({
      ios: 0,
      android: -30,
    }),
  },
});
