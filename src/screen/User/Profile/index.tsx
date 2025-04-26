import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../../config/redux/reducer';
import Button from '../../../components/button';
import React from 'react';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';

const Profile = ({route}: any) => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    dispatch(setIsLogin(false));
  };
  return (
    <React.Fragment>
      <Header route={route} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View>
          <Button
            variant="contained"
            children={'Logout'}
            onPress={handleLogout}
            style={{width: '50%'}}
          />
        </View>
      </Container>
    </React.Fragment>
  );
};

export default Profile;
