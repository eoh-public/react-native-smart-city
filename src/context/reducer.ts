import { initData } from '../utils/InitData';
import {
  ActionType,
  AuthData,
  Language,
  StatusBar,
  Action,
} from './actionType';

export type ContextData = {
  auth: AuthData;
  language: Language;
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
};

export const reducer = (currentState: ContextData, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case Action.UPDATE_AUTH:
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };
    case Action.STORE_STATUS_BAR:
      return { ...currentState, statusBar: payload };
    default:
      return currentState;
  }
};
