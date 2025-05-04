import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import {Colors} from '../../../utitlity/colors';
import {
  checkIcon,
  dress,
  EditProfileIcon,
  homeFilledIcon,
  SearchIcon,
} from '../../../assets';
import Heading from '../../../components/heading';
import Dimension from '../../../utitlity/Dimension';
import DressCard from '../../../components/card/dressCard';
import Input from '../../../components/input';
import AddDressModal from '@/components/section/addDressModal';
import DressViewModal from '@/components/section/DressViewModal';

const chipsData = ['All', 'westen', 'Eesten', 'Nothern', 'Asian', 'Southern'];
export function Chip({label, isActive}: {label: string; isActive: boolean}) {
  return (
    <View
      style={{
        padding: 8,
        backgroundColor: isActive ? Colors.primary : Colors.white + '20',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        borderRadius: 8,
        // borderWidth: 1,
        borderColor: '#fff',
      }}>
      {isActive ? (
        <Image
          source={checkIcon}
          style={{tintColor: Colors.white, width: 10, height: 10}}
        />
      ) : null}
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
      <Container fullScreen style={{backgroundColor: Colors.black}}>
        {/* Search and Filter */}

        <View style={{marginVertical: 10}}>
          <View style={{marginVertical: 10}}>
            <Input
              label="Search Dresses"
              iconStyle={{tintColor: Colors.white}}
              prefixIcon={SearchIcon}
              style={{borderRadius: 100}}
            />
          </View>
          <ScrollView
            contentContainerStyle={{flexDirection: 'row', gap: 10}}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {chipsData.map((item: string, index) => (
              <TouchableOpacity onPress={() => setActiveChip(item)}>
                <Chip label={item} isActive={activeChip == item} key={index} />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setDressModal(true);
            }}
            style={{
              marginTop: 30,
              padding: 20,
              borderWidth: 2,
              borderColor: Colors.white + '40',
              borderStyle: 'dashed',
              borderRadius: 10,
            }}>
            <Heading
              level={4}
              style={{textAlign: 'center', color: Colors.white + '90'}}>
              Add New Dress
            </Heading>
          </TouchableOpacity>
        </View>

        {/* Dresses Cards renders */}
        <ScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            flex: 1,
            height: 5000,
            gap: 5,
            rowGap: 15,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <DressCard
              onPress={()=>{setIsDressViewModal(true)}}
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
      <AddDressModal isOpen={DressModal} onClose={()=>{setDressModal(false)}} />
      <DressViewModal isOpen={isDressViewModal} onClose={()=>{setIsDressViewModal(false)}} />
    </React.Fragment>
  );
};

export default Dresses;
