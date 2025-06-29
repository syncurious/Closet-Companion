import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import { Colors } from '../../../utitlity/colors';
import Heading from '@/components/heading';
import Input from '@/components/input';
import Button from '@/components/button';
import DressCard from '@/components/card/dressCard';
import { CreateOutfitPlanBySelf, GetDresses } from '@/api/handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showNotification } from '@/utitlity/toast';

const SelfOutfitPlaning = ({ route }: any) => {
  const [planName, setPlanName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [weatherCondition, setWeatherCondition] = useState('clear');
  const [selectedDressIds, setSelectedDressIds] = useState<string[]>([]);
  const [dresses, setDresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLoadingDresses, setIsLoadingDresses] = useState(false);

  // Fetch dresses on component mount
  useEffect(() => {
    fetchDresses();
  }, []);

  const fetchDresses = async () => {
    setIsLoadingDresses(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        showNotification('error', 'User not found, please login again.');
        return;
      }

      const response: any = await GetDresses(userId);
      if (response?.items) {
        setDresses(response.items);
      }
    } catch (error) {
      console.error('Error fetching dresses:', error);
      showNotification('error', 'Failed to fetch dresses.');
    } finally {
      setIsLoadingDresses(false);
    }
  };

  const handleDressSelection = (dressId: string) => {
    // Allow selecting up to 2 dresses
    if (selectedDressIds.includes(dressId)) {
      // If already selected, remove it
      setSelectedDressIds(prev => prev.filter(id => id !== dressId));
    } else {
      // If not selected and we have less than 2, add it
      if (selectedDressIds.length < 2) {
        setSelectedDressIds(prev => [...prev, dressId]);
      } else {
        showNotification('error', 'You can only select up to 2 dresses.');
      }
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!planName.trim()) {
      showNotification('error', 'Please enter a plan name.');
      return;
    }

    if (!occasion.trim()) {
      showNotification('error', 'Please enter an occasion.');
      return;
    }

    if (!weatherCondition.trim()) {
      showNotification('error', 'Please enter weather condition.');
      return;
    }

    if (selectedDressIds.length < 2) {
      showNotification('error', 'Please select at least 2 dresses.');
      return;
    }

    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        showNotification('error', 'User not found, please login again.');
        setLoading(false);
        return;
      }

      // Use FormData for multipart/form-data
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('plan_name', planName);
      formData.append('occasion', occasion);
      formData.append('weather_condition', weatherCondition);
      formData.append('items', JSON.stringify(selectedDressIds)); // Stringify the array

      console.log('Form Data', formData);
      const response: any = await CreateOutfitPlanBySelf(formData);
      if (response) {
        showNotification('success', 'Outfit plan created successfully!');
        // Reset form
        setPlanName('');
        setOccasion('');
        setWeatherCondition('clear');
        setSelectedDressIds([]);
      } else {
        showNotification('error', 'Failed to create outfit plan.');
      }
    } catch (error) {
      console.error('Error creating outfit plan:', error);
      showNotification('error', 'An error occurred while creating the plan.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <Header route={{ name: 'Outfit Planning' }} />
      <Container
        fullScreen
        scrollEnabled
        style={{ backgroundColor: Colors.black }}>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Heading level={2}>Plan Your Perfect Outfit, Your Way </Heading>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Heading
                level={6}
                children={'What would you like to name this plan?'}
              />
              <Input
                label="A Party Dress"
                value={planName}
                onChangeText={setPlanName}
                iconStyle={styles.inputIcon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Heading level={6} children={'Where will you wear this?'} />
              <Input
                label="Casual, Work, Party, Wedding"
                value={occasion}
                onChangeText={setOccasion}
                iconStyle={styles.inputIcon}
              />
            </View>

            <View style={styles.inputGroup}>
              <Heading level={6} children={'Weather Condition'} />
              <Input
                label="clear, cloudy, rainy, snowy"
                value={weatherCondition}
                onChangeText={setWeatherCondition}
                iconStyle={styles.inputIcon}
              />
            </View>
          </View>

          <View style={styles.dressSelectionContainer}>
            <Heading
              level={6}
              children={"Let's Pick Dresses for your plan. (Select exactly 2)"}
            />

            {isLoadingDresses ? (
              <View style={styles.loadingContainer}>
                <Heading level={6} style={styles.loadingText}>
                  Loading dresses...
                </Heading>
              </View>
            ) : (
              <View style={styles.dressesGrid}>
                {dresses.map((dress, index) => (
                  <DressCard
                    key={index}
                    data={dress}
                    onPress={() => handleDressSelection(dress.item_id)}
                    style={
                      selectedDressIds.includes(dress.item_id)
                        ? styles.selectedDress
                        : undefined
                    }
                  />
                ))}
                {dresses.length === 0 && (
                  <View style={styles.noDressesContainer}>
                    <Heading level={6} style={styles.noDressesText}>
                      No dresses available. Please add some dresses first.
                    </Heading>
                  </View>
                )}
              </View>
            )}
          </View>

          <View style={styles.submitContainer}>
            <Button
              variant="contained"
              onPress={handleSubmit}
              isLoading={loading}
              disabled={!planName.trim() || !occasion.trim() || !weatherCondition.trim() || selectedDressIds.length < 2}
              style={styles.submitButton}>
              Create Outfit Plan
            </Button>
          </View>
        </View>
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  formContainer: {
    gap: 20,
  },
  inputGroup: {
    gap: 10,
  },
  inputIcon: {
    tintColor: Colors.white,
    width: 20,
    height: 20,
    top: 3,
  },
  dressSelectionContainer: {
    marginVertical: 30,
    gap: 20,
  },
  dressesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
    marginVertical: 10,
  },
  selectedDress: {
    borderColor: Colors.primary,
    borderWidth: 3,
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  loadingText: {
    color: Colors.white + '80',
  },
  noDressesContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    width: '100%',
  },
  noDressesText: {
    color: Colors.white + '80',
    textAlign: 'center',
  },
  submitContainer: {
    marginTop: 30,
  },
  submitButton: {
    marginBottom: 20,
  },
});

export default SelfOutfitPlaning;
