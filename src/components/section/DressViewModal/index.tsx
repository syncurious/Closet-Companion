import {crossIcon, dressOne, selfIcon} from '@/assets';
import Heading from '@/components/heading';
import {Colors} from '@/utitlity/colors';
import Dimension from '@/utitlity/Dimension';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    image: string;
    name: string;
    category: string;
  };
  // onSubmit: () => void;
}
function DressViewModal(props: Props) {
  const {isOpen, onClose, data} = props;

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isOpen}
      style={styles.modalContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={{
          flex: 1,
          backgroundColor: '#00000090',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modal}>
          <View style={{position: 'relative'}}>
            <Image
              source={dressOne}
              style={{
                width: Dimension.width,
                height: '100%',
              }}
            />
            <View
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                backgroundColor: '#00000030',
                padding: 20,
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={onClose}
                style={{position: 'absolute', top: 20, right: 20, zIndex: 2}}>
                <Image
                  source={crossIcon}
                  style={{height: 20, width: 20, tintColor: Colors.white}}
                />
              </TouchableOpacity>
              <View
                style={{
                  padding: 10,
                  gap: 5,
                  marginBottom: 10,
                }}>
                <Heading level={3}>{data?.name || 'Moal - Chake'}</Heading>
                <Heading level={6} style={styles.categoryText}>
                  Category - {data?.category || 'Easten'}
                </Heading>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default DressViewModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 15,
    height: '60%',
  },
  modal: {
    overflow: 'hidden',
    backgroundColor: Colors.darkCard,
    justifyContent: 'center',
    alignItems: 'center',
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
    borderWidth: 1,
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
