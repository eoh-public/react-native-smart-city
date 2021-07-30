import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  barrierControlContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  bigCircle: {
    backgroundColor: Colors.Gray2,
    width: 237,
    height: 237,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.Gray11,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 5,
  },
  smallCircle: {
    backgroundColor: Colors.White,
    width: 195,
    height: 195,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: Colors.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
  },
  textBig: {
    marginTop: 18,
    fontSize: 16,
    color: Colors.Gray8,
  },
});
