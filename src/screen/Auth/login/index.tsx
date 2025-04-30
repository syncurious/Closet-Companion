import {eyeFilledIcon, eyeIcon} from '@/assets';
import Button from '@/components/button';
import Container from '@/components/container';
import Heading from '@/components/heading';
import Input from '@/components/input';
import {setIsLogin} from '@/config/redux/reducer';
import {loginWithEmail} from '@/service/firebaseAuth';
import {Colors} from '@/utitlity/colors';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';

const initialPayload = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [payload, setPayload] = useState(initialPayload);
  const handleValueChange = (name: string, value: string) => {
    setPayload((prev: any) => ({...prev, [name]: value}));
  };
  const handleLogin = async () => {
    try {
      const response = await loginWithEmail(payload);
      if (response.success) {
        console.log('✅ Login success:', response.user);
        console.log('👤 User profile data:', response.userData);
        dispatch(setIsLogin(true)), setPayload(initialPayload);
      } else {
        console.warn('❌ Login failed:', response.message);
        Alert.alert(`${response?.message}`);
      }
    } catch (error) {
      console.error('⚠️ Unexpected error during login:', error);
    }
  };
  const handleSignup = () => {
    navigation.navigate('signup');
  };
  const handleForgot = () => {
    navigation.navigate('forgot');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
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
                  iconStyle={{tintColor: Colors.white}}
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
              <TouchableOpacity onPress={handleForgot}>
                <Heading
                  level={6}
                  children={'Forget Password'}
                  style={{...styles.higlightText, textAlign: 'right'}}
                />
              </TouchableOpacity>
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
