import React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import {dress, EditProfileIcon, homeFilledIcon} from '../../../assets';
import Heading from '../../../components/heading';
import Dimension from '../../../utitlity/Dimension';
import DressCard from '../../../components/card/dressCard';
import Input from '../../../components/input';

const Dresses = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={route} />
      <Container fullScreen style={{backgroundColor: Colors.black}}>
        {/* Search and Filter */}

        <View style={{marginVertical: 10}}>
          <View style={{marginVertical: 10}}>
            <Input
              iconStyle={{tintColor: Colors.white}}
              prefixIcon={homeFilledIcon}
              style={{borderRadius: 100}}
            />
          </View>
          <ScrollView
            contentContainerStyle={{flexDirection: 'row', gap: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.white + '20',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
                borderRadius: 8,
                // borderWidth: 1,
                borderColor: '#fff',
              }}>
              <Image
                source={homeFilledIcon}
                style={{tintColor: Colors.white, width: 10, height: 10}}
              />
              <Heading level={6}> All </Heading>
            </View>
          </ScrollView>
        </View>

        {/* Dresses Cards renders */}
        <View
          style={{
            flex: 1,
            gap: 5,
            rowGap: 15,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <DressCard
              data={{
                image:
                  'https://images.unsplash.com/photo-1601758123927-4f2a1b0c3d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
                name: 'Moal',
                category: 'Easten',
              }}
            />
          ))}
        </View>
      </Container>
    </React.Fragment>
  );
};

export default Dresses;
