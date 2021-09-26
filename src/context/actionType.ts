export const Action = {
  UPDATE_AUTH: 'UPDATE_AUTH',
  UPDATE_LANGUAGE: 'UPDATE_LANGUAGE',
  STORE_STATUS_BAR: 'STORE_STATUS_BAR',
  LIST_DEVICE_TYPES: 'LIST_DEVICE_TYPES',
  LIST_ACTION: 'LIST_ACTION',
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

export type ListAction = {
  action: string;
  unit_name: string;
  action_name: string;
  sensor_name: string;
  sensor_icon_kit: string;
  station_name: string;
}[];

export type ActionType = keyof typeof Action;

export type ActionDataMap = {
  UPDATE_AUTH: AuthData;
  UPDATE_LANGUAGE: Language;
  STORE_STATUS_BAR: StatusBar;
  LIST_DEVICE_TYPES: ListDevice;
  LIST_ACTION: ListAction;
};
