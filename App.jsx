import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import RootNavigator from './src/router/RootNavigator';
import {StatusBar, View, Platform} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* Durum çubuğu arka planı */}
        <View
          style={{
            flex: 1,
            backgroundColor: '#6a51ae', // Arka plan rengi (istediğiniz renk)
          }}>
          <StatusBar
            translucent={false} // Durum çubuğu şeffaf
            backgroundColor="transparent" // Arka plan View tarafından kontrol ediliyor
            barStyle="light-content" // Saat ve simgeler açık renk (beyaz)
          />
          <RootNavigator />
        </View>
      </NavigationContainer>
    </Provider>
  );
}
