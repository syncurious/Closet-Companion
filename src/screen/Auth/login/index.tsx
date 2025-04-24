import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Container from '../../../components/container';
import Heading from '../../../components/heading';
import Input from '../../../components/input';
import {eyeFilledIcon, eyeIcon} from '../../../assets';
import {useState} from 'react';
import Button from '../../../components/button';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Colors} from '../../../utitlity/colors';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    email: '',
    password: '',
  });
  const handleValueChange = (name: string, value: string) => {
    setPayload((prev: any) => ({...prev, [name]: value}));
  };
  const handleLogin = async () => {
    dispatch(setIsLogin(true));
  };
  const handleSignup = () => {
    navigation.navigate('signup');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <Container scrollEnabled={false} fullScreen style={styles.Container}>
          <View style={styles.HeadingBox}>
            <Heading children={'Welcome Back'} level={2} />
            <Heading children={'Find your best matching clothes'} level={6} />
          </View>
          <View style={styles.InputBox}>
            <View style={styles.RowGap}>
              <View style={styles.RowGap}>
                <Heading level={6} children={'Email'} />
                <Input
                  type="email-address"
                  value={payload?.email}
                  onChangeText={e => {
                    handleValueChange('email', e);
                  }}
                />
              </View>
              <View style={styles.RowGap}>
                <Heading level={6} children={'Password'} />
                <Input
                  value={payload?.password}
                  onChangeText={e => {
                    handleValueChange('password', e);
                  }}
                  type={isPassword ? 'password' : 'default'}
                  iconPosition="right"
                  prefixIcon={isPassword ? eyeIcon : eyeFilledIcon}
                  onPress={() => {
                    setIsPassword(!isPassword);
                  }}
                />
              </View>
            </View>

            <View style={{flex: 1, justifyContent: 'space-around'}}>
              <Heading
                level={6}
                children={'Forget Password'}
                style={{...styles.higlightText, textAlign: 'right'}}
              />
              <Button
                variant="contained"
                children={'Login'}
                onPress={handleLogin}
              />
            </View>
          </View>
          <View style={styles.ParagraphBox}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Heading
                level={6}
                children={"Don't have an account? "}
                style={{}}
              />
              <TouchableOpacity onPress={handleSignup}>
                <Heading
                  level={6}
                  children={'Sign Up'}
                  style={styles.higlightText}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  HeadingBox: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  InputBox: {
    flex: 0.35,
    justifyContent: 'space-between',
  },
  ParagraphBox: {
    flex: 0.2,
  },
  RowGap: {
    rowGap: 5,
  },
  higlightText: {
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
});

export default Login;
