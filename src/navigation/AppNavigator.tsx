// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import AuthScreen from '../screens/AuthScreen';
import SearchScreen from '../screens/SearchScreen';
import ResultScreen from '../screens/ResultScreen';
import RideDetailsScreen from '../screens/RideDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  Search: undefined;
  Result: undefined;
  RideDetails: { rideId: string } | undefined;
  Profile: { driverId: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={AuthScreen}
          options={{ title: 'Join CarPoolin' }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search Rides' }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Available Rides' }}
        />
        <Stack.Screen
          name="RideDetails"
          component={RideDetailsScreen}
          options={{ title: 'Ride Details' }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Driver Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
