import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AddDressModal from '@/components/section/addDressModal';
import DressViewModal from '@/components/section/DressViewModal';
import Header from '@/components/header';
import Container from '@/components/container';
import Input from '@/components/input';
import { checkIcon, SearchIcon } from '@/assets';
import Heading from '@/components/heading';
import DressCard from '@/components/card/dressCard';
import { Colors } from '@/utitlity/colors';

const chipsData = [
  'All',
  'western',
  'eastern',
  'traditional',
  'casual',
  'formal',
  'scarf',
  'abaya',
];
export function Chip({label, isActive}: {label: string; isActive: boolean}) {
  return (
    <View
      style={[
        styles.chipContainer,
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
  const [isDressViewModal, setIsDressViewModal] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Header route={route} />
      <Container fullScreen style={styles.container}>
        {/* Search and Filter */}
        <View style={styles.searchFilterContainer}>
          <View style={styles.searchInputContainer}>
            <Input
              label="Search Dresses"
              iconStyle={styles.searchIcon}
              prefixIcon={SearchIcon}
              style={styles.searchInput}
            />
          </View>
          <ScrollView
            contentContainerStyle={styles.chipsScrollContainer}
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
            <Heading level={4} style={styles.addDressButtonText}>
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
              onPress={() => {
                setIsDressViewModal(true);
              }}
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
      <DressViewModal
        isOpen={isDressViewModal}
        onClose={() => {
          setIsDressViewModal(false);
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
  searchInputContainer: {
    marginVertical: 10,
  },
  searchIcon: {
    tintColor: Colors.white,
  },
  searchInput: {
    borderRadius: 100,
  },
  chipsScrollContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  chipContainer: {
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
  addDressButtonText: {
    textAlign: 'center',
    color: Colors.white + '90',
  },
  dressCardsScroll: {
    flex: 1,
  },
  dressCardsContainer: {
    height: 1200,
    gap: 5,
    rowGap: 15,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default Dresses;
