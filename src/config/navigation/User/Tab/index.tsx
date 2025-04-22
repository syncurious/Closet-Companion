import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../../screen/User/Home';
import Profile from '../../../../screen/User/Profile';
import Dresses from '../../../../screen/User/Dresses';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Dresses" component={Dresses} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
