import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const passengerOptions = [1, 2, 3, 4];

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [from, setFrom] = useState('Brussels');
  const [to, setTo] = useState('Ghent');
  const [date] = useState('Today');
  const [passengers, setPassengers] = useState(1);

  const handleSearch = () => {
    navigation.navigate('Result', {
      // you can pass filters here later
    } as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where are you going?</Text>

      <View style={styles.card}>
        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          value={from}
          onChangeText={setFrom}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>To</Text>
        <TextInput
          style={styles.input}
          value={to}
          onChangeText={setTo}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Date</Text>
        <Text style={styles.chip}>{date}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Passengers</Text>
        <View style={styles.passengerRow}>
          {passengerOptions.map(p => (
            <TouchableOpacity
              key={p}
              style={[
                styles.passengerChip,
                passengers === p && styles.passengerChipActive,
              ]}
              onPress={() => setPassengers(p)}
            >
              <Text
                style={[
                  styles.passengerText,
                  passengers === p && styles.passengerTextActive,
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    padding: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#e1f5ff',
    padding: 16,
    borderRadius: 24,
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  chip: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderColor: '#008CBA',
    borderWidth: 1,
    fontSize: 12,
  },
  passengerRow: {
    flexDirection: 'row',
    gap: 8,
  },
  passengerChip: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  passengerChipActive: {
    borderColor: '#008CBA',
    backgroundColor: '#008CBA',
  },
  passengerText: {
    fontSize: 13,
  },
  passengerTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  button: {
    marginTop: 16,
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
