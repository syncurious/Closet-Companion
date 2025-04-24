import {View} from 'react-native';
import Container from '../../../components/container';
import Heading from '../../../components/heading';
import Input from '../../../components/input';
import {eyeFilledIcon, eyeIcon} from '../../../assets';
import {useState} from 'react';
import Button from '../../../components/button';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';

const Login = () => {
  const dispatch = useDispatch();
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const handleLogin = async () => {
    dispatch(setIsLogin(true));
  };
  return (
    <Container
      scrollEnabled={false}
      fullScreen
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
        }}>
        <Heading children={'Wellcome Back'} level={2} />
        <Heading children={'Hi Welcome back'} level={6} />
        <View style={{marginTop: 50, width: '100%', rowGap: 20}}>
          <View style={{rowGap: 5}}>
            <Heading level={6} children={'Email'} />
            <Input />
          </View>
          <View style={{rowGap: 5}}>
            <Heading level={6} children={'Password'} />
            <Input
              type={isPassword ? 'password' : 'default'}
              iconPosition="right"
              prefixIcon={isPassword ? eyeIcon : eyeFilledIcon}
              onPress={() => {
                setIsPassword(!isPassword);
              }}
            />
          </View>
          <View style={{rowGap: 30}}>
            <Heading
              level={6}
              children={'Forget Password'}
              style={{textAlign: 'right'}}
            />
            <Button
              variant="contained"
              children={'Login'}
              onPress={handleLogin}
            />
          </View>
          <View style={{rowGap: 30}}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Heading
                level={6}
                children={"Don't have an account? "}
                style={{}}
              />
              <Heading level={6} children={'Sign Up'} style={{}} />
            </View>
          </View>
        </View>
      </View>
    </Container>
  );
};

export default Login;
