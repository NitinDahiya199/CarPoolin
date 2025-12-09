import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const driver = {
    name: 'Stephan',
    level: 'Pro',
    rating: 4.99,
    reviews: 347,
    verifiedId: true,
    drivingLicenseUploaded: true,
    about:
      "Hello! My name is Stephan, I drive for work to Ghent weekly so I'm happy for anyone to join me.",
    extra:
      'I like music and Chinese food. I’m talkative and love meeting new people.',
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerCard}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <Text style={styles.name}>{driver.name}</Text>
        <Text style={styles.level}>Level: {driver.level}</Text>
        <Text style={styles.rating}>
          Rating: {driver.rating} ⭐ ({driver.reviews} reviews)
        </Text>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoItem}>
          {driver.verifiedId ? '✅ ID verified' : '❌ ID not verified'}
        </Text>
        <Text style={styles.infoItem}>
          {driver.drivingLicenseUploaded
            ? '✅ Driving license uploaded'
            : '❌ Driving license missing'}
        </Text>
      </View>

      <View style={styles.aboutCard}>
        <Text style={styles.sectionTitle}>Meet Stephan!</Text>
        <Text style={styles.aboutText}>{driver.about}</Text>
        <Text style={[styles.aboutText, { marginTop: 8 }]}>{driver.extra}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back to Ride</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    padding: 24,
  },
  headerCard: {
    backgroundColor: '#e1f5ff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#008CBA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
  },
  level: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  rating: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  infoItem: {
    fontSize: 14,
    marginBottom: 4,
  },
  aboutCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#008CBA',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
