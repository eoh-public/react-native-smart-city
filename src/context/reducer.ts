import { initData } from '../utils/InitData';
import {
  ActionType,
  AuthData,
  Language,
  StatusBar,
  Action,
  ListDevice,
} from './actionType';

export type ContextData = {
  auth: AuthData;
  language: Language;
  listDevice: ListDevice;
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
  listDevice: {} as ListDevice,
};

export const reducer = (currentState: ContextData, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case Action.UPDATE_AUTH:
      initData((payload as AuthData).account);
      return { ...currentState, auth: payload };
    case Action.STORE_STATUS_BAR:
      return { ...currentState, statusBar: payload };
    case Action.UPDATE_LANGUAGE:
      return { ...currentState, language: payload };
    case Action.LIST_DEVICE_TYPES:
      if (currentState.listDevice) {
        currentState.listDevice[action.payload.chipId] = {
          sentEmail: action.payload.sentEmail,
        };
        return {
          ...currentState,
        };
      } else {
        let listDevice = {};
        listDevice[action.payload.chipId] = {
          sentEmail: action.payload.sentEmail,
        };
        return {
          ...currentState,
          listDevice: listDevice,
        };
      }

    default:
      return currentState;
  }
};
