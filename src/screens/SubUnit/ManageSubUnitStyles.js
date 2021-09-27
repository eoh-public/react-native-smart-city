import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';
import { Constants } from '../../configs';

export default StyleSheet.create({
  headerAniStyle: {
    paddingBottom: 16,
    borderBottomWidth: 0,
  },
  rightComponent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  headerButton: {
    marginRight: 20,
  },
  moreButton: {
    marginLeft: -5,
  },
  wrap: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  container: {
    paddingTop: 0,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  NoSubUnit: {
    alignSelf: 'center',
    marginTop: Constants.height * 0.2,
    fontSize: 16,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
  },
});
