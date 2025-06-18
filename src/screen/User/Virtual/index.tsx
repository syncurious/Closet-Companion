import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import ImagePicker from 'react-native-image-crop-picker';
import {Colors} from '@/utitlity/colors';
import Container from '@/components/container';
import Header from '@/components/header';
import {pickImageFromGallery} from '@/utitlity/imagePicker';

interface IamgesType {
  modelImage: any;
  topImage: any;
  bottomImage: any;
}
const Virtual: React.FC = () => {
  const [InputImages, setInputImages] = useState<IamgesType>({
    modelImage: null,
    topImage: null,
    bottomImage: null,
  });
  const [generatedOutfit, setGeneratedOutfit] = useState<string | null>(null);

  const pickImage = async (key: string) => {
    const response = await pickImageFromGallery();
    console.log(response);
    setInputImages(p => ({...p, [key]: response}));
  };

  const handleGenerateOutfit = () => {
    // Placeholder logic — replace with actual API call or image merge
    if (
      InputImages?.modelImage &&
      InputImages?.topImage &&
      InputImages?.bottomImage
    ) {
      // Temporary logic to simulate generated outfit with just the model image
      // setGeneratedOutfit(modelImage); // Replace with merged image logic
    }
  };

  return (
    <React.Fragment>
      <Header route={{name: 'Virtual Style'}} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.black}}>
        <ScrollView contentContainerStyle={styles.wrapper}>
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
                      ? {uri: InputImages?.modelImage.path}
                      : undefined
                  }
                  style={styles.image}
                />
              ) : (
                <Text style={styles.placeholder}>+ Model Image</Text>
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
                          ? {uri: InputImages.topImage.path}
                          : undefined
                      }
                      style={styles.image}
                    />
                  ) : (
                    <Text style={styles.placeholder}>+ Top Image</Text>
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
                          ? {uri: InputImages.bottomImage?.path}
                          : undefined
                      }
                      style={styles.image}
                    />
                  ) : (
                    <Text style={styles.placeholder}>+ Bottom Image</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Generate Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleGenerateOutfit}>
            <Text style={styles.buttonText}>Generate Outfit</Text>
          </TouchableOpacity>

          {/* Generated Result */}
          {generatedOutfit && (
            <View style={styles.resultBox}>
              <Text style={styles.label}>Generated Outfit</Text>
              <Image
                source={{uri: generatedOutfit}}
                style={styles.resultImage}
              />
            </View>
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
    backgroundColor: Colors.lightCard,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
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
