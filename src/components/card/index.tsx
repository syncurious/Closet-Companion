import {Image, StyleSheet, View} from 'react-native';
import Heading from '../heading';
import Dimension from '../../utitlity/Dimension';
import {Colors} from '../../utitlity/colors';
import {
  addIcon,
  AiIcon,
  analyticsIcon,
  planningIcon,
  userIcon,
  virtualIcon,
} from '../../assets';

const data = [
  {name: 'Add Dresss', uri: addIcon},
  {name: 'Profile', uri: userIcon},
  {name: 'Wardrobe Analytics', uri: analyticsIcon},
  {name: 'Outfit Planning', uri: planningIcon},
  {name: 'Virtual Styling', uri: virtualIcon},
  {name: 'Ai Recommendation', uri: AiIcon},
];

const HomeCard = () => {
  return (
    <View style={{marginBottom: 20}}>
      <Heading level={4} style={styles.Heading} children={'Quick Action'} />
      <View style={styles.container}>
        {data?.map((val: any, index: number) => {
          return (
            <View key={index} style={styles.card}>
              <Image
                source={val?.uri}
                tintColor={Colors.primary}
                style={styles.icon}
              />
              <Heading level={6} style={styles.Heading} children={val?.name} />
            </View>
          );
        })}
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
    marginTop: 8,
  },
  icon: {height: 25, width: 25},
});

export default HomeCard;
