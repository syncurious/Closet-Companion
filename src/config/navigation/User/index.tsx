import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../../screen/User/Home';
import TabNavigation from './Tab';

const stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{headerShown: false}}>
      <stack.Screen name="Bottom" component={TabNavigation} />
    </stack.Navigator>
  );
};

export default UserNavigation;
