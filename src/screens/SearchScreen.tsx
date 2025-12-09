import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/icons/Icon';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [from, setFrom] = useState('Brussels');
  const [to, setTo] = useState('Ghent');
  const [date, setDate] = useState('Today');
  const [passengers, setPassengers] = useState(1);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSearch = () => {
    navigation.navigate('Result');
  };

  const passengerOptions = [1, 2, 3, 4];
  const dateOptions = ['Today', 'Tomorrow', 'This Week', 'Custom'];

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Animatable.View animation="fadeInDown" style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.title}>Plan Your Journey</Text>
          <Text style={styles.subtitle}>Find the perfect ride</Text>
        </Animatable.View>

        {/* Main Card */}
        <Animatable.View animation="fadeInUp" style={styles.card}>
          <LinearGradient
            colors={['#1E1E2E', '#2D2D44']}
            style={styles.cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* From Input */}
            <View style={styles.inputSection}>
              <View style={styles.inputLabelContainer}>
                <Icon name="map-marker-outline" size={20} color="#00DBDE" />
                <Text style={styles.inputLabel}>From</Text>
              </View>
              <View style={[
                styles.inputWrapper,
                focusedInput === 'from' && styles.inputFocused
              ]}>
                <TextInput
                  style={styles.input}
                  value={from}
                  onChangeText={setFrom}
                  onFocus={() => setFocusedInput('from')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Where from?"
                  placeholderTextColor="#8A8AA3"
                />
              </View>
            </View>

            {/* To Input */}
            <View style={styles.inputSection}>
              <View style={styles.inputLabelContainer}>
                <Icon name="flag-outline" size={20} color="#FC00FF" />
                <Text style={styles.inputLabel}>To</Text>
              </View>
              <View style={[
                styles.inputWrapper,
                focusedInput === 'to' && styles.inputFocused
              ]}>
                <TextInput
                  style={styles.input}
                  value={to}
                  onChangeText={setTo}
                  onFocus={() => setFocusedInput('to')}
                  onBlur={() => setFocusedInput(null)}
                  placeholder="Where to?"
                  placeholderTextColor="#8A8AA3"
                />
              </View>
            </View>

            {/* Divider with Swap Button */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <TouchableOpacity style={styles.swapButton}>
                <Icon name="swap-vertical" size={24} color="#FFF" />
              </TouchableOpacity>
              <View style={styles.divider} />
            </View>

            {/* Date Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="calendar" size={20} color="#FFF" />
                <Text style={styles.sectionTitle}>When</Text>
              </View>
              <View style={styles.chipContainer}>
                {dateOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.chip,
                      date === option && styles.chipActive
                    ]}
                    onPress={() => setDate(option)}
                  >
                    <Text style={[
                      styles.chipText,
                      date === option && styles.chipTextActive
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Passengers Selection */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Icon name="account-group" size={20} color="#FFF" />
                <Text style={styles.sectionTitle}>Passengers</Text>
              </View>
              <View style={styles.passengerContainer}>
                {passengerOptions.map((num) => (
                  <TouchableOpacity
                    key={num}
                    style={[
                      styles.passengerChip,
                      passengers === num && styles.passengerChipActive
                    ]}
                    onPress={() => setPassengers(num)}
                  >
                    <Icon
                      name="account"
                      size={20}
                      color={passengers === num ? '#FFF' : '#8A8AA3'}
                    />
                    <Text style={[
                      styles.passengerText,
                      passengers === num && styles.passengerTextActive
                    ]}>
                      {num}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </LinearGradient>
        </Animatable.View>

        {/* Quick Options */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.quickOptions}>
          <Text style={styles.quickOptionsTitle}>Quick Options</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity style={styles.quickOption}>
              <LinearGradient
                colors={['#00DBDE', '#FC00FF']}
                style={styles.quickOptionGradient}
              >
                <Icon name="briefcase-outline" size={24} color="#FFF" />
                <Text style={styles.quickOptionText}>Work</Text>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickOption}>
              <View style={[styles.quickOptionGradient, { backgroundColor: '#2D2D44' }]}>
                <Icon name="school-outline" size={24} color="#FFF" />
                <Text style={styles.quickOptionText}>Campus</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickOption}>
              <View style={[styles.quickOptionGradient, { backgroundColor: '#2D2D44' }]}>
                <Icon name="airplane-takeoff" size={24} color="#FFF" />
                <Text style={styles.quickOptionText}>Airport</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickOption}>
              <View style={[styles.quickOptionGradient, { backgroundColor: '#2D2D44' }]}>
                <Icon name="shopping-outline" size={24} color="#FFF" />
                <Text style={styles.quickOptionText}>Shopping</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </Animatable.View>

        {/* Search Button */}
        <Animatable.View animation="fadeInUp" delay={400}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <LinearGradient
              colors={['#00DBDE', '#FC00FF']}
              style={styles.searchButtonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Icon name="magnify" size={24} color="#FFF" />
              <Text style={styles.searchButtonText}>Find Rides</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
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
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8AA3',
  },
  card: {
    marginHorizontal: 24,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  cardGradient: {
    padding: 24,
    borderRadius: 30,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  inputLabel: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  inputWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: '#00DBDE',
    backgroundColor: 'rgba(0, 219, 222, 0.05)',
  },
  input: {
    color: '#FFF',
    fontSize: 18,
    paddingVertical: 16,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D44',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  chipActive: {
    backgroundColor: '#00DBDE',
  },
  chipText: {
    color: '#8A8AA3',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#FFF',
    fontWeight: '600',
  },
  passengerContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  passengerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  passengerChipActive: {
    backgroundColor: '#00DBDE',
  },
  passengerText: {
    color: '#8A8AA3',
    fontSize: 16,
    fontWeight: '600',
  },
  passengerTextActive: {
    color: '#FFF',
  },
  quickOptions: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  quickOptionsTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  quickOption: {
    marginRight: 16,
  },
  quickOptionGradient: {
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickOptionText: {
    color: '#FFF',
    marginTop: 8,
    fontSize: 12,
    fontWeight: '500',
  },
  searchButton: {
    marginHorizontal: 24,
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 40,
    shadowColor: '#00DBDE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  searchButtonGradient: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  searchButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});