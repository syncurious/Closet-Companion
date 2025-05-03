import {logo} from '@/assets';
import {Colors} from '@/utitlity/colors';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>Closet Companion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    position: 'absolute',
    bottom: 40,
    letterSpacing: 3,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 4,
  },
});

export default SplashScreen;
