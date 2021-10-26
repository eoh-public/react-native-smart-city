import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

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
  iconAndTextOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  marginRight: {
    marginRight: 10,
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
  writeNotAvailable: {
    marginLeft: 16,
  },
  scrollView: {
    height: 350,
  },
});
