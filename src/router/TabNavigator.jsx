import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CHARACTERS, EPISODES, LOCATIONS, SETTINGS} from '../utils/ScreenName';
import Characters from '../screens/Characters';
import Episodes from '../screens/Episodes';
import Locations from '../screens/Locations';
import Settings from '../screens/Settings';
import TabIcon from '../components/router/tabIcon';
import {tabBarStyle} from '../styles/tabBarStyle';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => (
          <TabIcon
            screenName={route.name}
            size={size}
            color={color}
            focused={focused}
          />
        ),
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#A1A1A1', // Pasif renk
        headerStyle: tabBarStyle.headerStyle,
        tabBarStyle: tabBarStyle.tabBarStyle,
        tabBarLabelStyle: tabBarStyle.tabBarLabelStyle,
        headerTitleStyle: tabBarStyle.headerTitleStyle,
        tabBarHideOnKeyboard: true, // Klavye açıldığında TabBar'ı gizle
      })}>
      <Tab.Screen name={CHARACTERS} component={Characters} />
      <Tab.Screen name={EPISODES} component={Episodes} />
      <Tab.Screen name={LOCATIONS} component={Locations} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
