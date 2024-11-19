import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar, Platform} from 'react-native';
import {
  CHARACTERDETAIL,
  FILTERCHARACTERS,
  SEARCHCHARACTERS,
  TABNAVIGATOR,
} from '../utils/ScreenName';
import TabNavigator from './TabNavigator';
import CharacterDetail from '../screens/Characters/CharacterDetail';
import FilterCharacters from '../screens/Characters/FilterCharacters';
import SearchCharacters from '../screens/Characters/SearchCharacters';
import HeaderRight from '../components/router/HeaderRight';
import Colors from '../theme/colors';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <>
      {/* StatusBar için stil uygulama */}
      <StatusBar
        barStyle="light-content" // Status bar metni beyaz
        backgroundColor="#1A1A1A" // Status bar arka plan rengi
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: Platform.OS === 'ios' ? 80 : 70, // Header boyutunu platforma göre ayarlama
            backgroundColor: '#1A1A1A', // Header arka plan rengi
            shadowOpacity: 0, // Header'ın gölgesini kaldırma
            elevation: 0, // Android için header gölgesini kaldırma
            paddingRight: 10, // Sağ boşluk ekleyerek headerRight'ı hizalamak
          },
          headerTitleStyle: {
            fontWeight: 'bold', // Başlık yazı tipi kalın
            fontSize: 18, // Başlık yazı boyutu
            color: '#FFFFFF', // Başlık rengi
          },
          headerTitleAlign: 'center', // Başlık hizalaması
          headerTintColor: Colors.WHITE, // Geri okunun ve başlık ikonunun rengini değiştirir
        }}>
        {/* Ana TabNavigator ekranı */}
        <Stack.Screen
          name={TABNAVIGATOR}
          component={TabNavigator}
          options={{
            headerShown: false, // TabNavigator için header'ı gizle
          }}
        />
        {/* Diğer ekranlar */}
        <Stack.Screen name={CHARACTERDETAIL} component={CharacterDetail} />
        <Stack.Screen name={FILTERCHARACTERS} component={FilterCharacters} />
        <Stack.Screen name={SEARCHCHARACTERS} component={SearchCharacters} />
      </Stack.Navigator>
    </>
  );
}

export default RootNavigator;
