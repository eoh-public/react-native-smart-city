import { StyleSheet } from 'react-native';
import { Colors, Constants } from '../../../configs';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export default StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  buttonAdd: {
    paddingRight: 16,
  },
  titleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainerStyle: {
    paddingLeft: 16,
    paddingTop: 16,
    paddingBottom: 80 + getBottomSpace(),
  },
  arrowRightButon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowRight: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
    tintColor: Colors.Gray7,
    width: 8,
    height: 12,
  },
  wrapAutomateItem: {
    backgroundColor: Colors.White,
    height: 106,
    width: (Constants.width - 40) / 2,
    borderRadius: 8,
    marginRight: 8,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
    marginVertical: 5,
  },
  wrapUniItem: {
    marginBottom: 16,
  },
  contentContainerStyle2: {
    paddingLeft: 2,
    paddingRight: 16,
  },
  addNewItem: {
    marginTop: 7,
    height: 106,
    width: (Constants.width - 40) / 2,
  },
});
