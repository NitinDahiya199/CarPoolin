import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* You can replace this with an actual illustration later */}
      <View style={styles.illustration}>
        <Text style={styles.emoji}>🚗🌴</Text>
      </View>

      <Text style={styles.title}>CarPoolin</Text>
      <Text style={styles.subtitle}>Drive & Save Money</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Auth')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  illustration: {
    width: 200,
    height: 200,
    borderRadius: 24,
    backgroundColor: '#e1f5ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 72,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#008CBA',
    paddingHorizontal: 36,
    paddingVertical: 14,
    borderRadius: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
