import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Auth'>;

const AuthScreen: React.FC<Props> = ({ navigation }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phone: '',
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStart = () => {
    navigation.navigate('Search');
  };

  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Header */}
          <Animatable.View animation="fadeInDown" style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Icon name="arrow-left" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isLogin ? 'Welcome Back' : 'Join Our Community'}
            </Text>
            <Text style={styles.headerSubtitle}>
              {isLogin ? 'Sign in to continue' : '100+ travels everyday!'}
            </Text>
          </Animatable.View>

          {/* Toggle Switch */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[styles.toggleButton, isLogin && styles.toggleActive]}
              onPress={() => setIsLogin(true)}
            >
              <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.toggleButton, !isLogin && styles.toggleActive]}
              onPress={() => setIsLogin(false)}
            >
              <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <Animatable.View animation="fadeInUp" style={styles.formContainer}>
            {!isLogin && (
              <>
                <View style={styles.nameRow}>
                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <Text style={styles.label}>First Name</Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedInput === 'name' && styles.inputFocused
                    ]}>
                      <Icon name="account-outline" size={20} color="#8A8AA3" />
                      <TextInput
                        style={styles.input}
                        placeholder="John"
                        placeholderTextColor="#8A8AA3"
                        value={formData.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        onFocus={() => setFocusedInput('name')}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </View>
                  </View>
                  
                  <View style={[styles.inputContainer, styles.halfInput]}>
                    <Text style={styles.label}>Last Name</Text>
                    <View style={[
                      styles.inputWrapper,
                      focusedInput === 'surname' && styles.inputFocused
                    ]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Doe"
                        placeholderTextColor="#8A8AA3"
                        value={formData.surname}
                        onChangeText={(text) => handleInputChange('surname', text)}
                        onFocus={() => setFocusedInput('surname')}
                        onBlur={() => setFocusedInput(null)}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone Number</Text>
                  <View style={[
                    styles.inputWrapper,
                    focusedInput === 'phone' && styles.inputFocused
                  ]}>
                    <Icon name="phone-outline" size={20} color="#8A8AA3" />
                    <TextInput
                      style={styles.input}
                      placeholder="+1 234 567 8900"
                      placeholderTextColor="#8A8AA3"
                      keyboardType="phone-pad"
                      value={formData.phone}
                      onChangeText={(text) => handleInputChange('phone', text)}
                      onFocus={() => setFocusedInput('phone')}
                      onBlur={() => setFocusedInput(null)}
                    />
                  </View>
                </View>
              </>
            )}

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address</Text>
              <View style={[
                styles.inputWrapper,
                focusedInput === 'email' && styles.inputFocused
              ]}>
                <Icon name="email-outline" size={20} color="#8A8AA3" />
                <TextInput
                  style={styles.input}
                  placeholder="hello@example.com"
                  placeholderTextColor="#8A8AA3"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange('email', text)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={[
                styles.inputWrapper,
                focusedInput === 'password' && styles.inputFocused
              ]}>
                <Icon name="lock-outline" size={20} color="#8A8AA3" />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#8A8AA3"
                  secureTextEntry
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                />
                <TouchableOpacity>
                  <Icon name="eye-outline" size={20} color="#8A8AA3" />
                </TouchableOpacity>
              </View>
            </View>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleStart}>
              <LinearGradient
                colors={['#00DBDE', '#FC00FF']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={styles.buttonText}>
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Text>
                <Icon name="arrow-right" size={20} color="#FFF" />
              </LinearGradient>
            </TouchableOpacity>

            {/* Social Login */}
            <View style={styles.socialContainer}>
              <Text style={styles.socialText}>Or continue with</Text>
              <View style={styles.socialButtons}>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="google" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="facebook" size={24} color="#FFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Icon name="apple" size={24} color="#FFF" />
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  header: {
    marginTop: 60,
    marginBottom: 40,
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
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8A8AA3',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 25,
    padding: 4,
    marginBottom: 40,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
  },
  toggleActive: {
    backgroundColor: '#2D2D44',
  },
  toggleText: {
    color: '#8A8AA3',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  formContainer: {
    marginBottom: 30,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  halfInput: {
    flex: 0.48,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
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
    flex: 1,
    color: '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#00DBDE',
    fontSize: 14,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 30,
    shadowColor: '#00DBDE',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  socialContainer: {
    alignItems: 'center',
  },
  socialText: {
    color: '#8A8AA3',
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});