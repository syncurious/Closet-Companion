import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import { Colors } from '@/utitlity/colors';
import Container from '@/components/container';
import Header from '@/components/header';
import { pickImageFromGallery } from '@/utitlity/imagePicker';
import Button from '@/components/button';
import { VirtualTryOn } from '@/api/handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IamgesType {
  modelImage: any;
  topImage: any;
  bottomImage: any;
}

interface VirtualTryOnResponse {
  user_id: string;
  timestamp: string;
  top_filename: string;
  bottom_filename: string;
  suggestion: string;
  result_path: string;
  result_base64: string;
}

const Virtual: React.FC = () => {
  const [InputImages, setInputImages] = useState<IamgesType>({
    modelImage: null,
    topImage: null,
    bottomImage: null,
  });
  const [generatedOutfit, setGeneratedOutfit] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const pickImage = async (key: string) => {
    const response = await pickImageFromGallery();
    console.log(response);
    setInputImages(p => ({ ...p, [key]: response }));
  };

  const handleGenerateOutfit = async () => {
    if (
      InputImages?.modelImage &&
      InputImages?.topImage &&
      InputImages?.bottomImage
    ) {
      setLoading(true);
      try {
        const userId = await AsyncStorage.getItem('userId');
        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('person_image', {
          uri: InputImages.modelImage.path,
          type: InputImages.modelImage.mime,
          name: InputImages.modelImage.path.split('/').pop(),
        });
        formData.append('top_image', {
          uri: InputImages.topImage.path,
          type: InputImages.topImage.mime,
          name: InputImages.topImage.path.split('/').pop(),
        });
        formData.append('bottom_image', {
          uri: InputImages.bottomImage.path,
          type: InputImages.bottomImage.mime,
          name: InputImages.bottomImage.path.split('/').pop(),
        });
        const response = await VirtualTryOn(formData) as VirtualTryOnResponse;
        if (response?.result_base64) {
          setGeneratedOutfit(`data:image/png;base64,${response.result_base64}`);
        }
      } catch (error) {
        console.error('Error generating outfit:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCreateNew = () => {
    setGeneratedOutfit(null);
    setInputImages({
      modelImage: null,
      topImage: null,
      bottomImage: null,
    });
  };

  return (
    <React.Fragment>
      <Header route={{ name: 'Virtual Style' }} />
      <Container
        fullScreen
        scrollEnabled
        style={{ backgroundColor: Colors.black }}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          {generatedOutfit ? (
            <View style={styles.resultBox}>
              <View>
                <Text style={styles.label}>Generated Outfit</Text>
                <Image
                  source={{ uri: generatedOutfit }}
                  style={styles.resultImage}
                  resizeMode="contain"
                />
              </View>
              <View style={{ marginTop: 24 }}>
                <Button
                  variant="outline"
                  onPress={handleCreateNew}
                  style={{ marginTop: 10 }}>
                  Create New Outfit
                </Button>
              </View>
            </View>
          ) : (
            <>
              {/* Image Pickers */}
              <View style={styles.pickerSection}>
                <Text style={styles.label}>Select Model Image</Text>
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={() => pickImage('modelImage')}>
                  {InputImages.modelImage ? (
                    <Image
                      source={
                        InputImages.modelImage
                          ? { uri: InputImages?.modelImage.path }
                          : undefined
                      }
                      style={styles.image}
                    />
                  ) : (
                    <Text style={styles.placeholder}>Select here</Text>
                  )}
                </TouchableOpacity>

                {/* Row for Top and Bottom Images */}
                <View style={styles.row}>
                  <View style={styles.imageContainer}>
                    <Text style={styles.label}>Select Top (Shirt)</Text>
                    <TouchableOpacity
                      style={styles.imageBox}
                      onPress={() => pickImage('topImage')}>
                      {InputImages.topImage ? (
                        <Image
                          source={
                            InputImages.topImage
                              ? { uri: InputImages.topImage.path }
                              : undefined
                          }
                          style={styles.image}
                        />
                      ) : (
                        <Text style={styles.placeholder}>Select here</Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <View style={styles.imageContainer}>
                    <Text style={styles.label}>Select Bottom (Trouser)</Text>
                    <TouchableOpacity
                      style={styles.imageBox}
                      onPress={() => pickImage('bottomImage')}>
                      {InputImages.bottomImage ? (
                        <Image
                          source={
                            InputImages.bottomImage
                              ? { uri: InputImages.bottomImage?.path }
                              : undefined
                          }
                          style={styles.image}
                        />
                      ) : (
                        <Text style={styles.placeholder}>Select here</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Generate Button */}
              <Button
                variant="contained"
                onPress={handleGenerateOutfit}
                isLoading={loading}>
                Generate Outfit
              </Button>
            </>
          )}
        </ScrollView>
      </Container>
    </React.Fragment>
  );
};

export default Virtual;

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 20,
  },
  pickerSection: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: Colors.textSubOne,
    marginBottom: 6,
    marginTop: 12,
  },
  imageBox: {
    height: 160,
    borderRadius: 12,
    backgroundColor: Colors.lightCard + '80',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Colors.white + '20',

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  placeholder: {
    color: Colors.textSub,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: Colors.black,
    fontWeight: '700',
    fontSize: 16,
  },
  resultBox: {
    marginTop: 24,
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  imageContainer: {
    width: '48%', // Keeping them in a row with space between
  },
});
