import { StyleSheet } from 'react-native';

import { Colors } from '../../../configs';

export default StyleSheet.create({
  textIndoor: {
    color: Colors.Gray9,
    fontSize: 20,
    marginBottom: 4,
  },
  textDesIndoor: {
    color: Colors.Gray8,
    fontSize: 12,
    marginBottom: 16,
  },
  textNotAvailable: {
    textAlign: 'center',
  },
  boxStatus: {
    borderRadius: 10,
    height: 80,
    overflow: 'hidden',
    flexDirection: 'row',
    marginBottom: 16,
  },
  boxEmotion: {
    height: 80,
    width: 80,
    backgroundColor: Colors.Yellow6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStatus: {
    fontSize: 16,
    color: Colors.Gray9,
    marginRight: 24,
    textAlign: 'right',
    maxWidth: 120,
  },
  boxTextStatus: {
    backgroundColor: Colors.Yellow4,
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  boxNumber: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  boxHealth: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 36,
  },
  boxContentHealth: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  boxDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.Yellow6,
    marginRight: 8,
  },
  textOutdoor: {
    color: Colors.Gray9,
    fontSize: 20,
    marginBottom: 24,
    marginTop: 16,
  },
  touchOption: {
    borderWidth: 1,
    borderColor: Colors.Gray5,
    paddingHorizontal: 16,
    paddingVertical: 5,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  textOption: {
    paddingTop: 4,
  },
  touchStatus: {
    borderRadius: 100,
    paddingHorizontal: 24,
    alignSelf: 'center',
    paddingVertical: 3,
    marginTop: 12,
  },
  segment: {
    marginTop: 36,
    alignSelf: 'center',
  },
  boxOutdoorValues: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
  historyChart: {
    paddingHorizontal: 16,
    backgroundColor: Colors.White,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.Gray4,
    marginTop: 16,
  },
});
