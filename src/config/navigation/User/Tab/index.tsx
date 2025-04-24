import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../../../../screen/User/Home';
import Profile from '../../../../screen/User/Profile';
import Dresses from '../../../../screen/User/Dresses';
import {
  addFilledIcon,
  addIcon,
  dressFilledIcon,
  dressIcon,
  galleryFilledIcon,
  galleryIcon,
  homeFilledIcon,
  homeIcon,
  userFilledIcon,
  userIcon,
} from '../../../../assets';
import {Image} from 'react-native';
import {Colors} from '../../../../utitlity/colors';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.subHeading,
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
        headerShown: false,
        tabBarStyle: {
          borderRadius: 20,
          height: 60,
          elevation: 0,
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
              source={focused ? galleryFilledIcon : galleryIcon}
            />
          ),
        }}
        name="Collection"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              style={{height: size, width: size}}
              tintColor={color}
              source={focused ? addFilledIcon : addIcon}
            />
          ),
        }}
        name="Add"
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
