import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../components/icons/Icon';
import * as Animatable from 'react-native-animatable';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

const { width, height } = Dimensions.get('window');

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <LinearGradient
      colors={['#0F0F23', '#1A1A2E', '#16213E']}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0F0F23" />
      
      {/* Animated Background Elements */}
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        duration={3000}
        style={styles.orb1}
      />
      <Animatable.View 
        animation="pulse" 
        iterationCount="infinite" 
        duration={4000}
        style={styles.orb2}
      />
      
      <View style={styles.content}>
        {/* Animated Logo */}
        <Animatable.View 
          animation="bounceIn" 
          duration={1500}
          style={styles.logoContainer}
        >
          <LinearGradient
            colors={['#00DBDE', '#FC00FF']}
            style={styles.logoGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Icon name="car-multiple" size={60} color="#FFF" />
          </LinearGradient>
        </Animatable.View>
        
        <Animatable.View animation="fadeInUp" delay={500}>
          <Text style={styles.title}>CarPoolin</Text>
          <Text style={styles.subtitle}>Smart Rides, Smarter Savings</Text>
          
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Icon name="shield-check" size={20} color="#00DBDE" />
              <Text style={styles.featureText}>Verified Riders</Text>
            </View>
            <View style={styles.feature}>
              <Icon name="cash-fast" size={20} color="#00DBDE" />
              <Text style={styles.featureText}>Best Prices</Text>
            </View>
            <View style={styles.feature}>
              <Icon name="clock-fast" size={20} color="#00DBDE" />
              <Text style={styles.featureText}>Instant Booking</Text>
            </View>
          </View>
        </Animatable.View>
        
        <Animatable.View 
          animation="fadeInUp" 
          delay={800}
          style={styles.buttonContainer}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Auth')}
          >
            <LinearGradient
              colors={['#00DBDE', '#FC00FF']}
              style={styles.buttonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
              <Icon name="arrow-right" size={20} color="#FFF" style={styles.buttonIcon} />
            </LinearGradient>
          </TouchableOpacity>
          
          <Text style={styles.bottomText}>
            Already have an account?{' '}
            <Text 
              style={styles.loginText}
              onPress={() => navigation.navigate('Auth')}
            >
              Sign In
            </Text>
          </Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orb1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(0, 219, 222, 0.1)',
    top: -50,
    left: -50,
  },
  orb2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(252, 0, 255, 0.1)',
    bottom: -30,
    right: -30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 40,
    shadowColor: '#00DBDE',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 20,
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#8A8AA3',
    marginBottom: 40,
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 60,
  },
  feature: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: 16,
    width: width / 3.5,
  },
  featureText: {
    color: '#FFF',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
    marginBottom: 24,
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
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 10,
  },
  bottomText: {
    color: '#8A8AA3',
    textAlign: 'center',
    fontSize: 14,
  },
  loginText: {
    color: '#00DBDE',
    fontWeight: '600',
  },
});