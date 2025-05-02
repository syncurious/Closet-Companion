import React from 'react';
import {ScrollView, Text, View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import PlansCard from '@/components/card/PlanCard';
import Input from '@/components/input';
import {SearchIcon} from '@/assets';

const Outfit = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={route} />
      <Container
        fullScreen
        // scrollEnabled
        contentContainerStyle={{flex: 1, height: '100%'}}
        style={{backgroundColor: Colors.black}}>
        <View>
          <View style={{marginVertical: 10}}>
            <Input
              label="Search Dresses"
              iconStyle={{tintColor: Colors.white}}
              prefixIcon={SearchIcon}
              style={{borderRadius: 100}}
            />
          </View>
          <View>
            <ScrollView
              style={{
                // flex: 1,
                height: '100%',
              }}
              contentContainerStyle={{
                // flex: 1,
                borderWidth: 1,
                gap: 5,
                rowGap: 15,
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              {[1, 2, 3, 4, 5].map((item, index) => (
                <PlansCard
                  data={{
                    image: '',
                    name: "Emily's Brithday",
                    wearType: 'Party Wear',
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      </Container>
    </React.Fragment>
  );
};

export default Outfit;
