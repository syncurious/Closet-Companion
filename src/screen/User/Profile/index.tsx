import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';
import Button from '../../../components/button';

const Profile = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setIsLogin(false));
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button
        variant="contained"
        children={'Logout'}
        onPress={handleLogout}
        style={{width: '50%'}}
      />
    </View>
  );
};

export default Profile;
