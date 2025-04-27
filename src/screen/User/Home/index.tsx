import {Image, StyleSheet, View} from 'react-native';
import Container from '../../../components/container';
import React from 'react';
import {Colors} from '../../../utitlity/colors';
import Header from '../../../components/header';
import Heading from '../../../components/heading';
import HomeCard from '../../../components/card';
import {dress} from '../../../assets';

const Home = ({route}: any) => {
  return (
    <React.Fragment>
      <Header route={route} isLogout />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <View style={styles.HeadingRow}>
          <Heading
            style={styles.Heading}
            children={'Welcome Back !'}
            level={3}
          />
          <Heading
            style={styles.Heading}
            children={'Find your perfect recommendation'}
            level={6}
          />
        </View>
        <View>
          <View>
            <Heading
              level={4}
              style={styles.Heading}
              children={'Recent Dresses'}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.border,
              padding: 8,
              width: '100%',
            }}>
            <View style={{width: '20%'}}>
              <Image
                source={dress}
                resizeMode="cover"
                style={{height: 60, width: 60, borderRadius: 10}}
              />
            </View>
            <View style={{width: '80%'}}>
              <Heading level={6} style={styles.Heading} children={'New Day'} />
              <View style={{flexDirection: 'row', columnGap: 10}}>
                <Heading
                  level={6}
                  style={styles.Heading}
                  children={'Categories :'}
                />
                <Heading
                  level={6}
                  style={styles.Heading}
                  children={'Western'}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: 15,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: Colors.border,
              padding: 8,
              width: '100%',
            }}>
            <View style={{width: '20%'}}>
              <Image
                source={dress}
                resizeMode="cover"
                style={{height: 60, width: 60, borderRadius: 10}}
              />
            </View>
            <View style={{width: '80%'}}>
              <Heading level={6} style={styles.Heading} children={'New Day'} />
              <View style={{flexDirection: 'row', columnGap: 10}}>
                <Heading
                  level={6}
                  style={styles.Heading}
                  children={'Categories :'}
                />
                <Heading
                  level={6}
                  style={styles.Heading}
                  children={'Western'}
                />
              </View>
            </View>
          </View>
        </View>
        <HomeCard />
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Heading: {color: Colors.subHeading, fontWeight: 600},
  HeadingRow: {marginVertical: 20, rowGap: 2},
});

export default Home;
