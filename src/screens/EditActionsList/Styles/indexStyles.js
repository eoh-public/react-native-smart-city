import { Colors } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  headerAniStyle: {
    borderBottomWidth: 0,
  },
  wrapContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  wrapItem: {
    flexDirection: 'row',
    height: 100,
    marginBottom: 16,
  },
  leftItem: {
    width: 41,
    height: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: Colors.Gray4,
  },
  rightItem: {
    flex: 1,
    marginLeft: 4,
    borderRadius: 4,
    borderColor: Colors.Gray4,
    borderWidth: 1,
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  rightItemAdd: {
    flex: 1,
    marginLeft: 4,
    borderRadius: 4,
    borderColor: Colors.Gray4,
  },
  noBorder: {
    borderWidth: 0,
  },
  iconItem: {
    width: 40,
    height: 40,
    marginRight: 24,
  },
  contentItem: {
    flex: 1,
  },
  containerStyle: {
    marginVertical: 16,
  },
  wrapBottom: {
    height: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 70,
  },
  closeButton: {
    width: 40,
    height: 30,
    alignItems: 'center',
    marginRight: -10,
  },
  wrapChildModal: {
    padding: 16,
  },
  messageDelete: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  textHighlight: {
    fontWeight: 'bold',
  },
});
