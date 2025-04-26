import {View} from 'react-native';
import Container from '../../../components/container';
import React from 'react';
import {Colors} from '../../../utitlity/colors';
import Header from '../../../components/header';

const Home = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={route} isLogout />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View></View>
      </Container>
    </React.Fragment>
  );
};

export default Home;
