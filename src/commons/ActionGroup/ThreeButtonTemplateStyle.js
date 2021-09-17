import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  imageButton: {
    height: 28,
    marginBottom: 7,
  },
  text: {
    fontSize: 14,
    lineHeight: 22,
  },
  buttonActionDoor: {
    flex: 1,
    aspectRatio: 1,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.Gray2,
    borderWidth: 1,
    borderColor: Colors.Gray3,
    borderRadius: 10,
  },
  squareStop: {
    marginHorizontal: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: 15.41,
    height: 16,
    backgroundColor: Colors.Primary,
    borderRadius: 1,
  },
  lockSwitch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  iconLock: {
    paddingBottom: 7,
  },
  textLockDoor: {
    paddingLeft: 12,
    height: 24,
    fontSize: 16,
    lineHeight: 24,
  },
  lockDoor: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingLeft: 5,
  },
});
