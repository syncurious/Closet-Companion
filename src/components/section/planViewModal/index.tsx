import {AiFilledIcon, crossIcon, selfIcon} from '@/assets';
import DressCard from '@/components/card/dressCard';
import Heading from '@/components/heading';
import Input from '@/components/input';
import AIOutfitPlanaing from '@/screen/User/Ai';
import {Colors} from '@/utitlity/colors';
import Dimension from '@/utitlity/Dimension';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DressViewModal from '../dressViewModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    image: string;
    name: string;
    wearType: string;
  };
  // onSubmit: () => void;
}
function PlanViewModal(props: Props) {
  const {isOpen, onClose, data} = props;
  const [isDressModalOpen, setIsDressModalOpen] = useState(false);
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
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modal}>
          <View
            style={{
              padding: 10,
              gap: 5,
              width: '100%',
              marginBottom: 10,
            }}>
            <Heading level={3}>{data?.name || ''}</Heading>
            <Heading level={5} style={styles.categoryText}>
              {data?.wearType || ''}
            </Heading>
          </View>
          <View
            style={{
              gap: 5,
              rowGap: 15,
              marginVertical: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            <DressCard
              data={{
                image: 'data:image/jpeg;base64,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',
                name: 'Moal',
                category: 'Easten',
              }}
              onPress={() => {
                setIsDressModalOpen(true);
              }}
              />
            <DressCard
              onPress={() => {
                setIsDressModalOpen(true);
              }}
              data={{
                image: 'data:image/jpeg;base64,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',
                name: 'Moal',
                category: 'Easten',
              }}
            />
          </View>
          <View style={styles.closeButtonContainer}>
            <Heading level={3}>Set as Today’s Look</Heading>
          </View>
        </View>
        <DressViewModal
          isOpen={isDressModalOpen}
          onClose={() => {
            setIsDressModalOpen(false);
          }}
        />
      </TouchableOpacity>
    </Modal>
  );
}

export default PlanViewModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 15,
    height: '60%',
  },
  modal: {
    borderRadius: 20,
    backgroundColor: Colors.darkCard,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
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
    borderRadius: 10,
    backgroundColor: Colors.primary,
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
    width: Dimension.width - 72,
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
