import React from 'react';
import { Provider } from 'react-redux';
import { sagaMiddleware, store } from './src/redux/store';
import sagas from './src/redux/Sagas';
import App from './src/navigations';

const SmartHome = (props) => {
  return (
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );
};

sagaMiddleware.run(sagas);

export default SmartHome;
