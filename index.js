import React from 'react';
import { Provider } from 'react-redux';
import { sagaMiddleware, store } from './src/redux/store';
import sagas from './src/redux/Sagas';
import App from './src/navigations';
import { AddDeviceStack } from './src/navigations/AddDeviceStack';
import { AddGatewayStack } from './src/navigations/AddGatewayStack';
import { AddMemberStack } from './src/navigations/AddMemberStack';
import { AddSubUnitStack } from './src/navigations/AddSubUnitStack';
import { UnitStack } from './src/navigations/UnitStack';
import { EmergencyContactsStack } from './src/navigations/EmergencyContactsStack';
import { AddUnitStack } from './src/navigations/AddUnitStack';
import SharedStack from './src/navigations/SharedStack';
import Explore from './src/screens/Explore';

const SmartHome = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

sagaMiddleware.run(sagas);

export default SmartHome;

export {
  AddSubUnitStack,
  EmergencyContactsStack,
  AddMemberStack,
  AddGatewayStack,
  AddDeviceStack,
  UnitStack,
  AddUnitStack,
  SharedStack,
  Explore,
};
