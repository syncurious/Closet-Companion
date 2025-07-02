import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '@/components/header';
import Container from '@/components/container';
import {Colors} from '@/utitlity/colors';
import Heading from '@/components/heading';
import HomeCard from '@/components/card';
import RecentCard from '@/components/card/recentCard';
import {getData} from '@/service/firestoreHelper';
import { showNotification } from '@/utitlity/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetDresses } from '@/api/handlers';
import Loader from '@/components/loader';

const Home = ({route}: any) => {
  const [dressData, setDressData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const GetDressesHandler = async () => {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      showNotification('error', 'User not found, please login again.');
      setIsLoading(false);
      return;
    }
    try {
      const response: any = await GetDresses(userId);
      if (response?.items) {
        setDressData(response.items);
      }
    } catch (error) {
      console.error('Error getting dresses:', error);
      showNotification(
        'error',
        'Something went wrong, while getting Dresses',
      );
    } finally {
      setIsLoading(false);
    }
  };    

  useEffect(() => {
    GetDressesHandler();
  }, []);
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
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Loader />
          </View>
        ) : (
          dressData?.map((item: any, index: number) => {
            if (index < 3) return <RecentCard key={index} data={item} />;
          })
        )}
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  Heading: {color: Colors.subHeading, fontWeight: 600},
  HeadingRow: {marginVertical: 20, rowGap: 2},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
