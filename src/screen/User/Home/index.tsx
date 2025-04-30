import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Header from '@/components/header';
import Container from '@/components/container';
import {Colors} from '@/utitlity/colors';
import Heading from '@/components/heading';
import HomeCard from '@/components/card';
import {dress} from '@/assets';
import RecentCard from '@/components/card/recentCard';

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
        <HomeCard />
        <Heading
          level={4}
          style={{...styles.Heading, marginTop: 15, marginBottom: 8}}
          children={'Recent Dress'}
        />
        <RecentCard />
        <RecentCard />
        <RecentCard />
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Heading: {color: Colors.subHeading, fontWeight: 600},
  HeadingRow: {marginVertical: 20, rowGap: 2},
});

export default Home;
