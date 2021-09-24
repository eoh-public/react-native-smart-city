import { Platform, Dimensions, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import OneTap from '../../../assets/images/OneTap.svg';
import WeatherChange from '../../../assets/images/WeatherChange.svg';
import Schedule from '../../../assets/images/Schedule.svg';

const X_WIDTH = 375;
const X_HEIGHT = 812;

const XSMAX_WIDTH = 414;
const XSMAX_HEIGHT = 896;

export const FONT_PREFIX = 'SFProDisplay';

const { height: W_HEIGHT, width: W_WIDTH } = Dimensions.get('window');
export const LANGUAGE = {
  English: { label: 'English (EN)', value: 'en' },
  Vietnamese: { label: 'Tiếng Việt (VN)', value: 'vi' },
  DEFAULT: 'vi',
};

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    ((W_WIDTH === X_WIDTH && W_HEIGHT === X_HEIGHT) ||
      (W_WIDTH === XSMAX_WIDTH && W_HEIGHT === XSMAX_HEIGHT))
  );
}

export function getStatusBarHeight() {
  return Platform.select({
    ios: isIphoneX() ? 40 : 20,
    android: StatusBar.currentHeight,
  });
}

export const normalize = (size) => RFValue(size);

export const SOCIAL_PROVIDER = {
  EMAIL: 'email',
  FACEBOOK: 'facebook',
  GOOGLE: 'google',
};

export const BLE_REMOTE_SERVICE_UUID = '4fafc201-1fb5-459e-8fcc-c5c9c331914b';
export const BLE_REMOTE_CHARACTERISTIC_UUID =
  'b32f3620-2846-4d1c-88aa-5dd06c0ad15e';
export const BLE_REMOTE_CHARACTERISTIC_UUID_TX =
  'fba737c2-9f19-4779-9ef2-9446c29d0bf5';
export const BLE_REMOTE_CHARACTERISTIC_UUID_RX =
  '54173c1f-3a6a-4812-90fb-9a222f445f0c';
export const BLE_NOTIFY_WIFI_OK = 'WIFI_OK';
export const BLE_INIT_NAME = 'EOH_GATEWAY';

export const DEEP_LINK = {
  SUCCESS_PAYMENT: 'app://eoh/success-payment',
  NOTIFICATION_SCREEN: 'app://eoh/notifications',
};

export const Constants = {
  paddingTop: getStatusBarHeight(),
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  SOCIAL_PROVIDER,
  LANGUAGE,
  FONT_PREFIX,
  isIphoneX,
  DEEP_LINK,
};

export const DEVICE_TYPE = {
  LG_THINQ: 'LG_THINQ',
};

export const SCANNING_STATUS = {
  BOOKING_ACTIVATED: 'booking_activated',
  WRONG_SPOT: 'wrong_spot',
  AVAILABLE_SPOTS: 'available_spots',
  PARKING_NEAREST: 'parking_nearest',
  NOT_WORKING_FOR_SENSOR_ONLY: 'not_working_for_sensor_only',
  SPOT_DOES_NOT_EXIST: 'spot_does_not_exist',
};

export const SubUnitName = {
  scenario: 'Kịch Bản',
};

export const AUTOMATE_TYPE = {
  ONE_TAP: 'one_tap',
  VALUE_CHANGE: 'value_change',
  SCHEDULE: 'schedule',
};

export const AUTOMATES = {
  one_tap: {
    value: AUTOMATE_TYPE.ONE_TAP,
    title: 'Launch One-Tap',
    explanation: 'Do everything with just one button',
    icon: OneTap,
  },
  value_change: {
    value: AUTOMATE_TYPE.VALUE_CHANGE,
    title: 'When weather change',
    explanation: 'Short Explanation',
    icon: WeatherChange,
  },
  schedule: {
    value: AUTOMATE_TYPE.SCHEDULE,
    title: 'Schedule',
    explanation: 'Short Explanation',
    icon: Schedule,
  },
};

