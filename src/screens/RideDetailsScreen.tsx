import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'RideDetails'>;

const RideDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const rideId = route.params?.rideId ?? '1';

  // In real app, you’d fetch ride details by rideId
  const ride = {
    id: rideId,
    timeFrom: '16:30',
    timeTo: '17:20',
    from: 'Brussels',
    to: 'Ghent',
    price: '21 €',
    driverName: 'Stephan',
    car: 'Big White Car',
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.timeLine}>
          {ride.timeFrom} {ride.from}
        </Text>
        <Text style={styles.timeLine}>
          {ride.timeTo} {ride.to}
        </Text>

        <View style={styles.section}>
          <Text style={styles.label}>Driver</Text>
          <Text style={styles.value}>{ride.driverName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Car</Text>
          <Text style={styles.value}>{ride.car}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Price</Text>
          <Text style={styles.price}>{ride.price}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Profile', { driverId: 'stephan' })}
      >
        <Text style={styles.primaryButtonText}>View Driver Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: '#34c759', marginTop: 8 }]}
        onPress={() => navigation.navigate('Result')}
      >
        <Text style={styles.primaryButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RideDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    padding: 24,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  timeLine: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  section: {
    marginTop: 12,
  },
  label: {
    fontSize: 12,
    color: '#777',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
