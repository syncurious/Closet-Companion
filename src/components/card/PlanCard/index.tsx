import React from 'react';
import Heading from '../../heading';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {dress} from '../../../assets';
import Dimension from '../../../utitlity/Dimension';
import {Colors} from '../../../utitlity/colors';

interface Props {
  onPress?: () => void;
  data?: {
    image: string;
    name: string;
    wearType: string;
  };
}

function PlansCard(props: Props) {
  const {data} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <View style={[{flexDirection: 'row'}, styles.imageWrapper]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={data?.image ? {uri: data?.image} : dress}
            resizeMode="cover"
          />
        </View>
        <View
          style={[
            {
              height: '100%',
              width: 2,
              backgroundColor: Colors.white + '30',
            },
          ]}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={data?.image ? {uri: data?.image} : dress}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Heading level={3}>{data?.name || ''}</Heading>
        <Heading level={5} style={styles.categoryText}>
          {data?.wearType || ''}
        </Heading>
      </View>
    </TouchableOpacity>
  );
}

export default PlansCard;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    width: Dimension.width - 32,
    borderWidth: 2,
    backgroundColor: Colors.white + '15',
    borderColor: Colors.white + '20',
    borderRadius: 10,
  },
  imageContainer: {
    height: 150,
    width: ((Dimension.width - 32) / 100) * 49.5,
    backgroundColor: Colors.white + '10',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
    gap: 5,
    marginBottom: 10,
  },
  categoryText: {
    color: Colors.white + '85',
  },
});
