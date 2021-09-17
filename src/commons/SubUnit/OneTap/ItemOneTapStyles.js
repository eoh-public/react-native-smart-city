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
    marginBottom: 8,
  },
  boxIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconSensor: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
