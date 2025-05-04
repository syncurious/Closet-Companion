import Button from '@/components/button';
import Container from '@/components/container';
import Heading from '@/components/heading';
import Input from '@/components/input';
import {resetPassword} from '@/service/firebaseAuth';
import {showNotification} from '@/utitlity/toast';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';

const Forgot = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState({
    email: '',
  });
  const handleValueChange = (name: string, value: string) => {
    setPayload((prev: any) => ({...prev, [name]: value}));
  };
  const handleForgot = async () => {
    setIsLoading(true);
    try {
      const response = await resetPassword(payload?.email);
      if (response.success) {
        console.log('✅ Email sent:', response.message);
        showNotification('success', `${response.message}`);
        navigation.navigate('login');
      } else {
        showNotification('error', `${response?.message}`);
        console.warn('❌ Failed to send reset email:', response.message);
      }
    } catch (error) {
      console.error('⚠️ Unexpected error during password reset:', error);
    } finally {
      setIsLoading(false);
    }
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
                isLoading={isLoading}
                variant="contained"
                children={'Forgot Password'}
                onPress={handleForgot}
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
  RowGap: {
    rowGap: 5,
  },
});

export default Forgot;
