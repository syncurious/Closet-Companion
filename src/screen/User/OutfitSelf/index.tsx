import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';

const SelfOutfitPlaning = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={{name: 'Outfit Planing'}} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View></View>
      </Container>
    </React.Fragment>
  );
};

export default SelfOutfitPlaning;
