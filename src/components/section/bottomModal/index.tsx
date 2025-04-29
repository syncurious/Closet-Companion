import {AiFilledIcon, crossIcon, selfIcon} from '@/assets';
import Heading from '@/components/heading';
import Ai from '@/screen/User/Ai';
import {Colors} from '@/utitlity/colors';
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
}
function BottomModal(props: Props) {
  const {isOpen, onClose} = props;
  const navigation = useNavigation<NavigationProp<any>>();

  const handleSelfCreate = () => {
    onClose();
    navigation.navigate('createPlans');
  };

  const handleAICreate = () => {
    onClose();
    navigation.navigate('createPlansbyAi');
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
          backgroundColor: '#00000090',
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modal}>
          <View style={styles.modalHeading}>
            <Heading
              style={{textAlign: 'center', color: Colors.white}}
              level={2}>
              Create Plan by
            </Heading>
          </View>
          <View style={styles.ul}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.li}
                onPress={handleSelfCreate}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: Colors.white,
                  }}
                  source={selfIcon}
                />
              </View>
              <View>
                <Heading level={4} style={styles.liText}>
                  Your Self
                </Heading>
                <Heading level={6} style={styles.liText}>
                  Create a plan by yourself
                </Heading>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.li}
                onPress={handleAICreate}
            >
              <View style={styles.imageContainer}>
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: 'contain',
                    tintColor: Colors.white,
                  }}
                  source={AiFilledIcon}
                />
              </View>
              <View>
                <Heading level={4} style={styles.liText}>
                  By Help of AI
                </Heading>
                <Heading level={6} style={styles.liText}>
                  Create a plan by AI
                </Heading>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity
              onPress={onClose}
              activeOpacity={0.9}
              style={styles.closeButton}>
              <Image style={styles.closeButtonIcon} source={crossIcon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default BottomModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    gap: 15,
    height: '60%',
  },
  modal: {
    height: 350,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.darkCard,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 90,
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
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonContainer: {
    padding: 20,
    height: 30,
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
});
