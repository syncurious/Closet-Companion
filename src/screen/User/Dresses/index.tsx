import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AddDressModal from '@/components/section/addDressModal';
import DressViewModal from '@/components/section/DressViewModal';
import Header from '@/components/header';
import Container from '@/components/container';
import Input from '@/components/input';
import { SearchIcon } from '@/assets';
import Heading from '@/components/heading';
import DressCard from '@/components/card/dressCard';
import { Colors } from '@/utitlity/colors';
import { Chip } from '@/components/chip';
import { showNotification } from '@/utitlity/toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFileObjectFromName } from '@/utitlity';
import { DressUpload, GetDresses } from '@/api/handlers';

export interface addDress {
  name: string;
  category: string;
  image_url: string | any;
}

const initialPayload = {
  image_url: '',
  name: '',
  category: '',
};
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

const Dresses = ({ route }: any) => {
  const [activeChip, setActiveChip] = useState('All');
  const [DressModal, setDressModal] = useState(false);
  const [isDressViewModal, setIsDressViewModal] = useState<any>({
    isOpen: false,
    data: {},
  });
  const [dressPayload, setDressPayload] = useState<addDress>(initialPayload);
  const [dressData, setDressData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterDressData, setFilterDressData] = useState<any>();

  const handlePayloadChange = (key: string, value: any) => {
    setDressPayload(prev => ({ ...prev, [key]: value }));
  };

  const addDressHandler = async () => {
    setIsLoading(true);
    if (
      !dressPayload?.name ||
      !dressPayload?.category ||
      !dressPayload?.image_url?.path
    ) {
      showNotification('error', 'Please Fill All Fields');
      setIsLoading(false);
      return;
    }
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      showNotification('error', 'User not found, please login again.');
      setIsLoading(false);
      return;
    }
    let form = new FormData();
    form.append(
      'file',
      getFileObjectFromName(
        dressPayload.image_url.filename,
        dressPayload.image_url.path,
      ),
    );
    form.append('user_id', userId);
    form.append('name', dressPayload.name);
    form.append('category', dressPayload.category.trim().toLowerCase());
    try {
      await DressUpload(form);
      setDressPayload(initialPayload);
      setDressModal(false);
      showNotification('success', 'Your dress has been added to your list.');
      GetDressesHandler();
    } catch (error) {
      console.error('Error Dress Upload:', error);
      showNotification('error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const GetDressesHandler = async () => {
    setIsLoading(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      showNotification('error', 'User not found, please login again.');
      setIsLoading(false);
      return;
    }
    try {
      const response: any = await GetDresses(userId);
      if (response?.items) {
        setDressData(response.items);
        setFilterDressData(response.items);
      }
    } catch (error) {
      console.error('Error getting dresses:', error);
      showNotification(
        'error',
        'Something went wrong, while getting Dresses',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = (item: any) => {
    setActiveChip(item);
    if (item === 'All') {
      setFilterDressData(dressData);
    } else {
      const data = dressData?.filter(
        (val: any) => val?.category?.trim().toLowerCase() == item,
      );
      setFilterDressData(data);
    }
  };

  useEffect(() => {
    GetDressesHandler();
  }, []);

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
              <TouchableOpacity key={index} onPress={() => handleFilter(item)}>
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
          {(filterDressData || dressData)?.map((item: any, index: number) => (
            <DressCard
              key={index}
              onPress={() => {
                setIsDressViewModal({ isOpen: true, data: item });
              }}
              data={item}
            />
          ))}
        </ScrollView>
      </Container>
      <AddDressModal
        isLoading={isLoading}
        setPayload={handlePayloadChange}
        payload={dressPayload}
        isOpen={DressModal}
        onClose={() => {
          setDressModal(false);
        }}
        onSubmit={addDressHandler}
      />
      <DressViewModal
        isOpen={isDressViewModal?.isOpen}
        onClose={() => {
          setIsDressViewModal({ isOpen: false });
        }}
        data={isDressViewModal?.data}
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
