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
    category: string;
  };
}

function DressCard(props: Props) {
  const {data , onPress} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={data?.image ? {uri: data?.image} : dress}
          resizeMode="cover"
        />
      </View>
      <View style={styles.contentContainer}>
        <Heading level={3}>{data?.name || ''}</Heading>
        <Heading level={6} style={styles.categoryText}>
          Category - {data?.category || ''}
        </Heading>
      </View>
    </TouchableOpacity>
  );
}

export default DressCard;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    width: (Dimension.width / 100) * 44,
    borderWidth: 2,
    backgroundColor: Colors.white + '15',
    borderColor: Colors.white + '20',
    borderRadius: 10,
  },
  imageContainer: {
    height: 150,
    backgroundColor: Colors.white + '10',
    width: '100%',
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
    color: Colors.white + '80',
  },
});
