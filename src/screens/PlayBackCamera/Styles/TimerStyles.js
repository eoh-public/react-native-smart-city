import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'flex-end',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  time: {
    position: 'absolute',
    top: 20,
    width: 50,
    marginLeft: -13,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});
