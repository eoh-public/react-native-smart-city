import React, { useContext, useReducer } from 'react';

import {
  ActionDataMap,
  ActionType,
  AuthData,
  Language,
  StatusBar,
} from './actionType';
import { initialState, Action, ContextData, reducer } from './reducer';
import { setConfigGlobalState } from '../iot/states.js';

type SCContextType = {
  stateData: ContextData;
  setAuth: (authData: AuthData) => void;
  setLocale: (language: Language) => void;
  setStatusBar: (statusBar: StatusBar) => void;
  setAction: <T extends ActionType>(
    action: T,
    payload?: ActionDataMap[T]
  ) => void;
};

export const SCContext = React.createContext<SCContextType>(
  {} as SCContextType
);
type Reducer<StateData, Action> = (
  state: StateData,
  action: Action
) => StateData;

export const SCProvider = ({ children, initState = initialState }) => {
  const [stateData, dispatch] = useReducer<Reducer<ContextData, Action>>(
    reducer,
    initState
  );

  const setAuth = (authData: AuthData) => {
    setAction('UPDATE_AUTH', authData);
  };

  const setStatusBar = (statusBar: StatusBar) => {
    setAction('STORE_STATUS_BAR', statusBar);
  };

  const setLocale = (language: Language) => {
    setConfigGlobalState('lang', language);
    setAction('UPDATE_LANGUAGE', language);
  };

  const setAction = <T extends ActionType>(
    action: T,
    payload?: ActionDataMap[T]
  ) => {
    dispatch({ type: action, payload: payload });
  };

  const providerValue = {
    stateData,
    setAuth,
    setAction,
    setLocale,
    setStatusBar,
  };

  return (
    <SCContext.Provider value={providerValue}>
      {children}
      {/* <Alert ref={(ref) => Alert.setRef(ref)} />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} /> */}
    </SCContext.Provider>
  );
};

export const useSCContextSelector = (
  selector: (contextData: ContextData) => unknown
) => {
  const { stateData } = useContext(SCContext);
  return selector(stateData);
};
