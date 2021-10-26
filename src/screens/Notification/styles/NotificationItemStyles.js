import { StyleSheet } from 'react-native';
import { Colors } from '../../../configs';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    backgroundColor: Colors.White,
  },
  backgroundGray: {
    backgroundColor: Colors.Gray2,
  },
  wrapIcon: {
    backgroundColor: Colors.WrapGray,
    width: 48,
    height: 48,
    marginRight: 16,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewRight: {
    flexShrink: 1,
  },
  time: {
    marginTop: 12,
  },
  textNotification: {
    lineHeight: 26,
  },
  iconNotification: {
    width: '46%',
  },
  iconInviteMember: {
    width: '46%',
    color: Colors.Summer,
  },
  border: {
    color: Colors.Primary,
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRadius: 50,
    width: 120,
  },
});
