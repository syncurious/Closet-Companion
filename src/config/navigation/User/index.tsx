import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigation from './Tab';
import Analytics from '../../../screen/User/Analytics';
import Virtual from '../../../screen/User/Virtual';
import Ai from '../../../screen/User/Ai';
import Outfit from '../../../screen/User/Outfit';
import Add from '../../../screen/User/Add';

const stack = createNativeStackNavigator();

const UserNavigation = () => {
  return (
    <stack.Navigator
      initialRouteName="Bottom"
      screenOptions={{headerShown: false}}>
      <stack.Screen name="Bottom" component={TabNavigation} />
      <stack.Screen name="Analytics" component={Analytics} />
      <stack.Screen name="Virtual" component={Virtual} />
      <stack.Screen name="Add" component={Add} />
      <stack.Screen name="Outfit" component={Outfit} />
    </stack.Navigator>
  );
};

export default UserNavigation;
