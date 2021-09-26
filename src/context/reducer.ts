import { initData } from '../utils/InitData';
import {
  ActionType,
  AuthData,
  Language,
  StatusBar,
  Action,
  ListDevice,
  ListAction,
} from './actionType';

export type ContextData = {
  auth: AuthData;
  language: Language;
  listDevice: ListDevice;
  listAction: ListAction;
  statusBar: StatusBar;
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
  listAction: [] as ListAction,
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

    case Action.LIST_ACTION:
      let newListAction = [...currentState.listAction];

      if (Object.keys(payload).length === 0) {
        newListAction = [];
      } else {
        const order = newListAction.length + 1;

        const isHaveAction = newListAction.findIndex(
          (item) => item.action === payload.action
        );
        if (isHaveAction < 0) {
          newListAction.push({ ...payload, order });
        }
      }

      return { ...currentState, listAction: newListAction };
    default:
      return currentState;
  }
};
