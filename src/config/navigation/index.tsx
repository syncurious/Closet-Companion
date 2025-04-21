import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../screen/Auth/login';
import Signup from '../../screen/Auth/signup';

const stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown: false}}>
        <stack.Screen name="login" component={Login} />
        <stack.Screen name="signup" component={Signup} />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
