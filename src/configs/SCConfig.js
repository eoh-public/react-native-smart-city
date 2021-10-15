import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales.vi = {
  monthNames: [
    'Tháng giêng',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
  ],
  monthNamesShort: [
    'Tháng giêng',
    'Tháng hai',
    'Tháng ba',
    'Tháng tư',
    'Tháng năm',
    'Tháng sáu',
    'Tháng bảy',
    'Tháng tám',
    'Tháng chín',
    'Tháng mười',
    'Tháng mười một',
    'Tháng mười hai',
  ],
  dayNames: [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
  ],
  dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
  today: 'Hôm nay',
};

LocaleConfig.locales.en = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  today: 'Today',
};

const SCDefaultConfig = {
  apiRoot: 'https://backend.eoh.io/api',
  GOOGLE_MAP_API_KEY: 'AIzaSyCF1Q-WFXCnfAHhOeXRF9WK7eT-TtxO9ss',
  LG_CLIENT_ID: '2b85aee334f046848341547894bb7c4e',
  LG_REDIRECT_URI_APP: 'app://eoh/sync-lg-device',
  LG_URL: 'https://qt-vn.m.lgaccount.com/emp/v2',
  pusherAppKey: '9a591ae4a764acc08714',
  pusherAppCluster: 'ap1',
};

export class SCConfig {
  static apiRoot = SCDefaultConfig.apiRoot;
  static GOOGLE_MAP_API_KEY = SCDefaultConfig.GOOGLE_MAP_API_KEY;
  static LG_CLIENT_ID = SCDefaultConfig.LG_CLIENT_ID;
  static LG_REDIRECT_URI_APP = SCDefaultConfig.LG_REDIRECT_URI_APP;
  static LG_URL = SCDefaultConfig.LG_URL;
  static pusherAppKey = SCDefaultConfig.pusherAppKey;
  static pusherAppCluste = SCDefaultConfig.pusherAppCluster;
}

export const initSCConfig = (config) => {
  LocaleConfig.defaultLocale = config.language;
  SCConfig.apiRoot = config.apiRoot ?? SCDefaultConfig.apiRoot;
  SCConfig.GOOGLE_MAP_API_KEY =
    config.GOOGLE_MAP_API_KEY ?? SCDefaultConfig.GOOGLE_MAP_API_KEY;
  SCConfig.LG_CLIENT_ID = config.LG_CLIENT_ID ?? SCDefaultConfig.LG_CLIENT_ID;
  SCConfig.LG_REDIRECT_URI_APP =
    config.LG_REDIRECT_URI_APP ?? SCDefaultConfig.LG_REDIRECT_URI_APP;
  SCConfig.LG_URL = config.LG_URL ?? SCDefaultConfig.LG_URL;
  SCConfig.pusherAppKey = config.pusherAppKey ?? SCDefaultConfig.pusherAppKey;
  SCConfig.pusherAppCluster =
    config.pusherAppCluster ?? SCDefaultConfig.pusherAppCluster;
};
