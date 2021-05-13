import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Device } from '../../configs';

const { width } = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray2,
  },

  wrap: {
    backgroundColor: Colors.White,
    flex: 1,
    // paddingTop: 30
  },
  scrollView: {
    backgroundColor: Colors.White,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 15,
  },
  leftContainer: {
    flex: 3,
    paddingLeft: 10,
  },
  name: {
    lineHeight: 24,
    fontSize: 16,
    color: Colors.Black,
  },
  seperator: {
    height: 1,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.Gray4,
  },
  image: { width: 52, height: 50, borderRadius: 5 },

  box: {
    // flex: 1,
    paddingVertical: 10,
    // alignItems: 'flex-start',
    // justifyContent: 'space-between'
  },

  textTemp: {
    color: Colors.Gray9,
    fontSize: 16,
  },
  airText: {
    color: Colors.Green6,
  },
  labelBox: {
    fontSize: 12,
    color: Colors.Gray8,
    marginTop: 5,
  },

  // tab
  tabItem: {
    paddingVertical: 15,
  },
  tabItemActive: {
    borderBottomWidth: 2,
    borderColor: Colors.Primary,
  },
  textTabItem: { fontSize: 14, color: Colors.Gray8 },
  textItemActive: {
    color: Colors.Primary,
  },

  sortBy: {
    fontSize: 12,
    color: Colors.Gray7,
    marginRight: 3,
  },

  // modal
  popoverStyle: {
    width,
    backgroundColor: Colors.White,
    paddingBottom: Device.isIphoneX ? 40 : 0,
    bottom: 0,
    left: 0,
    position: 'absolute',
    borderRadius: 10,
  },
  modalWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.White,
    borderRadius: 10,
  },
  modalHeader: {
    padding: 16,
    backgroundColor: Colors.White,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderColor: Colors.Gray4,
  },
  modalHeaderText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray9,
  },
  modalContentContainer: {
    flex: 1,
    padding: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Gray8,
  },
  textActive: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.Primary,
  },
  tabHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.Gray2,
  },
  tabHeaderLeftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabHeaderSortContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 15,
  },
  buttonSortBy: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  noMargin: {
    margin: 0,
  },
});
