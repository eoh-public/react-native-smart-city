import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';

export default StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'flex-end',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    position: 'absolute',
    top: 20,
    width: 50,
    fontSize: 10,
    marginLeft: 1,
  },
  time2: {
    left: 2,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  step: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  normal: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
  container: {
    height: 80,
    marginTop: 80,
  },
  childrenIndicator: {
    width: 12,
    height: 80,
    borderRadius: 8,
    backgroundColor: Colors.Primary,
  },
  childIndicator: {
    width: 12,
    height: 80,
    backgroundColor: Colors.Primary,
    borderRadius: 8,
  },
});
