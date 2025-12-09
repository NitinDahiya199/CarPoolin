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
import Icon from '../components/icons/Icon';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const driver = {
    name: 'Stephan',
    level: 'Pro Driver',
    rating: 4.99,
    reviews: 347,
    completedRides: 428,
    memberSince: '2022',
    verifiedId: true,
    drivingLicenseUploaded: true,
    about: "Hello! I'm Stephan, a professional driver with over 3 years of experience. I commute to Ghent weekly for work and I'm happy to share my ride with fellow travelers.",
    extra: "I'm passionate about music, especially jazz and classical. I enjoy trying new cuisines, with Chinese food being my favorite. I'm talkative and love meeting new people from different backgrounds.",
    languages: ['English', 'French', 'Dutch'],
    preferences: ['Music allowed', 'Conversation welcome', 'Pets allowed', 'Non-smoker'],
    car: {
      model: 'Audi A4 2022',
      color: 'White',
      comfort: 'Premium',
      features: ['Leather seats', 'Climate control', 'Premium sound', 'Sunroof'],
    },
  };

  const stats = [
    { label: 'Rating', value: driver.rating, icon: 'star', color: '#FFD700' },
    { label: 'Rides', value: driver.completedRides, icon: 'car', color: '#00DBDE' },
    { label: 'Years', value: new Date().getFullYear() - parseInt(driver.memberSince), icon: 'calendar', color: '#FC00FF' },
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
          <Text style={styles.headerTitle}>Driver Profile</Text>
          <TouchableOpacity style={styles.messageButton}>
            <Icon name="message-text" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Hero */}
        <Animatable.View animation="fadeInUp" style={styles.heroCard}>
          <LinearGradient
            colors={['#2D2D44', '#3A3A55']}
            style={styles.heroGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Avatar and Basic Info */}
            <View style={styles.heroContent}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={['#00DBDE', '#FC00FF']}
                  style={styles.avatarGradient}
                >
                  <Text style={styles.avatarText}>{driver.name.charAt(0)}</Text>
                </LinearGradient>
                <View style={styles.onlineIndicator} />
              </View>
              
              <View style={styles.basicInfo}>
                <Text style={styles.name}>{driver.name}</Text>
                <View style={styles.levelBadge}>
                  <Icon name="crown" size={16} color="#FFD700" />
                  <Text style={styles.levelText}>{driver.level}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Icon name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{driver.rating}</Text>
                  <Text style={styles.reviews}>({driver.reviews} reviews)</Text>
                </View>
              </View>
            </View>

            {/* Stats Row */}
            <View style={styles.statsRow}>
              {stats.map((stat, index) => (
                <View key={index} style={styles.statItem}>
                  <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                    <Icon name={stat.icon} size={20} color={stat.color} />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              ))}
            </View>

            {/* Verification Badges */}
            <View style={styles.verificationRow}>
              <View style={styles.verifiedBadge}>
                <Icon name="check-decagram" size={20} color="#00DBDE" />
                <Text style={styles.verifiedText}>ID Verified</Text>
              </View>
              <View style={styles.verifiedBadge}>
                <Icon name="license" size={20} color="#00DBDE" />
                <Text style={styles.verifiedText}>License Verified</Text>
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* About Section */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="account-circle" size={24} color="#00DBDE" />
            <Text style={styles.sectionTitle}>About {driver.name}</Text>
          </View>
          <Text style={styles.aboutText}>{driver.about}</Text>
          <Text style={[styles.aboutText, { marginTop: 12 }]}>{driver.extra}</Text>
        </Animatable.View>

        {/* Languages & Preferences */}
        <View style={styles.rowCards}>
          <Animatable.View animation="fadeInUp" delay={300} style={styles.smallCard}>
            <View style={styles.smallCardHeader}>
              <Icon name="translate" size={20} color="#FC00FF" />
              <Text style={styles.smallCardTitle}>Languages</Text>
            </View>
            <View style={styles.tagsContainer}>
              {driver.languages.map((lang, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{lang}</Text>
                </View>
              ))}
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" delay={400} style={styles.smallCard}>
            <View style={styles.smallCardHeader}>
              <Icon name="thumb-up" size={20} color="#00DBDE" />
              <Text style={styles.smallCardTitle}>Preferences</Text>
            </View>
            <View style={styles.tagsContainer}>
              {driver.preferences.map((pref, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{pref}</Text>
                </View>
              ))}
            </View>
          </Animatable.View>
        </View>

        {/* Car Info */}
        <Animatable.View animation="fadeInUp" delay={500} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="car-sports" size={24} color="#FC00FF" />
            <Text style={styles.sectionTitle}>Car Details</Text>
          </View>
          <View style={styles.carInfo}>
            <View style={styles.carDetail}>
              <Icon name="car-info" size={20} color="#8A8AA3" />
              <Text style={styles.carDetailText}>{driver.car.model}</Text>
            </View>
            <View style={styles.carDetail}>
              <Icon name="palette" size={20} color="#8A8AA3" />
              <Text style={styles.carDetailText}>{driver.car.color}</Text>
            </View>
            <View style={styles.carDetail}>
              <Icon name="sofa" size={20} color="#8A8AA3" />
              <Text style={styles.carDetailText}>{driver.car.comfort}</Text>
            </View>
          </View>
          <View style={styles.featuresGrid}>
            {driver.car.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Icon name="check-circle" size={16} color="#00DBDE" />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Animatable.View>

        {/* Reviews Preview */}
        <Animatable.View animation="fadeInUp" delay={600} style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="star-circle" size={24} color="#FFD700" />
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
          </View>
          <View style={styles.reviewItem}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewerName}>Sarah M.</Text>
              <View style={styles.reviewRating}>
                <Icon name="star" size={16} color="#FFD700" />
                <Text style={styles.reviewRatingText}>5.0</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>
              "Stephan is an excellent driver! Very professional and the car was spotless."
            </Text>
          </View>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All Reviews</Text>
            <Icon name="chevron-right" size={20} color="#00DBDE" />
          </TouchableOpacity>
        </Animatable.View>

        {/* Action Buttons */}
        <Animatable.View animation="fadeInUp" delay={700} style={styles.actionsContainer}>
          <TouchableOpacity style={styles.messageButtonLarge}>
            <Icon name="message-text" size={24} color="#FFF" />
            <Text style={styles.messageButtonText}>Message</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookButton}>
            <LinearGradient
              colors={['#00DBDE', '#FC00FF']}
              style={styles.bookButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="car" size={24} color="#FFF" />
              <Text style={styles.bookButtonText}>Book Ride</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

export default ProfileScreen;

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
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
  },
  messageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCard: {
    marginHorizontal: 24,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 20,
  },
  heroGradient: {
    padding: 24,
    borderRadius: 30,
  },
  heroContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '800',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#00FF00',
    borderWidth: 2,
    borderColor: '#2D2D44',
  },
  basicInfo: {
    flex: 1,
  },
  name: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  levelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 8,
  },
  levelText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '700',
  },
  reviews: {
    color: '#8A8AA3',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    color: '#8A8AA3',
    fontSize: 12,
  },
  verificationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 219, 222, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  verifiedText: {
    color: '#00DBDE',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionCard: {
    marginHorizontal: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 24,
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: '700',
  },
  aboutText: {
    color: '#E0E0E0',
    fontSize: 15,
    lineHeight: 22,
  },
  rowCards: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 16,
  },
  smallCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 20,
  },
  smallCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  smallCardTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '500',
  },
  carInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  carDetail: {
    alignItems: 'center',
    flex: 1,
  },
  carDetailText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '48%',
    marginBottom: 8,
  },
  featureText: {
    color: '#E0E0E0',
    fontSize: 14,
  },
  reviewItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewerName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewRatingText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewText: {
    color: '#E0E0E0',
    fontSize: 14,
    lineHeight: 20,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  viewAllText: {
    color: '#00DBDE',
    fontSize: 16,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 40,
    gap: 16,
  },
  messageButtonLarge: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 18,
    borderRadius: 25,
  },
  messageButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  bookButton: {
    flex: 2,
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#00DBDE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  bookButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 12,
  },
  bookButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});