import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './utils';
import { Alert } from '../commons';
import Toast from 'react-native-toast-message';
import { Colors } from '../configs';
import Routes from '../utils/Route';
import { UnitStack } from './UnitStack';
import { AddGatewayStack } from './AddGatewayStack';
import { AddDeviceStack } from './AddDeviceStack';
import { AddMemberStack } from './AddMemberStack';
import { AddSubUnitStack } from './AddSubUnitStack';
import { EmergencyContactsStack } from './EmergencyContactsStack';
import { createStackNavigator } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { initAuth } from '../redux/Actions/auth';
import { exitApp as resetExitApp } from '../redux/Actions/ui';
import _ from 'lodash';

const Stack = createStackNavigator();

const toastConfig = {
  // only for error for now
  error: (internalState) => (
    <View style={styles.toastContainer}>
      <Text style={styles.textWhite}>{internalState.text1}</Text>
    </View>
  ),
};

const App = (props) => {
  const exitApp = useSelector((state) => state.ui.exitApp);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const params = _.get(props, 'params', null);

  useEffect(() => {
    dispatch(initAuth(props.auth?.account));
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (exitApp) {
      const { onExitApp } = props;
      onExitApp && onExitApp();

      dispatch(resetExitApp());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exitApp]);

  if (loading) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      {React.isValidElement(props.children)
        ? React.cloneElement(props.children, { params: params })
        : props.children}
      <Alert ref={(ref) => Alert.setRef(ref)} />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};

export default App;

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
