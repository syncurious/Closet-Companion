import React, {useState} from 'react';
import {View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import Heading from '@/components/heading';
import Input from '@/components/input';
import DressCard from '@/components/card/dressCard';
import SelectDressCard from '@/components/card/selectDressCard';

const SelfOutfitPlaning = ({route}: any) => {
  const [dressOne, setDressOne] = useState('');
  const [dressTwo, setDressTwo] = useState('');
  return (
    <React.Fragment>
      <Header route={{name: 'Outfit Planing'}} />
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
            <Heading level={2}>Plan Your Perfect Outfit, Your Way </Heading>
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
            <View style={{gap: 10}}>
              <Heading level={6} children={'Where will you wear this?'} />
              <Input
                label="A Party Dress Casual, Work, Party, Date, Wedding, Vacation, Gym"
                iconStyle={{
                  tintColor: Colors.white,
                  width: 20,
                  height: 20,
                  top: 3,
                }}
              />
            </View>
          </View>
          <View style={{marginVertical: 30, gap: 20}}>
            <Heading
              level={6}
              children={"Let's Pick a Dresses for your plan."}
            />
            <View
              style={{
                flex: 1,
                height: 5000,
                gap: 5,
                rowGap: 15,
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {/* <DressCard /> */}
              <SelectDressCard />
              <SelectDressCard />
            </View>
          </View>
        </View>
      </Container>
    </React.Fragment>
  );
};

export default SelfOutfitPlaning;
