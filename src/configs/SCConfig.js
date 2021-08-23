const SCDefaultConfig = {
  apiRoot: 'https://backend.eoh.io/api',
  LG_CLIENT_ID: '2b85aee334f046848341547894bb7c4e',
  LG_REDIRECT_URI_APP: 'app://eoh/sync-lg-device',
  LG_URL: 'https://qt-vn.m.lgaccount.com/emp/v2',
};

export class SCConfig {
  static apiRoot = SCDefaultConfig.apiRoot;
  static LG_CLIENT_ID = SCDefaultConfig.LG_CLIENT_ID;
  static LG_REDIRECT_URI_APP = SCDefaultConfig.LG_REDIRECT_URI_APP;
  static LG_URL = SCDefaultConfig.LG_URL;
}

export const initSCConfig = (config) => {
  SCConfig.apiRoot = config.apiRoot ?? SCDefaultConfig.apiRoot;
  SCConfig.LG_CLIENT_ID = config.LG_CLIENT_ID ?? SCDefaultConfig.LG_CLIENT_ID;
  SCConfig.LG_REDIRECT_URI_APP =
    config.LG_REDIRECT_URI_APP ?? SCDefaultConfig.LG_REDIRECT_URI_APP;
  SCConfig.LG_URL = config.LG_URL ?? SCDefaultConfig.LG_URL;
};
