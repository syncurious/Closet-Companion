import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {setIsLogin} from '@/config/redux/reducer';
import Container from '@/components/container';
import Heading from '@/components/heading';
import {eyeFilledIcon, eyeIcon} from '@/assets';
import Input from '@/components/input';
import Button from '@/components/button';
import {Colors} from '@/utitlity/colors';

const Signup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<any>>();
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    name: '',
    email: '',
    password: '',
  });
  const handleValueChange = (name: string, value: string) => {
    setPayload((prev: any) => ({...prev, [name]: value}));
  };
  const handleSignup = async () => {
    dispatch(setIsLogin(true));
  };
  const handleLogin = async () => {
    navigation.navigate('login');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Container scrollEnabled={false} fullScreen style={styles.Container}>
          <View style={styles.HeadingBox}>
            <Heading children={'Create Account'} level={2} />
            <Heading children={'Find your best matching clothes'} level={6} />
          </View>
          <View style={styles.InputBox}>
            <View style={styles.RowGap}>
              <View style={styles.RowGap}>
                <Heading level={6} children={'Name'} />
                <Input
                  type="default"
                  value={payload?.email}
                  onChangeText={e => {
                    handleValueChange('name', e);
                  }}
                />
              </View>
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
                  iconStyle={{
                    tintColor: Colors.white,
                    width: 20,
                    height: 20,
                    top: 3,
                  }}
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
              <View style={{flexDirection: 'row'}}>
                <Heading level={6} children={'Agree with '} />
                <Heading
                  level={6}
                  children={'Terms & Condition'}
                  style={{...styles.higlightText}}
                />
              </View>
              <Button
                variant="contained"
                children={'Signup'}
                onPress={handleSignup}
              />
            </View>
          </View>
          <View style={styles.ParagraphBox}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Heading level={6} children={'Already have an account? '} />
              <TouchableOpacity onPress={handleLogin}>
                <Heading
                  level={6}
                  children={'Login'}
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
    height : "100%"
  },
  HeadingBox: {
    flex: 0.25,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  InputBox: {
    flex: 0.45,
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

export default Signup;
