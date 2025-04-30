import React from 'react';
import {View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import Heading from '@/components/heading';
import SelectDressCard from '@/components/card/selectDressCard';
import Input from '@/components/input';

const AIOutfitPlanaing = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={{name: 'Outfit Planing With AI'}} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View style={{marginVertical: 20}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
            }}>
            <Heading level={1}>Let AI Style You Instantly </Heading>
          </View>
          <View style={{gap: 20}}>
            <View style={{gap: 10}}>
              <Heading
                level={6}
                children={'What would you like to name this plan?'}
              />
              <Input
                label="A Party Dress"
                iconStyle={{
                  tintColor: Colors.white,
                  width: 20,
                  height: 20,
                  top: 3,
                }}
              />
            </View>
            <View style={{gap: 10, alignItems: 'center', marginTop: 40}}>
              <Heading
                style={{textAlign: 'center'}}
                level={2}
                children={'Style is a way to say who you are.'}
              />
              <Heading
                style={{textAlign: 'center', color: Colors.white + '60'}}
                level={6}
                children={
                  'Tell us about the occasion, mood, or preferences and your AI stylist will build a look just for you.'
                }
              />
              <Input
                multiline
                label="I'm looking for a stylish yet relaxed outfit for a weekend brunch with friends. It should feel casual but still look thoughtfully styled. I like soft pastel tones and comfortable, airy fabrics. Since it's spring, I'd love something light and season-appropriate. Ideally, the look should pair nicely with classic white sneakers."
                iconStyle={{
                  tintColor: Colors.white,
                  width: 20,
                  height: 20,
                  top: 3,
                }}
              />
            </View>
          </View>
        </View>
      </Container>
    </React.Fragment>
  );
};

export default AIOutfitPlanaing;
