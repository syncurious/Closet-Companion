import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import AddDressModal from '@/components/section/addDressModal';
import DressViewModal from '@/components/section/DressViewModal';
import Header from '@/components/header';
import Container from '@/components/container';
import Input from '@/components/input';
import {SearchIcon} from '@/assets';
import Heading from '@/components/heading';
import DressCard from '@/components/card/dressCard';
import {Colors} from '@/utitlity/colors';
import {Chip} from '@/components/chip';
import {showNotification} from '@/utitlity/toast';
import {createData, getData} from '@/service/firestoreHelper';
import {S3Helper} from '@/service/aws';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFileObjectFromName} from '@/utitlity';
import {baseURL, user_id} from '@/api';
import {endpoints} from '@/api/handlers';
import axios from 'axios';

export interface addDress {
  name: string;
  category: string;
  dressImage: string | any;
}

const initialPayload = {
  dressImage: '',
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

const Dresses = ({route}: any) => {
  const [activeChip, setActiveChip] = useState('All');
  const [DressModal, setDressModal] = useState(false);
  const [isDressViewModal, setIsDressViewModal] = useState<any>({
    isOpen: false,
    data: {},
  });
  const [dressPayload, setDressPayload] = useState<addDress>(initialPayload);
  const [userId, setUserId] = useState<string>('');
  const [dressData, setDressData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterDressData, setFilterDressData] = useState<any>();

  const handleGet = async () => {
    const id = await AsyncStorage.getItem('userId');
    if (id) setUserId(id);
  };

  const handlePayloadChange = (key: string, value: any) => {
    console.log('Key', key, 'value', value);
    setDressPayload(prev => ({...prev, [key]: value}));
  };

  const handleAddDress = async () => {
    if (
      !dressPayload?.name ||
      !dressPayload?.category ||
      !dressPayload?.dressImage?.path
    ) {
      showNotification('error', 'Please Fill All Fields');
    }
    const body = {...dressPayload, userId: userId};
    if (dressPayload?.dressImage?.path) {
      try {
        const uploadedUrl = await S3Helper.uploadFileToS3(
          dressPayload?.dressImage?.path,
          dressPayload?.dressImage?.filename,
        );
        console.log('Uploaded file URL:', uploadedUrl);
        body.dressImage = uploadedUrl;
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }
    try {
      const response = await createData('dress', body);
      if (response?.success) {
        showNotification('success', response?.message);
        setDressModal(false);
        handleGet();
      } else {
        showNotification('error', 'Failed');
      }
    } catch (error) {
      console.log('Error', error);
    }
  };

  const addDressHandler = async () => {
    setIsLoading(true);
    console.log('dress payload  ', dressPayload);
    if (
      !dressPayload?.name ||
      !dressPayload?.category ||
      !dressPayload?.dressImage?.path
    ) {
      showNotification('error', 'Please Fill All Fields');
    }
    let form = new FormData();
    form.append(
      'file',
      getFileObjectFromName(
        dressPayload.dressImage.filename,
        dressPayload.dressImage.path,
      ),
    );
    form.append('user_id', user_id);
    form.append('name', dressPayload.name);
    form.append('category', dressPayload.category);
    axios
      .post(baseURL + endpoints.DRESS_UPLOAD, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response: any) => {
        console.log('Dress uplaod response:', response);
        setDressPayload(initialPayload);
        setDressModal(false);
        showNotification('success', 'Your dress has been added to your list.');
      })
      .catch((error: any) => {
        console.error('Error Dress Uplaod:', error);
        showNotification('error', 'Something went wrong. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGetDresses = async () => {
    const response = await getData('dress');
    if (response?.success) {
      setDressData(response?.data);
      console.log('Get Dress', response);
    } else {
      console.log('Error Dress', response);
    }
  };

  const handleFilter = (item: any) => {
    setActiveChip(item);
    if (item === 'All') {
      setFilterDressData(null);
      console.log('all');
    } else {
      const data = dressData?.filter((val: any) => val?.category === item);
      console.log('item', item, data);
      setFilterDressData(data);
    }
  };

  useEffect(() => {
    handleGet();
    handleGetDresses();
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
                setIsDressViewModal({isOpen: true, data: item});
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
          setIsDressViewModal({isOpen: false});
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
