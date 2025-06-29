import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, RefreshControl, TouchableOpacity } from 'react-native';
import Header from '../../../components/header';
import Container from '../../../components/container';
import { Colors } from '../../../utitlity/colors';
import PlansCard from '@/components/card/PlanCard';
import Input from '@/components/input';
import { SearchIcon } from '@/assets';
import { GetOutfitPlan } from '@/api/handlers';
import Loader from '@/components/loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface OutfitPlan {
  plan_id: string;
  plan_name: string;
  created_at: string;
  occasion: string;
  items: string[];
  type: string;
  user_id: string;
  item_details: any[];
}

interface OutfitPlansResponse {
  user_id: string;
  plans_count: number;
  plans: OutfitPlan[];
}

const Outfit = ({ route }: any) => {
  const [plans, setPlans] = useState<OutfitPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const getUserId = async () => {
    const id = await AsyncStorage.getItem('userId');
    setUserId(id);
  };

  const fetchOutfitPlans = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const response = await GetOutfitPlan(userId) as OutfitPlansResponse;
      setPlans(response.plans || []);
    } catch (error) {
      console.error('Error fetching outfit plans:', error);
      setError('Failed to load outfit plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchOutfitPlans();
    setRefreshing(false);
  };

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOutfitPlans();
    }
  }, [userId]);

  const filteredPlans = plans.filter(plan =>
    plan.plan_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.occasion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Loader />
        </View>
      );
    }

    if (error) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: Colors.white, fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
            {error}
          </Text>
          <TouchableOpacity
            onPress={fetchOutfitPlans}
            style={{
              backgroundColor: Colors.white + '20',
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderRadius: 8,
            }}>
            <Text style={{ color: Colors.white, fontSize: 14 }}>Retry</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (filteredPlans.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
          <Text style={{ color: Colors.white, fontSize: 16, textAlign: 'center' }}>
            {searchQuery ? 'No plans found matching your search' : 'No outfit plans found'}
          </Text>
          {!searchQuery && (
            <Text style={{ color: Colors.white + '70', fontSize: 14, textAlign: 'center', marginTop: 5 }}>
              Create your first outfit plan to get started
            </Text>
          )}
        </View>
      );
    }

    return (
      <View style={{ gap: 15, paddingVertical: 10 }}>
        {filteredPlans.map((plan, index) => (
          <PlansCard
            key={plan.plan_id}
            data={plan}
          />
        ))}
      </View>
    );
  };

  return (
    <React.Fragment>
      <Header route={route} />
      <View style={{ flex: 1, backgroundColor: Colors.black }}>
        {/* Sticky Search Bar */}
        <View style={{
          backgroundColor: Colors.black,
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: Colors.white + '20',
        }}>
          <Input
            label="Search Dresses"
            iconStyle={{ tintColor: Colors.white }}
            prefixIcon={SearchIcon}
            style={{ borderRadius: 100 }}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {!loading && !error && plans.length > 0 && (
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Colors.white + '70', fontSize: 14 }}>
                {searchQuery
                  ? `Found ${filteredPlans.length} plan${filteredPlans.length !== 1 ? 's' : ''}`
                  : `${plans.length} outfit plan${plans.length !== 1 ? 's' : ''}`
                }
              </Text>
            </View>
          )}
        </View>

        {/* Scrollable Content */}
        <Container
          fullScreen
          scrollEnabled={true}
          showsVerticalScrollIndicator={true}
          refreshControl={true}
          onRefresh={onRefresh}
          refreshing={refreshing}
          style={{ backgroundColor: Colors.black, flex: 1 }}>
          {renderContent()}
        </Container>
      </View>
    </React.Fragment>
  );
};

export default Outfit;
