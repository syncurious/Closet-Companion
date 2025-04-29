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
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.subHeading,
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          elevation: 0,
          backgroundColor: Colors.black,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? homeFilledIcon : homeIcon}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? dressFilledIcon : dressIcon}
            />
          ),
        }}
        name="Dresses"
        component={Dresses}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? AiFilledIcon : AiIcon}
            />
          ),
        }}
        name="Ai"
        component={Ai}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? ChatBotFilledIcon : ChatBotIcon}
            />
          ),
        }}
        name="ChatBot"
        component={ChatBot}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? userFilledIcon : userIcon}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
