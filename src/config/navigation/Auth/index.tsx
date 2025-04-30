import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../../screen/Auth/login';
import Signup from '../../../screen/Auth/signup';
import Forgot from '@/screen/Auth/forgot';

const stack = createNativeStackNavigator();

const AuthNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false}}>
      <stack.Screen name="login" component={Login} />
      <stack.Screen name="signup" component={Signup} />
      <stack.Screen name="forgot" component={Forgot} />
    </stack.Navigator>
  );
};

export default AuthNavigation;
