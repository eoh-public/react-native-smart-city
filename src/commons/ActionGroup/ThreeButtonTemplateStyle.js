import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  headerThreeButton: {
    display: 'flex',
    alignItems: 'flex-end',
    color: Colors.Gray8,
    fontSize: 16,
    lineHeight: 24,
    marginTop: 18,
    marginLeft: 20,
  },
  card: {
    marginTop: 14,
    marginBottom: 14,
    marginHorizontal: 16,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
    shadowColor: Colors.Shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 6,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginHorizontal: 8,
  },
  imageBtn: {
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
    paddingHorizontal: 8,
    paddingVertical: 9,
    marginHorizontal: 8,
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
  },
});
