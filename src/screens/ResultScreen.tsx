import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
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
};

const MOCK_RIDES: Ride[] = [
  { id: '1', time: '10:00', from: 'Brussels', to: 'Ghent', price: '25 €', driverName: 'Mark' },
  { id: '2', time: '12:00', from: 'Brussels', to: 'Ghent', price: '19 €', driverName: 'Jenny' },
  { id: '3', time: '16:30', from: 'Brussels', to: 'Ghent', price: '21 €', driverName: 'Stephan' },
];

const ResultScreen: React.FC<Props> = ({ navigation }) => {
  const renderItem = ({ item }: { item: Ride }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('RideDetails', { rideId: item.id })}
    >
      <View style={styles.row}>
        <Text style={styles.time}>{item.time}</Text>
        <Text style={styles.route}>
          {item.from} → {item.to}
        </Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <Text style={styles.driver}>Driver: {item.driverName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_RIDES}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  time: {
    width: 60,
    fontWeight: '600',
  },
  route: {
    flex: 1,
    fontSize: 14,
  },
  price: {
    fontWeight: '700',
  },
  driver: {
    fontSize: 12,
    color: '#777',
  },
});
