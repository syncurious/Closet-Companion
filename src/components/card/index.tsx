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
import {useState} from 'react';
import AddDressModal from '../section/addDressModal';
import {addDress} from '@/screen/User/Dresses';
import axios from 'axios';
import {endpoints} from '@/api/handlers';
import {baseURL, user_id} from '@/api';
import {getFileObjectFromName} from '@/utitlity';
import {showNotification} from '@/utitlity/toast';

const data = [
  {name: 'Outfit Planning', uri: planningIcon, route: 'Outfit'},
  {name: 'Virtual Styling', uri: virtualIcon, route: 'Virtual'},
  {name: 'Wardrobe Analytics', uri: analyticsIcon, route: 'Analytics'},
];

const initialPayload = {
  image_url: null,
  name: '',
  category: '',
};
const HomeCard = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [DressModal, setDressModal] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [dressPayload, setDressPayload] = useState<addDress>(initialPayload);
  const handleNavigate = (val: string) => {
    navigation.navigate(val);
  };

  const handlePayloadChange = (key: string, value: any) => {
    console.log('Key', key, 'value', value);
    setDressPayload(prev => ({...prev, [key]: value}));
  };

  const addDressHandler = async () => {
    setIsLoading(true);
    console.log('dress payload  ', dressPayload);
    if (
      !dressPayload?.name ||
      !dressPayload?.category ||
      !dressPayload?.image_url?.path
    ) {
      showNotification('error', 'Please Fill All Fields');
    }
    let form = new FormData();
    form.append(
      'file',
      getFileObjectFromName(
        dressPayload.image_url.filename,
        dressPayload.image_url.path,
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
      .then(response => {
        console.log('Dress uplaod response:', response);
        setDressPayload(initialPayload);
        setDressModal(false);
        showNotification('success', 'Your dress has been added to your list.');
      })
      .catch(error => {
        console.error('Error Dress Uplaod:', error);
        showNotification('error', 'Something went wrong. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
            setDressModal(true);
            // handleNavigate(val?.route);
          }}>
          <Image
            source={addIcon}
            tintColor={Colors.primary}
            style={styles.icon}
          />
          <Heading level={6} style={styles.Heading} children={'Add Dress'} />
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
        <AddDressModal
          isLoading={isLoading}
          payload={dressPayload}
          setPayload={handlePayloadChange}
          isOpen={DressModal}
          onClose={() => {
            setDressModal(false);
            setIsLoading(false);
            setDressPayload(initialPayload);
          }}
          onSubmit={addDressHandler}
        />
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
