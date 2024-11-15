import {createNativeStackNavigator} from '@react-navigation/native-stack';
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
import {Text, Platform} from 'react-native';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // Tüm ekran başlıklarını ortala
        headerBackTitleVisible: false, // Geri butonunun başlıkla karışmaması için
        headerTitleStyle: {
          fontWeight: 'bold', // Başlık stilini özelleştirebilirsiniz (isteğe bağlı)
          fontSize: 18, // Yazı boyutunu ayarlayabilirsiniz (isteğe bağlı)
        },
        headerStyle: {
          height: Platform.OS === 'ios' ? 80 : 70, // Header boyutunu platforma göre ayarla
        },
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
      <Stack.Screen
        name={CHARACTERDETAIL}
        component={CharacterDetail}
        options={{
          title: 'Character Detail', // Başlık metni
          headerTitle: () => (
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Character Detail
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name={FILTERCHARACTERS}
        component={FilterCharacters}
        options={{
          title: 'Filter Characters', // Başlık metni
          headerTitle: () => (
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Filter Characters
            </Text>
          ),
        }}
      />
      <Stack.Screen
        name={SEARCHCHARACTERS}
        component={SearchCharacters}
        options={{
          title: 'Search Characters', // Başlık metni
          headerTitle: () => (
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', fontSize: 18}}>
              Search Characters
            </Text>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default RootNavigator;
