import React from 'react';
import {Text, View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';

const Add = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={{name: 'Add Dress'}} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View></View>
      </Container>
    </React.Fragment>
  );
};

export default Add;
