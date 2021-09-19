import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../../configs';

const marginItem = 12;
const marginHorizontal = 16;
const widthItem = (Constants.width - marginHorizontal * 2 - marginItem) / 2;
const heightItem = (widthItem / 166) * 96;

export default StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    width: widthItem,
    height: heightItem,
    backgroundColor: Colors.White,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  active: {
    borderColor: Colors.Primary,
    borderWidth: 2,
  },
  boxIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineHeight22: {
    lineHeight: 22,
  },
  iconSensor: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
