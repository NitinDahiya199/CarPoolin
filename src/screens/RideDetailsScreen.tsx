import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetails'>;

const RideDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const rideId = route.params?.rideId ?? '1';

  const ride = {
    id: rideId,
    departureTime: '16:30',
    arrivalTime: '17:20',
    from: 'Brussels Central Station',
    to: 'Ghent City Center',
    price: '21 €',
    driverName: 'Stephan',
    driverRating: 4.99,
    car: 'Audi A4 2022',
    carImage: 'https://images.unsplash.com/photo-1555212697-194d092e3b8f?w=800',
    seats: 4,
    features: ['WiFi', 'AC', 'Music', 'Charging'],
    distance: '57 km',
    duration: '50 min',
    estimatedArrival: '17:20',
  };

  const features = [
    { icon: 'wifi', label: 'Free WiFi', color: '#00DBDE' },
    { icon: 'snowflake', label: 'AC', color: '#00DBDE' },
    { icon: 'music', label: 'Music', color: '#FC00FF' },
    { icon: 'battery-charging', label: 'Charging', color: '#FC00FF' },
  ];

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ride Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Icon name="share-variant" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Car Image Card */}
        <Animatable.View animation="fadeInUp" style={styles.carCard}>
          <LinearGradient
            colors={['#2D2D44', '#3A3A55']}
            style={styles.carCardGradient}
          >
            <View style={styles.carHeader}>
              <View>
                <Text style={styles.carModel}>{ride.car}</Text>
                <View style={styles.carBadge}>
                  <Icon name="crown" size={14} color="#FFD700" />
                  <Text style={styles.carBadgeText}>Premium Ride</Text>
                </View>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.price}>{ride.price}</Text>
                <Text style={styles.priceLabel}>per seat</Text>
              </View>
            </View>
            
            <View style={styles.carImagePlaceholder}>
              <Icon name="car-sports" size={80} color="#FFF" />
              <View style={styles.carFeatures}>
                {features.map((feature, index) => (
                  <View key={index} style={styles.featureBadge}>
                    <Icon name={feature.icon} size={16} color={feature.color} />
                  </View>
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Journey Timeline */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.timelineCard}>
          <View style={styles.timelineHeader}>
            <Icon name="map-marker-path" size={24} color="#00DBDE" />
            <Text style={styles.timelineTitle}>Journey Timeline</Text>
          </View>
          
          <View style={styles.timeline}>
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotStart} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>{ride.departureTime}</Text>
                <Text style={styles.timelineLocation}>{ride.from}</Text>
              </View>
            </View>
            
            <View style={styles.timelineLine} />
            
            <View style={styles.timelineStats}>
              <View style={styles.stat}>
                <Icon name="road-variant" size={20} color="#8A8AA3" />
                <Text style={styles.statValue}>{ride.distance}</Text>
                <Text style={styles.statLabel}>Distance</Text>
              </View>
              <View style={styles.stat}>
                <Icon name="clock-outline" size={20} color="#8A8AA3" />
                <Text style={styles.statValue}>{ride.duration}</Text>
                <Text style={styles.statLabel}>Duration</Text>
              </View>
              <View style={styles.stat}>
                <Icon name="account-multiple" size={20} color="#8A8AA3" />
                <Text style={styles.statValue}>{ride.seats}</Text>
                <Text style={styles.statLabel}>Seats left</Text>
              </View>
            </View>
            
            <View style={styles.timelineLine} />
            
            <View style={styles.timelineItem}>
              <View style={styles.timelineDotEnd} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTime}>{ride.arrivalTime}</Text>
                <Text style={styles.timelineLocation}>{ride.to}</Text>
              </View>
            </View>
          </View>
        </Animatable.View>

        {/* Driver Info */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.driverCard}>
          <TouchableOpacity 
            style={styles.driverCardContent}
            onPress={() => navigation.navigate('Profile', { driverId: 'stephan' })}
            activeOpacity={0.8}
          >
            <View style={styles.driverInfo}>
              <View style={styles.driverAvatar}>
                <Text style={styles.driverInitial}>S</Text>
              </View>
              <View style={styles.driverDetails}>
                <Text style={styles.driverName}>{ride.driverName}</Text>
                <View style={styles.driverStats}>
                  <View style={styles.ratingContainer}>
                    <Icon name="star" size={16} color="#FFD700" />
                    <Text style={styles.rating}>{ride.driverRating}</Text>
                    <Text style={styles.reviews}>(347 reviews)</Text>
                  </View>
                  <View style={styles.verifiedBadge}>
                    <Icon name="check-decagram" size={16} color="#00DBDE" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                </View>
              </View>
            </View>
            <Icon name="chevron-right" size={24} color="#8A8AA3" />
          </TouchableOpacity>
        </Animatable.View>

        {/* Features */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.featuresCard}>
          <Text style={styles.featuresTitle}>Included Features</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: `${feature.color}20` }]}>
                  <Icon name={feature.icon} size={24} color={feature.color} />
                </View>
                <Text style={styles.featureLabel}>{feature.label}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* Action Buttons */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.actionsContainer}>
          <TouchableOpacity style={styles.secondaryButton}>
            <Icon name="heart-outline" size={24} color="#FC00FF" />
            <Text style={styles.secondaryButtonText}>Save Ride</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.primaryButton}>
            <LinearGradient
              colors={['#00DBDE', '#FC00FF']}
              style={styles.primaryButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="lock-open" size={24} color="#FFF" />
              <Text style={styles.primaryButtonText}>Book Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

export default RideDetailsScreen;

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
    paddingBottom: 30,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  shareButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  carCard: {
    marginHorizontal: 24,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  carCardGradient: {
    padding: 24,
    borderRadius: 25,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  carModel: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  carBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    gap: 6,
  },
  carBadgeText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: '600',
  },
  priceTag: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  priceLabel: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  carImagePlaceholder: {
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  carFeatures: {
    position: 'absolute',
    bottom: -12,
    flexDirection: 'row',
    gap: 8,
  },
  featureBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D44',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  timelineCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 24,
    marginBottom: 20,
  },
  timelineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  timelineTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  timeline: {
    alignItems: 'center',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  timelineDotStart: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00DBDE',
    marginRight: 16,
  },
  timelineDotEnd: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FC00FF',
    marginRight: 16,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTime: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  timelineLocation: {
    color: '#8A8AA3',
    fontSize: 14,
  },
  timelineLine: {
    width: 2,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: 8,
  },
  timelineStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  driverCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    marginBottom: 20,
    overflow: 'hidden',
  },
  driverCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  driverAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2D2D44',
    alignItems: 'center',
    justifyContent: 'center',
  },
  driverInitial: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  driverStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
  reviews: {
    color: '#8A8AA3',
    fontSize: 12,
    marginLeft: 4,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  verifiedText: {
    color: '#00DBDE',
    fontSize: 12,
    fontWeight: '600',
  },
  featuresCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 24,
    marginBottom: 20,
  },
  featuresTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  featureItem: {
    width: (width - 80) / 2,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    borderRadius: 25,
  },
  secondaryButtonText: {
    color: '#FC00FF',
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButton: {
    flex: 2,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#00DBDE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});