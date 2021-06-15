import React, { useContext, useEffect, useReducer } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Toast from 'react-native-toast-message';

import { Alert } from '../commons';
import { Colors } from '../configs';
import { initI18n, i18nSetLocale } from '../utils/I18n';
import { ActionDataMap, ActionType, AuthData, Language, StatusBar } from './actionType';
import { initialState, Action, ContextData, reducer } from './reducer';

const toastConfig = {
  // only for error for now
  error: (internalState) => (
    <View style={styles.toastContainer}>
      <Text style={styles.textWhite}>{internalState.text1}</Text>
    </View>
  ),
};

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

export const SCProvider = ({ children }) => {
  useEffect(() => {
    initI18n();
  }, []);

  const [stateData, dispatch] = useReducer<Reducer<ContextData, Action>>(
    reducer,
    initialState
  );

  const setAuth = (authData: AuthData) => {
    setAction('UPDATE_AUTH', authData);
  };

  const setLocale = (language: Language) => {
    i18nSetLocale(language);
    setAction('UPDATE_LANGUAGE', language);
  };

  const setStatusBar = (statusBar: StatusBar) => {
    setAction('STORE_STATUS_BAR', statusBar);
  };

  const setAction = <T extends ActionType>(
    action: T,
    payload?: ActionDataMap[T]
  ) => {
    dispatch({ type: action, payload: payload });
  };

  const providerValue = { stateData, setAuth, setLocale, setAction, setStatusBar };

  return (
    <SCContext.Provider value={providerValue}>
      {children}
      <Alert ref={(ref) => Alert.setRef(ref)} />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </SCContext.Provider>
  );
};

export const useSCContextSelector = (
  selector: (contextData: ContextData) => unknown
) => {
  const { stateData } = useContext(SCContext);
  return selector(stateData);
};

const styles = StyleSheet.create({
  toastContainer: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: Colors.Black,
  },
  textWhite: {
    color: Colors.White,
  },
});
