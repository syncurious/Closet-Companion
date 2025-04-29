import {eyeFilledIcon, eyeIcon} from '@/assets';
import Button from '@/components/button';
import Container from '@/components/container';
import Heading from '@/components/heading';
import Input from '@/components/input';
import {setIsLogin} from '@/config/redux/reducer';
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
} from 'react-native';
import {useDispatch} from 'react-redux';

const Forgot = () => {
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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <Container scrollEnabled={false} fullScreen style={styles.Container}>
          <View style={styles.HeadingBox}>
            <Heading children={'Forgot Password'} level={2} />
            <Heading
              children={'Enter the email associated with your account'}
              level={6}
            />
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
            </View>

            <View style={{flex: 1, justifyContent: 'space-around'}}>
              <Button
                variant="contained"
                children={'Forgot Password'}
                onPress={handleLogin}
              />
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
    flex: 0.25,
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

export default Forgot;
