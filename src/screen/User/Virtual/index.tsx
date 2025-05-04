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

const Virtual: React.FC = () => {
  const [modelImage, setModelImage] = useState<string | null>(null);
  const [topImage, setTopImage] = useState<string | null>(null);
  const [bottomImage, setBottomImage] = useState<string | null>(null);
  const [generatedOutfit, setGeneratedOutfit] = useState<string | null>(null);

  const pickImage = async () => {
    // Implement image selection logic using ImagePicker or similar
    // Here we're using a placeholder just for the design
  };

  const handleGenerateOutfit = () => {
    // Placeholder logic — replace with actual API call or image merge
    if (modelImage && topImage && bottomImage) {
      // Temporary logic to simulate generated outfit with just the model image
      setGeneratedOutfit(modelImage); // Replace with merged image logic
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
              onPress={() => pickImage()}>
              {modelImage ? (
                <Image source={{uri: modelImage}} style={styles.image} />
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
                  onPress={() => pickImage()}>
                  {topImage ? (
                    <Image source={{uri: topImage}} style={styles.image} />
                  ) : (
                    <Text style={styles.placeholder}>+ Top Image</Text>
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.imageContainer}>
                <Text style={styles.label}>Select Bottom (Trouser)</Text>
                <TouchableOpacity
                  style={styles.imageBox}
                  onPress={() => pickImage()}>
                  {bottomImage ? (
                    <Image source={{uri: bottomImage}} style={styles.image} />
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
