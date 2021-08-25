import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../../configs';

const marginItem = 12;
const marginHorizontal = 16;
const widthItem = (Constants.width - marginHorizontal * 2 - marginItem) / 2;
const heightItem = (widthItem / 166) * 106;

export default StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderColor: Colors.Gray4,
    borderWidth: 2,
    width: widthItem,
    height: heightItem,
    backgroundColor: Colors.White,
    marginBottom: 8,
  },
  boxIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonPlus: {
    width: 32,
    height: 32,
    backgroundColor: Colors.Gray3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 22,
  },
});
