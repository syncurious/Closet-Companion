import {dress} from '@/assets';
import Heading from '@/components/heading';
import {Colors} from '@/utitlity/colors';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  data: {name: string; image_url: any; category: string};
}

function RecentCard(props: Props) {
  const {data} = props;
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 15,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: Colors.border,
        padding: 8,
        width: '100%',
      }}>
      <View style={{width: '20%'}}>
        <Image
          source={data?.image_url ? {uri: data?.image_url} : dress}
          resizeMode="cover"
          style={{height: 60, width: 60, borderRadius: 10}}
        />
      </View>
      <View style={{width: '80%'}}>
        <Heading level={6} style={styles.Heading}>
          {data?.name}
        </Heading>
        <View style={{flexDirection: 'row', columnGap: 10}}>
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
  Heading: {color: Colors.subHeading, fontWeight: 600},
  HeadingRow: {marginVertical: 20, rowGap: 2},
});
