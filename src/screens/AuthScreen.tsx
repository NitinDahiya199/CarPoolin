import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate('Search');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Join today to unlock</Text>
        <Text style={styles.subHeader}>100+ travels everyday!</Text>

        <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry />
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Surname" style={styles.input} />
        <TextInput placeholder="Phone Number" style={styles.input} keyboardType="phone-pad" />

        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6fbff',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 13,
    color: '#777',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
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
