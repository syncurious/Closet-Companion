import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        onPress={() => {
          dispatch(setIsLogin(false));
        }}>
        Login
      </Text>
    </View>
  );
};

export default Login;
