import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {CHARACTERS, EPISODES, LOCATIONS, SETTINGS} from '../utils/ScreenName';
import Characters from '../screens/Characters';
import Episodes from '../screens/Episodes';
import Locations from '../screens/Locations';
import Settings from '../screens/Settings';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={CHARACTERS} component={Characters} />
      <Tab.Screen name={EPISODES} component={Episodes} />
      <Tab.Screen name={LOCATIONS} component={Locations} />
      <Tab.Screen name={SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
}

export default TabNavigator;
