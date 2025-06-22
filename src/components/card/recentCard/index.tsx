import {dress} from '@/assets';
import Heading from '@/components/heading';
import {Colors} from '@/utitlity/colors';
import { getBase64Url } from '@/utitlity/image';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  data: {name: string; image_data: string; category: string; content_type: string};
}

function RecentCard(props: Props) {
  const {data} = props;
  const uri = getBase64Url(data?.image_data || '', data?.content_type);
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={data?.image_data ? {uri: uri} : dress}
          resizeMode="cover"
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Heading level={6} style={styles.Heading}>
          {data?.name}
        </Heading>
        <View style={styles.categoryContainer}>
          <Heading level={6} style={styles.Heading}>
            {`Categories : ${data?.category}`}
          </Heading>
        </View>
      </View>
    </View>
  );
}

export default RecentCard;

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 8,
    width: '100%',
  },
  imageContainer: {
    width: '20%',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  textContainer: {
    width: '80%',
  },
  categoryContainer: {
    flexDirection: 'row',
    columnGap: 10,
  },
  Heading: {color: Colors.subHeading, fontWeight: 600},
  HeadingRow: {marginVertical: 20, rowGap: 2},
});
