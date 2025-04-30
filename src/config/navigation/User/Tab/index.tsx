import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../../screen/User/Home';
import Profile from '../../../../screen/User/Profile';
import Dresses from '../../../../screen/User/Dresses';
import {
  AiFilledIcon,
  AiIcon,
  ChatBotFilledIcon,
  ChatBotIcon,
  dressFilledIcon,
  dressIcon,
  homeFilledIcon,
  homeIcon,
  userFilledIcon,
  userIcon,
} from '../../../../assets';
import {Image} from 'react-native';
import {Colors} from '../../../../utitlity/colors';
import Ai from '../../../../screen/User/Ai';
import ChatBot from '../../../../screen/User/ChatBot';
import BottomNavBar from '@/components/section/bottomBar';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
    tabBar={(props)=><BottomNavBar {...props} />}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Dresses"
        component={Dresses}
      />
      <Tab.Screen
        name="Ai"
        component={Ai}
      />
      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
