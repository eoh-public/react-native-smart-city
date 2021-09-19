import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';
import { Constants } from '../../../configs';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  columeFlex: {
    paddingLeft: 16,
    flexDirection: 'column',
  },
  rowFlex: {
    flexDirection: 'row',
  },
  endFlex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 16,
  },
  Border: {
    display: 'flex',
    width: '100%',
    borderWidth: 0,
    borderColor: Colors.Gray4,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    flexDirection: 'row',
    paddingTop: 16,
    paddingBottom: 16,
  },
  titleName: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.Gray9,
  },
  status: {
    fontSize: 12,
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: '400',
    color: Colors.Gray7,
  },
  titleGuest: {
    fontSize: 20,
    lineHeight: 28,
    fontStyle: 'normal',
    fontWeight: '600',
    color: Colors.Gray9,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
  },
  container: {
    paddingTop: 16,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  textNoGuest: {
    alignSelf: 'center',
    marginTop: Constants.height * 0.3,
    fontSize: 16,
  },
  loading: {
    marginTop: 24,
  },
});
