import { Colors, Constants } from '../../../configs';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  wrapPopup: {
    marginHorizontal: 16,
  },
  popup: {
    backgroundColor: Colors.White,
    width: '100%',
    height: (Constants.height * 80) / 100,
    padding: 24,
    paddingBottom: 100,
    borderRadius: 10,
  },
  title: {
    marginBottom: 16,
  },
  bottomButtonView: {
    marginBottom: 24,
  },
  separator: {
    height: 0.5,
    backgroundColor: Colors.Gray4,
  },
  sectionTitle: {
    marginTop: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapText: {
    flex: 1,
    paddingVertical: 8,
    marginRight: 24,
    marginLeft: 16,
  },
});
