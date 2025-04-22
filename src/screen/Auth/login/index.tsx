import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';
import Container from '../../../components/container';

const Login = () => {
  const dispatch = useDispatch();
  return (
    <Container scrollEnabled={false} fullScreen>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{color: 'white', fontSize: 20}}
          onPress={() => {
            dispatch(setIsLogin(false));
          }}>
          Login
        </Text>
      </View>
    </Container>
  );
};

export default Login;