export const TESTID = {
  // Dashboard
  DASHBOARD_TAB_HOME: 'DASHBOARD_TAB_HOME',
  DASHBOARD_VIEW_ALL_SHARED_UNITS: 'DASHBOARD_VIEW_ALL_SHARED_UNITS',
  DASHBOARD_HOME_SCROLL_VIEW: 'DASHBOARD_HOME_SCROLL_VIEW',

  // Login
  LOGIN_TITLE: 'LOGIN_TITLE',
  LOGIN_INPUT_PHONE_NUMBER: 'LOGIN_INPUT_PHONE_NUMBER',
  LOGIN_INPUT_PASSWORD: 'LOGIN_INPUT_PASSWORD',
  LOGIN_INPUT_SUBMIT_BUTTON: 'LOGIN_INPUT_SUBMIT_BUTTON',
  LOGIN_INPUT_FORGOT_PASSWORD: 'LOGIN_INPUT_FORGOT_PASSWORD',
  LOGIN_INPUT_SIGN_UP: 'LOGIN_INPUT_SIGN_UP',
  FACEBOOK_LOGIN_BUTTON: 'FACEBOOK_LOGIN_BUTTON',
  APPLE_LOGIN_BUTTON: 'APPLE_LOGIN_BUTTON',

  // Forgot password
  RESET_PASSWORD_INPUT: 'RESET_PASSWORD_INPUT',
  RESET_PASSWORD_REINPUT: 'RESET_PASSWORD_REINPUT',
  RESET_PASSWORD_CONFIRM: 'RESET_PASSWORD_CONFIRM',

  // SignUp
  SIGNUP_INPUT_NAME: 'SIGNUP_INPUT_NAME',
  SIGNUP_INPUT_EMAIL: 'SIGNUP_INPUT_EMAIL',
  SIGNUP_INPUT_PHONE: 'SIGNUP_INPUT_PHONE',
  SIGNUP_INPUT_PASSWORD: 'SIGNUP_INPUT_PASSWORD',
  SIGNUP_INPUT_PASSWORD_D2: 'SIGNUP_INPUT_PASSWORD_D2',
  SIGNUP_BUTTON_VALIDATE: 'SIGNUP_BUTTON_VALIDATE',
  SIGNUP_BACK_TO_LOGIN: 'SIGNUP_BACK_TO_LOGIN',

  // Forgot Password
  FORGOT_PASSWORD_INPUT: 'FORGOT_PASSWORD_INPUT',
  FORGOT_PASSWORD_BUTTON: 'FORGOT_PASSWORD_BUTTON',

  // unit
  MY_UNIT_GO_TO_DETAIL: 'MY_UNIT_GO_TO_DETAIL',
  MY_UNIT_NO_UNIT: 'MY_UNIT_NO_UNIT',

  // sub unit
  SUB_UNIT_CAMERA_VIEW: 'SUB_UNIT_CAMERA_VIEW',
  SUB_UNIT_BACKGROUND: 'SUB_UNIT_BACKGROUND',
  SUB_UNIT_GO_TO_DETAIL: 'SUB_UNIT_GO_TO_DETAIL',
  SUB_UNIT_DEVICES: 'SUB_UNIT_DEVICES',
  SUB_UNIT_ICON_BARS: 'SUB_UNIT_ICON_BARS',
  SUB_UNIT_STATION: 'SUB_UNIT_STATION',

  // NavBar
  NAVBAR_ICON_BARS: 'NAVBAR_ICON_BARS',
  NAVBAR_MENU_ACTION_MORE: 'NAVBAR_MENU_ACTION_MORE',

  // device
  HORIZONTAL_BAR_CHART: 'HORIZONTAL_BAR_CHART',

  // common
  COMMON_LOADING_ANIMATION: 'COMMON_LOADING_ANIMATION',
  BOTTOM_BUTTON_RIGHT: 'BOTTOM_BUTTON_RIGHT',
  VIEW_BUTTON_BOTTOM_RIGHT_BUTTON: 'VIEW_BUTTON_BOTTOM_RIGHT_BUTTON',
  VIEW_BUTTON_BOTTOM_LEFT_BUTTON: 'VIEW_BUTTON_BOTTOM_LEFT_BUTTON',

  // Smart parking drawer
  ROW_EXIT_SMARTPARKING_DRAWER: 'ROW_EXIT_SMARTPARKING_DRAWER',
  ROW_ITEM_SMARTPARKING_DRAWER: 'ROW_ITEM_SMARTPARKING_DRAWER',

  // My Dashboard
  MY_DASHBOARD_FEATURE_ITEM: 'MY_DASHBOARD_FEATURE_ITEM',
  MY_DASHBOARD_TEXT_BUTTON: 'MY_DASHBOARD_TEXT_BUTTON',

  // Add Payment Card
  CUSTOMER_CARD_NUMBER: 'CUSTOMER_CARD_NUMBER',
  INPUT_CARD_NUMBER: 'INPUT_CARD_NUMBER',
  INPUT_CARD_HOLDER_NAME: 'INPUT_CARD_HOLDER_NAME',
  INPUT_CARD_EXPIRE_DATE: 'INPUT_CARD_EXPIRE_DATE',
  INPUT_CARD_CVV: 'INPUT_CARD_CVV',
  NON_CARD_TYPE: 'NON_CARD_TYPE',
  VISA_CARD_TYPE: 'VISA_CARD_TYPE',
  MASTER_CARD_TYPE: 'MASTER_CARD_TYPE',
  SAVE_CARD_BUTTON: 'SAVE_CARD_BUTTON',
  ADD_CARD_NOTIFY_ERROR: 'ADD_CARD_NOTIFY_ERROR',
  BUTTON_SELECT_VISA: 'BUTTON_SELECT_VISA',
  BUTTON_SELECT_MASTER_CARD: 'BUTTON_SELECT_MASTER_CARD',

  // Map Dashboard
  PARKING_MARKER: 'PARKING_MARKER',

  // Menu side
  BURGER_MENU_ICON: 'BURGER_MENU_ICON',
  SIDE_MENU_LOGO: 'SIDE_MENU_LOGO',
  SIDE_MENU_AVATAR_USER: 'SIDE_MENU_AVATAR_USER',
  SIDE_MENU_USER_NAME: 'SIDE_MENU_USER_NAME',
  SIDE_MENU_USER_PHONE: 'SIDE_MENU_USER_PHONE',
  SIDE_MENU_LANGUAGE_ITEM: 'SIDE_MENU_LANGUAGE_ITEM',
  SIDE_MENU_POLICY_ITEM: 'SIDE_MENU_POLICY_ITEM',
  SIDE_MENU_LOGOUT_ITEM: 'SIDE_MENU_LOGOUT_ITEM',
  CHANGE_LANGUAGE_SCREEN: 'CHANGE_LANGUAGE_SCREEN',
  POLICY_SCREEN: 'POLICY_SCREEN',
  POPUP_ALERT: 'POPUP_ALERT',

  // Parking Area List
  PARKING_AREA_POPUP_ITEM: 'PARKING_AREA_POPUP_ITEM',
  AVAILABLE_SPOT_NUMBER: 'AVAILABLE_SPOT_NUMBER',
  PARKING_PRICE_TEXT: 'PARKING_PRICE_TEXT',
  DISTANCE_TO_PARKING_TEXT: 'DISTANCE_TO_PARKING_TEXT',
  PARKING_TIP_TEXT: 'PARKING_TIP_TEXT',
  BUTTON_BOOK_NOW: 'BUTTON_BOOK_NOW',
  BUTTON_DIRECTIONS: 'BUTTON_DIRECTIONS',
  BUTTON_SAVE_PARKING: 'BUTTON_SAVE_PARKING',

  // Parking area detail
  PARKING_DETAIL_TOUCH_DIRECTION: 'PARKING_DETAIL_TOUCH_DIRECTION',
  PARKING_DETAIL_TOUCH_BOOKMARK: 'PARKING_DETAIL_TOUCH_BOOKMARK',
  PARKING_DETAIL_STATUS_BAR: 'PARKING_DETAIL_STATUS_BAR',
  PARKING_DETAIL_SPOTS_AVAILABLE: 'PARKING_DETAIL_SPOTS_AVAILABLE',
  PARKING_DETAIL_DISTANCE: 'PARKING_DETAIL_DISTANCE',
  PARKING_DETAIL_BUTTON_SAVE_VEHICLE: 'PARKING_DETAIL_BUTTON_SAVE_VEHICLE',

  // Booking detail
  HEADER_BOOKING_DETAILS: 'HEADER_BOOKING_DETAILS',
  NUMBER_OF_HOUR_PARKING: 'NUMBER_OF_HOUR_PARKING',
  PAY_AT: 'PAY_AT',

  //Unit Detail
  UNIT_DETAIL_STATION_LIST: 'UNIT_DETAIL_STATION_LIST',
  UNIT_DETAIL_UNIT_SUMMARY_VIEW: 'UNIT_DETAIL_UNIT_SUMMARY_VIEW',

  ON_CHECK_SPOT_NUMBER: 'ON_CHECK_SPOT_NUMBER',
  ON_BOOK_NOW: 'ON_BOOK_NOW',
  SPOT_INPUT_0: 'SPOT_INPUT_0',
  SPOT_INPUT_FOCUS: 'SPOT_INPUT_FOCUS',
  HOUR: 'HOUR',
  ARRIVE_ITEM: 'ARRIVE_ITEM',
  MINUS: 'MINUS',
  PLUS: 'PLUS',
  PRESS_CAR: 'PRESS_CAR',
  BOTTOM_VIEW_MAIN: 'BOTTOM_VIEW_MAIN',
  BOTTOM_VIEW_SECONDARY: 'BOTTOM_VIEW_SECONDARY',
  EXTEND_TOTAL_PRICE: 'EXTEND_TOTAL_PRICE',
  MODAL_BUTTON_POPUP: 'MODAL_BUTTON_POPUP',
  ITEM_TEXT_INPUT: 'ITEM_TEXT_INPUT',
  ITEM_TEXT_ERROR: 'ITEM_TEXT_ERROR',
  SEARCH_BAR_INPUT: 'SEARCH_BAR_INPUT',
  GO_DETAIL: 'GO_DETAIL',

  // Automate
  AUTOMATE_SCRIPT_ACTION: 'AUTOMATE_SCRIPT_ACTION',
  NAME_YOUR_BUTTON: 'NAME_YOUR_BUTTON',

  // Parking input maunaly spot
  PARKING_SPOT_INFO_BUTTON: 'PARKING_SPOT_INFO_BUTTON',
  PARKING_SPOT_CONFIRM_SPOT: 'PARKING_SPOT_CONFIRM_SPOT',
  PARKING_SPOT_INPUT: 'PARKING_SPOT_INPUT',
  PARKING_SPOT_BUTTON_POPUP: 'PARKING_SPOT_BUTTON_POPUP',
  PARKING_SPOT_MODAL_INFO: 'PARKING_SPOT_MODAL_INFO',
  PARKING_SPOT_TEXT_RESULT: 'PARKING_SPOT_TEXT_RESULT',

  // Header Device
  HEADER_DEVICE_BUTTON_STAR: 'HEADER_DEVICE_BUTTON_STAR',
  HEADER_DEVICE_BUTTON_MORE: 'HEADER_DEVICE_BUTTON_MORE',

  // EMERGENCY BUTTON
  ON_CHANGE_NAME_EMERGENCY_CONTACT: 'ON_CHANGE_NAME_EMERGENCY_CONTACT',
  ON_CHANGE_PHONE_EMERGENCY_CONTACT: 'ON_CHANGE_PHONE_EMERGENCY_CONTACT',
  EMERGENCY_SELECT_CONTACT: 'EMERGENCY_SELECT_CONTACT',
  EMERGENCY_TITLE: 'EMERGENCY_TITLE',
  EMERGENCY_BUTTON: 'EMERGENCY_BUTTON',

  // ADD SUB UNIT
  ADD_SUB_UNIT_BUTTON_CHOOSE_PHOTO: 'ADD_SUB_UNIT_BUTTON_CHOOSE_PHOTO',

  SCANNING_RESPONSE_TITLE: 'SCANNING_RESPONSE_TITLE',
  SCANNING_RESPONSE_DESCRIPTION: 'SCANNING_RESPONSE_DESCRIPTION',
  SCANNING_RESPONSE_SUB_TITLE: 'SCANNING_RESPONSE_SUB_TITLE',
  SCANNING_RESPONSE_DATA: 'SCANNING_RESPONSE_DATA',
  SCANNING_RESPONSE_INFO: 'SCANNING_RESPONSE_INFO',

  MENU_ACTION_LIST_TOUCHABLE: 'MENU_ACTION_LIST_TOUCHABLE',

  // ThreeButtonTemplate
  BUTTON_TEMPLATE_1: 'BUTTON_TEMPLATE_1',
  BUTTON_TEMPLATE_2: 'BUTTON_TEMPLATE_2',
  BUTTON_TEMPLATE_3: 'BUTTON_TEMPLATE_3',
  TEXT_DOOR_LOOK_ON_OFF: 'TEXT_DOOR_LOOK_ON_OFF',

  //  Device Detail
  DEVICE_DETAIL_MEDIA_PLAYER: 'DEVICE_DETAIL_MEDIA_PLAYER',
  DEVICE_DETAIL_ACTION_GROUP: 'DEVICE_DETAIL_ACTION_GROUP',
  SENSOR_DISPLAY_ITEM: 'SENSOR_DISPLAY_ITEM',
  ITEM_QUICK_ACTION_PRESS: 'ITEM_QUICK_ACTION_PRESS',
  TIME_COUNT_DOWN_TEXT: 'TIME_COUNT_DOWN_TEXT',

  // DeviceInfo
  DEVICE_INFO_BATTERY: 'DEVICE_INFO_BATTERY',
  DEVICE_INFO_RSSI_NODE: 'DEVICE_INFO_RSSI_NODE',
  DEVICE_INFO_CHIP_INFO: 'DEVICE_INFO_CHIP_INFO',

  TAB_HEADER: 'TAB_HEADER',

  LEFT_TEXT_ROW_TIME_PARKING: 'LEFT_TEXT_ROW_TIME_PARKING',
  RIGHT_TEXT_ROW_TIME_PARKING: 'RIGHT_TEXT_ROW_TIME_PARKING',
  BUTTON_TEXT_BOTTOM_LEFT: 'BUTTON_TEXT_BOTTOM_LEFT',
  BUTTON_TEXT_BOTTOM_RIGHT: 'BUTTON_TEXT_BOTTOM_RIGHT',
  ACTIVE_SESSION_ITEM: 'ACTIVE_SESSION_ITEM',
  ACTIVE_SESSION_BUTTON_BOTTOM: 'ACTIVE_SESSION_BUTTON_BOTTOM',

  ITEM_PAYMENT_METHOD: 'ITEM_PAYMENT_METHOD',
  WATER_QUALITY_GUIDE_TITLE: 'WATER_QUALITY_GUIDE_TITLE',
  WATER_QUALITY_GUIDE_DESCRIPTION: 'WATER_QUALITY_GUIDE_DESCRIPTION',
  WATER_QUALITY_GUIDE_TITLE_LEVEL: 'WATER_QUALITY_GUIDE_TITLE_LEVEL',
  WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL:
    'WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL',

  WATER_QUALITY_GUIDE_TITLE1: 'WATER_QUALITY_GUIDE_TITLE1',
  WATER_QUALITY_GUIDE_DESCRIPTION1: 'WATER_QUALITY_GUIDE_DESCRIPTION1',
  WATER_QUALITY_GUIDE_TITLE_LEVEL1: 'WATER_QUALITY_GUIDE_TITLE_LEVEL1',
  WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL1:
    'WATER_QUALITY_GUIDE_DESCRIPTION_LEVEL1',

  AIR_QUALITY_OUTDOOR_VALUE_TOUCH: 'AIR_QUALITY_OUTDOOR_VALUE_TOUCH',
  AIR_QUALITY_OUTDOOR_ADVICE_TEXT: 'AIR_QUALITY_OUTDOOR_ADVICE_TEXT',

  BACK_DEFAULT_TOUCH: 'BACK_DEFAULT_TOUCH',
  UNIT_SUMMARY_GUIDE_TOUCH: 'UNIT_SUMMARY_GUIDE_TOUCH',

  AQI_GUIDE_MAIN_TITLE: 'AQI_GUIDE_MAIN_TITLE',
  AQI_GUIDE_UVINDEX_TITLE: 'AQI_GUIDE_UVINDEX_TITLE',
  TDS_GUIDE_TITLE: 'TDS_GUIDE_TITLE',

  ALERT_STATUS_MACHINE: 'ALERT_STATUS_MACHINE',
  TOUCH_INFO_FLAT_LIST_ITEM: 'TOUCH_INFO_FLAT_LIST_ITEM',

  LIST_QUALITY_INDICATOR_PC: 'LIST_QUALITY_INDICATOR_PC',
  LIST_QUALITY_INDICATOR_3PC: 'LIST_QUALITY_INDICATOR_3PC',

  UV_INDEX_GUIDE_TITLE: 'UV_INDEX_GUIDE_TITLE',

  MANAGE_SUB_UNIT_MODAL: 'MANAGE_SUB_UNIT_MODAL',
  MANAGE_SUB_UNIT_NAME: 'MANAGE_SUB_UNIT_NAME',
  MANAGE_SUB_UNIT_REMOVE_BUTTON: 'MANAGE_SUB_UNIT_REMOVE_BUTTON',
  MANAGE_SUB_UNIT_SELECT_FILE_BUTTON: 'MANAGE_SUB_UNIT_SELECT_FILE_BUTTON',

  BUTTON_POPUP_RESOLVED: 'BUTTON_POPUP_RESOLVED',
  BUTTON_POPUP_RESOLVED_TITLE: 'BUTTON_POPUP_RESOLVED_TITLE',
  BUTTON_POPUP_RESOLVED_ICON: 'BUTTON_POPUP_RESOLVED_ICON',
  SENSOR_CONNECTED_STATUS: 'SENSOR_CONNECTED_STATUS',

  ITEM_VEHICLE: 'ITEM_VEHICLE',
  ON_PLUS_VEHICLE: 'ON_PLUS_VEHICLE',
  ON_MORE_VEHICLE: 'ON_MORE_VEHICLE',
  VEHICLE_MENU_ACTION_MORE: 'VEHICLE_MENU_ACTION_MORE',

  STATION_DEVICE_PERMISSIONS: 'STATION_DEVICE_PERMISSIONS',
  TEXT_NO_DATA_STATIONS: 'TEXT_NO_DATA_STATIONS',

  // Manage Unit
  MANAGE_UNIT_CHANGE_NAME: 'MANAGE_UNIT_CHANGE_NAME',
  MANAGE_UNIT_CHANGE_LOCATION: 'MANAGE_UNIT_CHANGE_LOCATION',
  MANAGE_UNIT_CHANGE_PHOTO: 'MANAGE_UNIT_CHANGE_PHOTO',
  MANAGE_UNIT_IMAGE_PICKER: 'MANAGE_UNIT_IMAGE_PICKER',
  MANAGE_UNIT_MODAL_RENAME: 'MANAGE_UNIT_MODAL_RENAME',
  MANAGE_UNIT_MODAL_RENAME_INPUT_NAME: 'MANAGE_UNIT_MODAL_RENAME_INPUT_NAME',
  MANAGE_UNIT_SHOW_REMOVE: 'MANAGE_UNIT_SHOW_REMOVE',
  MANAGE_UNIT_LIST_EMERGENCY_CONTACT: 'MANAGE_UNIT_LIST_EMERGENCY_CONTACT',
  MANAGE_UNIT_DETAIL_LIST_CONTACT_BUTTON:
    'MANAGE_UNIT_DETAIL_LIST_CONTACT_BUTTON',

  // Add Vehicle
  ADD_VEHICLE_TAKE_PHOTO: 'ADD_VEHICLE_TAKE_PHOTO',
  ADD_VEHICLE_IMAGE_PICKER: 'ADD_VEHICLE_IMAGE_PICKER',
  ADD_VEHICLE_SEATS_DROPDOWN: 'ADD_VEHICLE_SEATS_DROPDOWN',
  ADD_VEHICLE_DEFAULT_CAR: 'ADD_VEHICLE_DEFAULT_CAR',
  ADD_VEHICLE_BUTTON_SAVE: 'ADD_VEHICLE_BUTTON_SAVE',
  ADD_VEHICLE_BUTTON_DELETE: 'ADD_VEHICLE_BUTTON_DELETE',
  ADD_VEHICLE_MODAL_DELETE: 'ADD_VEHICLE_MODAL_DELETE',
  INPUT_PLATE_NUMBER: 'INPUT_PLATE_NUMBER',

  // Map Dashboard
  MAP_DASHBOARD_VIEW: 'MAP_DASHBOARD_VIEW',

  // SearchBar
  BUTTON_SEARCH_PARKING: 'BUTTON_SEARCH_PARKING',

  // Language
  TOUCHABLE_LANGUAGE: 'TOUCHABLE_LANGUAGE',
  LABEL_LANGUAGE: 'LABEL_LANGUAGE',
  ICON_CHECK_LANGUAGE: 'ICON_CHECK_LANGUAGE',

  // Group Checkbox Parking Detail
  GROUP_CHECK_BOX_PARKING_DETAIL: 'GROUP_CHECK_BOX_PARKING_DETAIL',

  COMPASS_VALUE: 'COMPASS_VALUE',
  GROUP_CHECKBOX_ITEM: 'GROUP_CHECKBOX_ITEM',
  TOTAL_POWER_BOX_TITLE: 'TOTAL_POWER_BOX_TITLE',
  EMERGENCY_POPUP: 'EMERGENCY_POPUP',
  RESOLVED_EMERGENCY_POPUP: 'RESOLVED_EMERGENCY_POPUP',
  TOTAL_POWER_CONSUMPTION: 'TOTAL_POWER_CONSUMPTION',

  // Shared unit
  ICON_REMOVE_PIN_SHARED_UNIT: 'ICON_REMOVE_PIN_SHARED_UNIT',
  ICON_ADD_PIN_SHARED_UNIT: 'ICON_ADD_PIN_SHARED_UNIT',
  ICON_REMOVE_STAR_SHARED_UNIT: 'ICON_REMOVE_STAR_SHARED_UNIT',
  ICON_ADD_STAR_SHARED_UNIT: 'ICON_ADD_STAR_SHARED_UNIT',
  TOUCH_SHARED_UNIT: 'TOUCH_SHARED_UNIT',
  SHARED_UNIT_OWN_BY: 'SHARED_UNIT_OWN_BY',

  // Select unit
  SELECT_UNIT_NAME: 'SELECT_UNIT_NAME',
  SELECT_UNIT_RADIO_BUTTON: 'SELECT_UNIT_RADIO_BUTTON',
  SELECT_UNIT_SELECT: 'SELECT_UNIT_SELECT',

  SHARED_UNIT: 'SHARED_UNIT',

  PREFIX: {
    BUTTON_POPUP: 'BUTTON_POPUP',
    ALERT_CANCEL: 'ALERT_CANCEL',
    SHARING_SELECT_PERMISSION: 'SHARING_SELECT_PERMISSION',
    ADD_VEHICLE: 'ADD_VEHICLE',
    MANAGE_UNIT: 'MANAGE_UNIT',
    MANAGE_UNIT_ALERT: 'MANAGE_UNIT_ALERT',
    SELECT_UNIT: 'SELECT_UNIT',
  },

  TERM_AND_POLICY_TITLE: 'TERM_AND_POLICY_TITLE',
  TERM_AND_POLICY_BUTTON: 'TERM_AND_POLICY_BUTTON',

  MEMBER_LIST_RIGHT_HEADER_TOUCH: 'MEMBER_LIST_RIGHT_HEADER_TOUCH',

  TOUCHABLE_ACTION_ADD_MORE: 'TOUCHABLE_ACTION_ADD_MORE',

  // Header Unit
  HEADER_UNIT_BUTTON_BACK: 'HEADER_UNIT_BUTTON_BACK',
  HEADER_UNIT_BUTTON_ADD: 'HEADER_UNIT_BUTTON_ADD',
  HEADER_UNIT_BUTTON_MORE: 'HEADER_UNIT_BUTTON_MORE',

  // Display Checking
  LOADING_MESSAGE: 'LOADING_MESSAGE',
  LOADING_MESSAGE_WITH_MODAL: 'LOADING_MESSAGE_WITH_MODAL',

  // Select User
  SELECT_USER_ADD_USER_TITLE: 'SELECT_USER_ADD_USER_TITLE',
  SELECT_USER_ADD_USER_SUB_TITLE: 'SELECT_USER_ADD_USER_SUB_TITLE',
  // Connected device
  CONNECTED_DEVICE_SUCCESS: 'CONNECTED_DEVICE_SUCCESS',
  CONNECTED_DEVICE_UNIT_NAME: 'CONNECTED_DEVICE_UNIT_NAME',
  CONNECTED_DEVICE_DEVICE_NAME: 'CONNECTED_DEVICE_DEVICE_NAME',
  CONNECTED_DEVICE_RENAME_DEVICE: 'CONNECTED_DEVICE_RENAME_DEVICE',
  CONNECTED_DEVICE_DONE: 'CONNECTED_DEVICE_DONE',
  CONNECTED_DEVICE_BUTTON_RENAME_DEVICE:
    'CONNECTED_DEVICE_BUTTON_RENAME_DEVICE',
  CONNECTED_DEVICE_BUTTON_DONE: 'CONNECTED_DEVICE_BUTTON_DONE',

  // Connected gateway
  CONNECTED_GATEWAY_SUCCESS: 'CONNECTED_GATEWAY_SUCCESS',
  CONNECTED_GATEWAY_UNIT_NAME: 'CONNECTED_GATEWAY_UNIT_NAME',
  CONNECTED_GATEWAY_CHIP_NAME: 'CONNECTED_GATEWAY_CHIP_NAME',
  CONNECTED_GATEWAY_DONE: 'CONNECTED_GATEWAY_DONE',

  // Add New Device
  ADD_NEW_DEVICE_ADD: 'ADD_NEW_DEVICE_ADD',
  ADD_NEW_DEVICE_THEN_SELECT: 'ADD_NEW_DEVICE_THEN_SELECT',

  // Setup gateway wifi
  SETUP_GATEWAY_WIFI_TITLE: 'SETUP_GATEWAY_WIFI_TITLE',
  SETUP_GATEWAY_WIFI_PLEASE_SELECT_A_WIFI: 'SETUP_GATEWAY_PLEASE_SELECT_A_WIFI',
  SETUP_GATEWAY_WIFI_NAME_TEXT: 'SETUP_GATEWAY_WIFI_NAME_TEXT',
  SETUP_GATEWAY_WIFI_PASSWORD_TEXT: 'SETUP_GATEWAY_WIFI_PASSWORD_TEXT',
  SETUP_GATEWAY_WIFI_CHANGE_WIFI_NAME: 'SETUP_GATEWAY_WIFI_CHANGE_WIFI_NAME',
  SETUP_GATEWAY_WIFI_CHANGE_WIFI_PASSWORD:
    'SETUP_GATEWAY_WIFI_CHANGE_WIFI_PASSWORD',
  SETUP_GATEWAY_WIFI_VIEW_BUTTON_BOTTOM:
    'SETUP_GATEWAY_WIFI_VIEW_BUTTON_BOTTOM',
  SETUP_GATEWAY_WIFI_DISPLAY_CHECKING: 'SETUP_GATEWAY_WIFI_DISPLAY_CHECKING',

  // Add New Gateway
  ADD_NEW_GATEWAY_ADD: 'ADD_NEW_GATEWAY_ADD',
  ADD_NEW_GATEWAY_THEN_SELECT: 'ADD_NEW_GATEWAY_THEN_SELECT',
  ADD_NEW_GATEWAY_TEXT_IMEI: 'ADD_NEW_GATEWAY_TEXT_IMEI',

  // Header
  HEADER_ANI_TITLE: 'HEADER_ANI_TITLE',

  // Emergency
  EMERGENCY_CONTACT_LIST_REMOVE: 'EMERGENCY_CONTACT_LIST_REMOVE',

  // 3PowerConsump
  POWER_CONSUME_3P_HISTORY_CHART: 'POWER_CONSUME_3P_HISTORY_CHART',

  // CurrentRainSensor
  CURRENT_RAIN_SENSOR: 'CURRENT_RAIN_SENSOR',

  // TEMPLATE
  // StatesGridActionTemplate
  STATES_GRID_ACTION_GRID_ITEM: 'STATES_GRID_ACTION_GRID_ITEM',

  // OptionsDropdownActionTemplate
  OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM:
    'OPTIONS_DROPDOWN_ACTION_CHOOSING_ITEM',

  OPTIONS_DROPDOWN_ACTION_WRITE_NOT_AVAILABLE:
    'OPTIONS_DROPDOWN_ACTION_WRITE_NOT_AVAILABLE',
  OPTIONS_DROPDOWN_ACTION_DISPLAY_SELECTED:
    'OPTIONS_DROPDOWN_ACTION_DISPLAY_SELECTED',

  // Add New Device LG
  ADD_NEW_DEVICE_LG_ADD: 'ADD_NEW_DEVICE_LG_ADD',
  ADD_NEW_DEVICE_LG_THEN_SELECT: 'ADD_NEW_DEVICE_LG_THEN_SELECT',
};
