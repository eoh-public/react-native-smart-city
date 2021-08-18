import { initData } from '../utils/InitData';
import {
  ActionType,
  AuthData,
  ConfigData,
  Language,
  StatusBar,
  Action,
} from './actionType';

export type ContextData = {
  auth: AuthData;
  language: Language;
  config: ConfigData;
};

export type Action = {
  type: ActionType;
  payload: any;
};

export const initialState = {
  auth: {
    account: {
      token: '',
      user: {
        id: '',
      },
    },
  },
  language: 'en' as Language,
  statusBar: {} as StatusBar,
  config: {
    LG_CLIENT_ID: '',
    LG_REDIRECT_URI_APP: '',
  } as ConfigData,
};

export const reducer = (currentState: ContextData, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case Action.UPDATE_AUTH:
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };
    case Action.STORE_STATUS_BAR:
      return { ...currentState, statusBar: payload };
    case Action.SET_CONFIG:
      return {
        ...currentState,
        config: payload,
      };
    default:
      return currentState;
  }
};
