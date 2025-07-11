import React from 'react';
import Heading from '../../heading';
import {Image, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import {dressOne} from '../../../assets';
import Dimension from '../../../utitlity/Dimension';
import {Colors} from '../../../utitlity/colors';
import { getBase64Url } from '@/utitlity/image';

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
  data?: {
    image_data: string;
    content_type: string;
    name: string;
    category: string;
    occasion: string;
    material: string;
    id?: string;
  };
}

function DressCard(props: Props) {
  const {data, onPress, style} = props;
  const uri = getBase64Url(data?.image_data || '', data?.content_type);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.cardContainer, style]}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={uri ? {uri} : dressOne}
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
