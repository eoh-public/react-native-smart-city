import { StyleSheet } from 'react-native';
import { Colors } from '../../configs';
import { colorOpacity } from '../../utils/Converter/color';

export default StyleSheet.create({
  wrap: {
    flex: 1,
  },
  txtHeader: {
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
    lineHeight: 28,
  },
  txtNote: {
    marginHorizontal: 16,
    marginBottom: 8,
    lineHeight: 22,
  },
  scan: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  layout: {
    height: 75,
    marginBottom: 50,
  },
  layout1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutProcess: {
    height: 100,
  },
  layoutProcess1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outsideCircle: {
    width: 75,
    height: 75,
    borderRadius: 75,
    backgroundColor: colorOpacity(Colors.Blue10, 0.3),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    maxHeight: 50,
    borderRadius: 50,
    backgroundColor: Colors.Blue10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  processItem: {},
  processCircle: {
    borderWidth: 1,
    borderColor: Colors.Gray5,
    borderRadius: 15,
    padding: 5,
  },
  processCircleActive: {
    borderColor: Colors.Blue10,
    backgroundColor: Colors.Blue10,
    color: Colors.White,
  },
  line: {
    width: 85,
    height: 1,
    backgroundColor: Colors.Gray5,
  },
  lineActive: {
    backgroundColor: Colors.Blue10,
  },
  textProcessItem: {
    position: 'absolute',
    width: 50,
    bottom: -45,
    left: '-40%',
  },
  textPercent: {
    position: 'absolute',
    bottom: -30,
  },
});
