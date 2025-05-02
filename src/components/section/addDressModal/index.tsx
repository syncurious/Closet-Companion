import {AiFilledIcon, crossIcon, selfIcon} from '@/assets';
import Heading from '@/components/heading';
import Input from '@/components/input';
import AIOutfitPlanaing from '@/screen/User/Ai';
import {Colors} from '@/utitlity/colors';
import Dimension from '@/utitlity/Dimension';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: () => void;
}
function AddDressModal(props: Props) {
  const {isOpen, onClose} = props;
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSelfCreate = () => {
    onClose();
    navigation.navigate('/Plan/Outfit/Self');
  };

  const handleAICreate = () => {
    onClose();
    navigation.navigate('/Plan/Outfit/Ai');
  };

  return (
    <Modal
      transparent
      animationType="fade"
      visible={isOpen}
      style={styles.modalContainer}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        style={{
          flex: 1,
          backgroundColor: '#00000099',
          justifyContent: 'center',
          padding: 20,
        }}>
        <View style={styles.modal}>
          <View style={styles.modalHeading}>
            <Heading
              style={{textAlign: 'center', color: Colors.white}}
              level={2}>
              Create a New Dress
            </Heading>
          </View>
          <View>
            <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
              <View style={styles.imageContainer}>
                <Heading level={6} style={styles.categoryText}>
                  Select a dress Image
                </Heading>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{width: '100%', gap: 20}}>
            <View style={{gap: 10}}>
              <Heading level={6} children={'Name your new look'} />
              <Input
                label="e.g. Casual Sky"
                iconStyle={{
                  tintColor: Colors.white,
                  width: 20,
                  height: 20,
                  top: 3,
                }}
              />
            </View>
            <View style={{gap: 10}}>
              <Heading level={6} children={'What category does this outfit belong to?'} />
              <Input
                label="e.g. Eesten, Westen"
                iconStyle={{
                  tintColor: Colors.white,
                  width: 20,
                  height: 20,
                  top: 3,
                }}
              />
            </View>
          </View>
          <View style={styles.closeButtonContainer}><Heading level={3}>Create</Heading></View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default AddDressModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 15,
    height: '60%',
  },
  modal: {
    // height: 550,
    borderRadius: 20,
    backgroundColor: Colors.darkCard,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
    gap: 20,
  },
  modalHeading: {
    color: Colors.white,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  ul: {
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  li: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    padding: 8,
    gap: 10,
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.white + '30',
  },
  liText: {
    color: Colors.white,
  },
  closeButtonContainer: {
    padding: 12,
    borderRadius : 10,
    backgroundColor: Colors.primary,
    borderWidth : 1,
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: Colors.primary,
    width: 50,
    height: 50,
    borderRadius: 33.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonIcon: {
    width: 30,
    height: 30,
    tintColor: Colors.white,
  },

  cardContainer: {
    overflow: 'hidden',
    width: (Dimension.width -72),
    borderWidth: 2,
    borderStyle: 'dashed',
    backgroundColor: Colors.border + '15',
    borderColor: Colors.white + '20',
    borderRadius: 10,
  },
  imageContainer: {
    height: 200,
    backgroundColor: Colors.white + '10',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  categoryText: {
    color: Colors.white + '80',
  },
});
