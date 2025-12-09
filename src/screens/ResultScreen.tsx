import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

type Ride = {
  id: string;
  time: string;
  from: string;
  to: string;
  price: string;
  driverName: string;
  driverRating: number;
  carModel: string;
  seats: number;
  departureTime: string;
  arrivalTime: string;
  type: 'standard' | 'premium' | 'eco';
};

const MOCK_RIDES: Ride[] = [
  {
    id: '1',
    time: '10:00',
    from: 'Brussels',
    to: 'Ghent',
    price: '25 €',
    driverName: 'Mark',
    driverRating: 4.9,
    carModel: 'Tesla Model 3',
    seats: 3,
    departureTime: '10:00',
    arrivalTime: '11:00',
    type: 'premium',
  },
  {
    id: '2',
    time: '12:00',
    from: 'Brussels',
    to: 'Ghent',
    price: '19 €',
    driverName: 'Jenny',
    driverRating: 4.7,
    carModel: 'Toyota Prius',
    seats: 2,
    departureTime: '12:00',
    arrivalTime: '13:00',
    type: 'eco',
  },
  {
    id: '3',
    time: '16:30',
    from: 'Brussels',
    to: 'Ghent',
    price: '21 €',
    driverName: 'Stephan',
    driverRating: 4.99,
    carModel: 'Audi A4',
    seats: 4,
    departureTime: '16:30',
    arrivalTime: '17:20',
    type: 'standard',
  },
  {
    id: '4',
    time: '18:00',
    from: 'Brussels',
    to: 'Ghent',
    price: '23 €',
    driverName: 'Alex',
    driverRating: 4.8,
    carModel: 'BMW 3 Series',
    seats: 3,
    departureTime: '18:00',
    arrivalTime: '19:00',
    type: 'premium',
  },
];

const ResultScreen: React.FC<Props> = ({ navigation }) => {
  const getTypeColor = (type: Ride['type']) => {
    switch (type) {
      case 'premium': return '#FC00FF';
      case 'eco': return '#00DBDE';
      default: return '#8A8AA3';
    }
  };

  const getTypeIcon = (type: Ride['type']) => {
    switch (type) {
      case 'premium': return 'crown';
      case 'eco': return 'leaf';
      default: return 'car';
    }
  };

  const renderItem = ({ item, index }: { item: Ride; index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={styles.cardContainer}
    >
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
        activeOpacity={0.9}
      >
        <View style={styles.cardBackground}>
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
              <Icon name={getTypeIcon(item.type)} size={14} color="#FFF" />
              <Text style={styles.typeText}>
                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>{item.price}</Text>
              <Text style={styles.priceLabel}>per seat</Text>
            </View>
          </View>

          {/* Time and Route */}
          <View style={styles.timeRouteContainer}>
            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.departureTime}</Text>
              <Text style={styles.timeLabel}>Departure</Text>
            </View>
            
            <View style={styles.routeContainer}>
              <View style={styles.routeLine}>
                <View style={styles.dotStart} />
                <View style={styles.line} />
                <View style={styles.dotEnd} />
              </View>
              <View style={styles.routeTextContainer}>
                <Text style={styles.routeFrom}>{item.from}</Text>
                <Text style={styles.routeTo}>{item.to}</Text>
              </View>
            </View>

            <View style={styles.timeContainer}>
              <Text style={styles.time}>{item.arrivalTime}</Text>
              <Text style={styles.timeLabel}>Arrival</Text>
            </View>
          </View>

          {/* Driver Info */}
          <View style={styles.driverContainer}>
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitial}>
                  {item.driverName.charAt(0)}
                </Text>
              </View>
              <View>
                <Text style={styles.driverName}>{item.driverName}</Text>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={14} color="#FFD700" />
                  <Text style={styles.rating}>{item.driverRating}</Text>
                  <Text style={styles.carModel}>{item.carModel}</Text>
                </View>
              </View>
            </View>
            
            <View style={styles.seatsContainer}>
              <Icon name="account-multiple" size={16} color="#8A8AA3" />
              <Text style={styles.seatsText}>{item.seats} seats left</Text>
            </View>
          </View>

          {/* Card Footer */}
          <View style={styles.cardFooter}>
            <TouchableOpacity style={styles.footerButton}>
              <Icon name="heart-outline" size={20} color="#8A8AA3" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bookButton}>
              <Text style={styles.bookButtonText}>Book Now</Text>
              <Icon name="arrow-right" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Available Rides</Text>
          <Text style={styles.subtitle}>Brussels → Ghent • Today</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="filter-variant" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Stats Bar */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{MOCK_RIDES.length}</Text>
          <Text style={styles.statLabel}>Rides</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>25 €</Text>
          <Text style={styles.statLabel}>Avg. Price</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>4.8</Text>
          <Text style={styles.statLabel}>Avg. Rating</Text>
        </View>
      </View>

      {/* Rides List */}
      <FlatList
        data={MOCK_RIDES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#8A8AA3',
    textAlign: 'center',
    marginTop: 4,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    marginHorizontal: 24,
    borderRadius: 15,
    paddingVertical: 16,
    marginBottom: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  statLabel: {
    color: '#8A8AA3',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  cardBackground: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 6,
  },
  typeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
  },
  priceLabel: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  timeRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  timeContainer: {
    alignItems: 'center',
    width: 60,
  },
  time: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  timeLabel: {
    color: '#8A8AA3',
    fontSize: 12,
    marginTop: 4,
  },
  routeContainer: {
    flex: 1,
    alignItems: 'center',
  },
  routeLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#00DBDE',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dotEnd: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FC00FF',
  },
  routeTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  routeFrom: {
    color: '#00DBDE',
    fontSize: 14,
    fontWeight: '600',
  },
  routeTo: {
    color: '#FC00FF',
    fontSize: 14,
    fontWeight: '600',
  },
  driverContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  driverAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2D2D44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInitial: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  driverName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  carModel: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  seatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  seatsText: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#00DBDE',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});