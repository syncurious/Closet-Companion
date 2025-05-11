import Container from '@/components/container';
import Header from '@/components/header';
import {getData} from '@/service/firestoreHelper';
import {Colors} from '@/utitlity/colors';
import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import moment from 'moment';

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
  const [dressData, setDressData] = useState<any>([]);
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 7 }, (_, i) =>
      moment().subtract(6 - i, 'days').format('ddd')
    ),
    datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
  });
  const [thisWeekCount, setThisWeekCount] = useState(0);
  const [thisMonthCount, setThisMonthCount] = useState(0);

  const handleGetDresses = async () => {
    const response = await getData('dress');
    if (response?.success) {
      setDressData(response?.data);
      console.log('Get Dress', response);
    } else {
      console.log('Error Dress', response);
    }
  };

  const processChartData = () => {
    const weekData = [0, 0, 0, 0, 0, 0, 0];
    const labels = Array.from({ length: 7 }, (_, i) =>
      moment().subtract(6 - i, 'days').format('ddd')
    );
    let weekCount = 0;
    let monthCount = 0;

    dressData.forEach((item: any) => {
      const createdAt = moment(item.createdAt);
      const dayIndex = 6 - moment().diff(createdAt, 'days');
      if (dayIndex >= 0 && dayIndex < 7) {
        weekData[dayIndex]++;
        weekCount++;
      }
      if (createdAt.isSame(moment(), 'month')) {
        monthCount++;
      }
    });

    setChartData({
      labels,
      datasets: [{ data: weekData }],
    });
    setThisWeekCount(weekCount);
    setThisMonthCount(monthCount);
  };

  useEffect(() => {
    handleGetDresses();
  }, []);

  useEffect(() => {
    if (dressData.length > 0) {
      processChartData();
    }
  }, [dressData]);

  return (
    <>
      <Header route={{name: 'Analytics'}} />
      <Container
        fullScreen
        scrollEnabled
        style={{backgroundColor: Colors.darkBackground}}>
        {/* Summary Cards */}
        <View style={styles.row}>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Total Dresses</Text>
            <Text style={[styles.cardValue, {color: Colors.primary}]}>
              {dressData?.length}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Virtual Styles</Text>
            <Text style={[styles.cardValue, {color: Colors.primary}]}>
              0 Looks
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
            <Text style={[styles.cardValue, {color: Colors.primary}]}>
              {thisWeekCount} Outfits Planned
            </Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.cardLabel}>This Month</Text>
            <Text style={[styles.cardValue, {color: Colors.primary}]}>
              {thisMonthCount} Outfits Planned
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
    shadowOffset: {width: 0, height: 2},
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
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
});
