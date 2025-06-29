import React from 'react';
import Heading from '../../heading';
import {Image, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {dress} from '../../../assets';
import Dimension from '../../../utitlity/Dimension';
import {Colors} from '../../../utitlity/colors';
import moment from 'moment';

interface Props {
  onPress?: () => void;
  data?: {
    plan_id: string;
    plan_name: string;
    created_at: string;
    occasion: string;
    items: string[];
    type: string;
    user_id: string;
    item_details: any[];
    image?: string;
  };
}

function PlansCard(props: Props) {
  const {data} = props;

  const formatDate = (dateString: string) => {
    return moment(dateString).format('MMM DD, YYYY');
  };

  const getPlanTypeLabel = (type: string) => {
    switch (type) {
      case 'user_created':
        return 'Custom Plan';
      case 'ai_generated':
        return 'AI Generated';
      default:
        return 'Plan';
    }
  };

  const getItemCount = (items: string[]) => {
    if (!items || items.length === 0) return 0;
    try {
      const parsedItems = typeof items[0] === 'string' ? JSON.parse(items[0]) : items;
      return parsedItems.length;
    } catch {
      return items.length;
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <View style={[{flexDirection: 'row'}, styles.imageWrapper]}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={data?.image ? {uri: data?.image} : dress}
            resizeMode="cover"
          />
        </View>
        <View
          style={[
            {
              height: '100%',
              width: 2,
              backgroundColor: Colors.white + '30',
            },
          ]}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={data?.image ? {uri: data?.image} : dress}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.headerRow}>
          <Heading level={3} style={styles.planName}>
            {data?.plan_name || ''}
          </Heading>
          {data?.type && (
            <View style={styles.typeBadge}>
              <Text style={styles.typeText}>
                {getPlanTypeLabel(data.type)}
              </Text>
            </View>
          )}
        </View>
        <Heading level={5} style={styles.categoryText}>
          {data?.occasion || ''}
        </Heading>
        <View style={styles.detailsRow}>
          {data?.created_at && (
            <Text style={styles.dateText}>
              Created: {formatDate(data.created_at)}
            </Text>
          )}
          {data?.items && (
            <Text style={styles.itemCountText}>
              {getItemCount(data.items)} items
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default PlansCard;

const styles = StyleSheet.create({
  cardContainer: {
    overflow: 'hidden',
    width: Dimension.width - 32,
    borderWidth: 2,
    backgroundColor: Colors.white + '15',
    borderColor: Colors.white + '20',
    borderRadius: 10,
  },
  imageContainer: {
    height: 150,
    width: ((Dimension.width - 32) / 100) * 49.5,
    backgroundColor: Colors.white + '10',
  },
  imageWrapper: {
    overflow: 'hidden',
    borderRadius: 10,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    padding: 10,
    gap: 5,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  planName: {
    flex: 1,
  },
  typeBadge: {
    backgroundColor: Colors.white + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.white + '30',
  },
  typeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '600',
  },
  categoryText: {
    color: Colors.white + '85',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  dateText: {
    color: Colors.white + '60',
    fontSize: 12,
  },
  itemCountText: {
    color: Colors.white + '70',
    fontSize: 12,
    fontWeight: '500',
  },
});
