import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/RootNavigator';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <Provider Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
