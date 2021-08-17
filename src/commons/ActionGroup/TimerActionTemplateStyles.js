import { StyleSheet } from 'react-native';
import { Colors } from 'configs';

export default StyleSheet.create({
  wrap: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timerTitle: {
    flex: 1,
    justifyContent: 'center',
  },
});
