import Container from '@/components/container';
import Header from '@/components/header';
import { Colors } from '@/utitlity/colors';
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetAnalytics } from '@/api/handlers';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: Colors.darkBackground,
  backgroundGradientTo: Colors.darkBackground,
  decimalPlaces: 0,
  color: (opacity = 1) => `${Colors.primary}AA`,
  labelColor: () => Colors.textSubOne,
  barPercentage: 0.7,
  propsForBackgroundLines: {
    stroke: 'transparent',
  },
};

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        const response = await GetAnalytics(userId);
        setAnalytics(response);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Container fullScreen style={{ backgroundColor: Colors.darkBackground }}>
        <Header route={{ name: 'Analytics' }} />
        <Text style={{ color: Colors.white, textAlign: 'center', marginTop: 40 }}>Loading...</Text>
      </Container>
    );
  }

  if (!analytics) {
    return (
      <Container fullScreen style={{ backgroundColor: Colors.darkBackground }}>
        <Header route={{ name: 'Analytics' }} />
        <Text style={{ color: Colors.white, textAlign: 'center', marginTop: 40 }}>No analytics data found.</Text>
      </Container>
    );
  }

  // Prepare chart data for outfit planning (last 7 days)
  const chartData = {
    labels: Array.from({ length: 7 }, (_, i) =>
      moment().subtract(6 - i, 'days').format('ddd')
    ),
    datasets: [{
      data: [
        ...(analytics.outfit_planning?.plans_last_7_days || [0, 0, 0, 0, 0, 0, 0])
      ]
    }],
  };

  return (
    <>
      <Header route={{ name: 'Analytics' }} />
      <Container
        fullScreen
        scrollEnabled
        style={{ backgroundColor: Colors.darkBackground }}>
        {/* Summary Cards */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Dresses</Text>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              {analytics.wardrobe_summary?.total_items ?? 0}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Virtual Styles</Text>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              {analytics.virtual_styling?.total_tryons ?? 0} Looks
            </Text>
          </View>
        </View>

        {/* Chart Section */}
        <Text style={styles.sectionTitle}>Last 7 Days Outfit Plans</Text>
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={chartConfig}
          style={styles.chart}
          fromZero
          yAxisLabel=""
          yAxisSuffix=" outfits"
          withInnerLines={false}
        />

        {/* Weekly and Monthly Summary in Column */}
        <View style={styles.columnSummary}>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>This Week</Text>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              {analytics.outfit_planning?.plans_this_week ?? 0} Outfits Planned
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>This Month</Text>
            <Text style={[styles.cardValue, { color: Colors.primary }]}>
              {analytics.outfit_planning?.plans_this_month ?? 0} Outfits Planned
            </Text>
          </View>
        </View>
      </Container>
    </>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 10,
  },
  card: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.lightCard,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.textSub,
    marginBottom: 6,
  },
  cardValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 16,
    color: Colors.subHeading,
  },
  chart: {
    borderRadius: 12,
  },
  columnSummary: {
    marginTop: 24,
    gap: 16,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 16,
    backgroundColor: Colors.lightCard,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
