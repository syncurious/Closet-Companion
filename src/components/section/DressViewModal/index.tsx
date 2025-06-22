import { crossIcon, dressOne } from '@/assets';
import Heading from '@/components/heading';
import { Colors } from '@/utitlity/colors';
import Dimension from '@/utitlity/Dimension';
import { getBase64Url } from '@/utitlity/image';
import React from 'react';
import { Image, Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data?: {
    image_data: string;
    content_type: string;
    name: string;
    description: string;
    category: string;
  };
  onSubmit?: () => void;
}
function DressViewModal(props: Props) {
  const { isOpen, onClose, data } = props;
  const uri = getBase64Url(data?.image_data || '', data?.content_type);

  return (
    <Modal
      transparent
      animationType="slide"
      visible={isOpen}
      style={styles.modalContainer}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalBackdrop}>
        <View style={styles.modal}>
          <View style={styles.imageContainerRelative}>
            <Image
              source={data?.image_data ? {uri: uri} : dressOne}
              style={styles.dressImage}
            />
            <View style={styles.imageOverlay}>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Image source={crossIcon} style={styles.closeIcon} />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Heading level={3}>{data?.name || ''}</Heading>
                <Heading level={6} style={styles.categoryText}>
                  {data?.description || ''}
                </Heading>
                {data?.category ? (
                  <Heading level={6} style={styles.categoryText}>
                    ○ Category - {data?.category || ''}
                  </Heading>
                ) : null}
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'flex-end',
  },
  imageContainerRelative: {
    position: 'relative',
  },
  dressImage: {
    width: Dimension.width,
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: '#00000030',
    padding: 20,
    justifyContent: 'flex-end',
  },
  textContainer: {
    padding: 10,
    gap: 5,
    marginBottom: 10,
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
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 2,
  },
  closeIcon: {
    height: 20,
    width: 20,
    tintColor: Colors.white,
  },
  closeButtonContainer: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    width: '100%',
    alignItems: 'center',
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
