import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import { Colors } from '../../../utitlity/colors';
import Heading from '@/components/heading';
import Input from '@/components/input';
import Button from '@/components/button';
import { CreateOutfitPlanByAi } from '@/api/handlers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showNotification } from '@/utitlity/toast';
import DressCard from '@/components/card/dressCard';

const AIOutfitPlanaing = ({ route }: any) => {
  const [planName, setPlanName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[] | null>(null);

  const handleBackToGenerator = () => {
    setRecommendations(null);
  };

  const handleGeneratePlan = async () => {
    if (!planName.trim() || !prompt.trim()) {
      showNotification('error', 'Plan name and prompt cannot be empty.');
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

      const body = {
        user_id: userId,
        plan_name: planName,
        prompt: prompt,
        location: 'Karachi',
      };

      const response: any = await CreateOutfitPlanByAi(body);
      if (response?.recommendations) {
        setRecommendations(response.recommendations);
        showNotification('success', 'Outfit plan created successfully!');
      } else {
        showNotification('error', 'Could not generate outfit plan.');
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
      <Header route={{ name: 'Outfit Planing With AI' }} />
      <Container
        fullScreen
        scrollEnabled
        style={styles.container}>
        <View style={styles.contentContainer}>
          {!recommendations ? (
            <>
              <View
                style={styles.headerContainer}>
                <Heading level={1}>Let AI Style You Instantly </Heading>
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
                <View style={styles.promptSection}>
                  <Heading
                    style={styles.promptTitle}
                    level={2}
                    children={'Style is a way to say who you are.'}
                  />
                  <Heading
                    style={styles.promptSubtitle}
                    level={6}
                    children={
                      'Tell us about the occasion, mood, or preferences and your AI stylist will build a look just for you.'
                    }
                  />
                  <Input
                    multiline
                    value={prompt}
                    onChangeText={setPrompt}
                    label="I'm looking for a stylish yet relaxed outfit for a weekend brunch with friends. It should feel casual but still look thoughtfully styled. I like soft pastel tones and comfortable, airy fabrics. Since it's spring, I'd love something light and season-appropriate. Ideally, the look should pair nicely with classic white sneakers."
                    iconStyle={styles.inputIcon}
                  />
                </View>
                <Button
                  variant="contained"
                  onPress={handleGeneratePlan}
                  isLoading={loading}
                  style={styles.generateButton}>
                  Generate Outfit
                </Button>
              </View>
            </>
          ) : (
            <View>
              {recommendations.map((rec, index) => (
                <View key={`rec-${index}`} style={styles.recommendationCard}>
                  <Heading level={2} style={styles.recommendationTitle}>
                    {rec.title}
                  </Heading>
                  <Heading
                    level={6}
                    style={styles.recommendationComment}>
                    {rec.comment}
                  </Heading>
                  <View
                    style={styles.wardrobeItemsContainer}>
                    {rec.wardrobe_items.map((item: any, itemIndex: number) => (
                      <DressCard key={itemIndex} data={item} />
                    ))}
                  </View>
                </View>
              ))}
              <Button
                variant='contained'
                style={styles.backButton}
                onPress={handleBackToGenerator}>
                Style Me Again
              </Button>
            </View>
          )}
        </View>
      </Container>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
  },
  contentContainer: {
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
  promptSection: {
    gap: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  promptTitle: {
    textAlign: 'center',
  },
  promptSubtitle: {
    textAlign: 'center',
    color: Colors.white + '60',
  },
  generateButton: {
    marginTop: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  recommendationCard: {
    marginBottom: 30,
  },
  recommendationTitle: {
    marginBottom: 10,
  },
  recommendationComment: {
    color: Colors.white + '80',
    marginBottom: 20,
  },
  wardrobeItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 15,
  },
});

export default AIOutfitPlanaing;
