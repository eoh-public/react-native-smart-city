export const Action = {
  UPDATE_AUTH: 'UPDATE_AUTH',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
  STORE_STATUS_BAR: 'STORE_STATUS_BAR',
  LIST_DEVICE_TYPES: 'LIST_DEVICE_TYPES',
};

export type AuthData = {
  account: {
    token: string;
    user: {
      id: string | number;
    };
  };
};

export type Language = 'en' | 'vi';

export type StatusBar = {
  backgroundColor: string;
  barStyle: string;
};

export type ListDevice = {
  sentEmail: boolean;
};

export type ActionType = keyof typeof Action;

export type ActionDataMap = {
  UPDATE_AUTH: AuthData;
  UPDATE_LANGUAGE: Language;
  STORE_STATUS_BAR: StatusBar;
  LIST_DEVICE_TYPES: ListDevice;
};
