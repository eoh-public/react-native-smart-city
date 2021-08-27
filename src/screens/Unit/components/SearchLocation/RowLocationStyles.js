import { StyleSheet } from 'react-native';
import { Colors } from '../../../../configs';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.Gray2,
    paddingVertical: 5,
  },
  rowContainerDescription: {
    marginTop: -12,
    flexDirection: 'row',
  },
  icon: {
    marginVertical: 16,
    marginRight: 24,
  },
  textTitle: {
    color: Colors.Gray7,
    flex: 1,
  },
  textDistance: {
    width: 64,
    marginRight: 8,
    textAlign: 'center',
    overflow: 'visible',
  },
  textAddress: {
    flex: 1,
    marginBottom: 16,
  },
});
