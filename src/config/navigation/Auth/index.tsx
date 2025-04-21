import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../../screen/Auth/login';
import Signup from '../../../screen/Auth/signup';

const stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="login" component={Login} />
      <stack.Screen name="signup" component={Signup} />
    </stack.Navigator>
  );
};

export default AuthNavigation;
