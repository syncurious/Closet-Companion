import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../../screen/User/Home';
import TabNavigation from './Tab';

const stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <stack.Screen name="Home" component={TabNavigation} />
    </stack.Navigator>
  );
};

export default UserNavigation;
