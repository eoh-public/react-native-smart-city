export const Action = {
  UPDATE_AUTH: 'UPDATE_AUTH',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
  STORE_STATUS_BAR: 'STORE_STATUS_BAR',
  SET_CONFIG: 'SET_CONFIG',
};

export type AuthData = {
  account: {
    token: string;
    user: any;
  };
};

export type ConfigData = {
  LG_CLIENT_ID: string;
  LG_REDIRECT_URI_APP: string;
};

export type Language = 'en' | 'vi';

export type StatusBar = {
  backgroundColor: string;
  barStyle: string;
};

export type ActionType = keyof typeof Action;

export type ActionDataMap = {
  UPDATE_AUTH: AuthData;
  UPDATE_LANGUAGE: Language;
  STORE_STATUS_BAR: StatusBar;
  SET_CONFIG: ConfigData;
};
