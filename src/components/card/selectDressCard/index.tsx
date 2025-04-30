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

function SelectDressCard(props: Props) {
  const {data} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Heading level={6} style={styles.categoryText}>
          Select a dress
        </Heading>
      </View>
    </TouchableOpacity>
  );
}

export default SelectDressCard;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    width: (Dimension.width / 100) * 44,
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: Colors.border + '15',
    borderColor: Colors.white + '20',
    borderRadius: 10,
  },
  imageContainer: {
    height: 230,
    backgroundColor: Colors.white + '10',
    width: '100%',
    justifyContent : "center",
    alignItems: "center",
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  categoryText: {
    color: Colors.white + '80',
  },
});
