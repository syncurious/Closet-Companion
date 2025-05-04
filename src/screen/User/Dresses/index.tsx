import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import {checkIcon, SearchIcon} from '../../../assets';
import Heading from '../../../components/heading';
import DressCard from '../../../components/card/dressCard';
import Input from '../../../components/input';
import AddDressModal from '@/components/section/addDressModal';

const chipsData = ['All', 'western', 'Eestern', 'Nothern', 'Asian', 'Southern'];
export function Chip({label, isActive}: {label: string; isActive: boolean}) {
  return (
    <View
      style={[
        styles.chip,
        {backgroundColor: isActive ? Colors.primary : Colors.white + '20'},
      ]}>
      {isActive ? <Image source={checkIcon} style={styles.checkIcon} /> : null}
      <Heading level={6}> {label} </Heading>
    </View>
  );
}

const Dresses = ({route}: any) => {
  const [activeChip, setActiveChip] = useState('All');
  const [DressModal, setDressModal] = useState(false);

  return (
    <React.Fragment>
      <Header route={route} />
      <Container fullScreen style={styles.container}>
        {/* Search and Filter */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchContainer}>
            <Input
              label="Search Dresses"
              iconStyle={styles.searchIcon}
              prefixIcon={SearchIcon}
              style={styles.searchInput}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.chipsContainer}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {chipsData.map((item: string, index) => (
              <TouchableOpacity key={index} onPress={() => setActiveChip(item)}>
                <Chip label={item} isActive={activeChip == item} key={index} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setDressModal(true);
            }}
            style={styles.addDressButton}>
            <Heading level={4} style={styles.addDressText}>
              Add New Dress
            </Heading>
          </TouchableOpacity>
        </View>

        {/* Dresses Cards renders */}
        <ScrollView
          style={styles.dressCardsScroll}
          contentContainerStyle={styles.dressCardsContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <DressCard
              key={index}
              data={{
                image:
                  'https://images.unsplash.com/photo-1601758123927-4f2a1b0c3d8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60',
                name: 'Moal',
                category: 'Easten',
              }}
            />
          ))}
        </ScrollView>
      </Container>
      <AddDressModal
        isOpen={DressModal}
        onClose={() => {
          setDressModal(false);
        }}
      />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  searchFilterContainer: {
    marginVertical: 10,
  },
  searchContainer: {
    marginVertical: 10,
  },
  searchIcon: {
    tintColor: Colors.white,
  },
  searchInput: {
    borderRadius: 100,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  chip: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderRadius: 8,
    borderColor: '#fff',
  },
  checkIcon: {
    tintColor: Colors.white,
    width: 10,
    height: 10,
  },
  addDressButton: {
    marginTop: 30,
    padding: 20,
    borderWidth: 2,
    borderColor: Colors.white + '40',
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  addDressText: {
    textAlign: 'center',
    color: Colors.white + '90',
  },
  dressCardsScroll: {
    flex: 1,
  },
  dressCardsContainer: {
    height: 5000,
    gap: 5,
    rowGap: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Dresses;
