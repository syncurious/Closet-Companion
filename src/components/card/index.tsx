import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  addIcon,
  AiIcon,
  analyticsIcon,
  planningIcon,
  userIcon,
  virtualIcon,
} from '@/assets';
import {Colors} from '@/utitlity/colors';
import Dimension from '@/utitlity/Dimension';
import Heading from '../heading';
import { useState } from 'react';
import AddDressModal from '../section/addDressModal';

const data = [
  {name: 'Outfit Planning', uri: planningIcon, route: 'Outfit'},
  {name: 'Virtual Styling', uri: virtualIcon, route: 'Virtual'},
  {name: 'Wardrobe Analytics', uri: analyticsIcon, route: 'Analytics'},
];

const HomeCard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [DressModal, setDressModal] = useState(false)
  const handleNavigate = (val: string) => {
    navigation.navigate(val);
  };
  return (
    <View style={{marginBottom: 20}}>
      <Heading
        level={4}
        style={{...styles.Heading, marginTop: 15, marginBottom: 8}}
        children={'Quick Action'}
      />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            setDressModal(true)
            // handleNavigate(val?.route);
          }}>
          <Image
            source={addIcon}
            tintColor={Colors.primary}
            style={styles.icon}
          />
          <Heading level={6} style={styles.Heading} children={"Add Dress"} />
        </TouchableOpacity>
        {data?.map((val: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => {
                handleNavigate(val?.route);
              }}>
              <Image
                source={val?.uri}
                tintColor={Colors.primary}
                style={styles.icon}
              />
              <Heading level={6} style={styles.Heading} children={val?.name} />
            </TouchableOpacity>
          );
        })}
        <AddDressModal isOpen={DressModal} onClose={()=>{setDressModal(false)}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Heading: {color: Colors.subHeading, fontWeight: 600},
  card: {
    height: 100,
    width: Dimension.width / 2 - 22,
    borderColor: Colors.subHeading,
    borderWidth: 1,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightCard,
    rowGap: 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
    // marginTop: 8,
  },
  icon: {height: 25, width: 25},
});

export default HomeCard;
