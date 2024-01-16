import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false); //variable to hold the name of the initial route name
const [isLoading, setIsLoading] = useState(true);

  // Function to transfer device's user onboading completion status from AsyncStorage to a variable.
  // This is only done once when this component initially renders.
  useEffect(() => {
    const loadOnboardingCompleted = async () => {
    try {
      const userOnboardingCompleted = await AsyncStorage.getItem('userOnboarded');
      console.log('Variable data from Async Storage:', userOnboardingCompleted);
      if (userOnboardingCompleted === 'true') {
        console.log('userOnboardingCompleted = TRUE');
        setIsOnboardingCompleted(true);
      } else {
        console.log('userOnboardingCompleted = FALSE');
        setIsOnboardingCompleted(false);
      }
    } catch (e) {
      console.error(`Error loading user onboarding completed status: `, e);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
    loadOnboardingCompleted();
}, []);


if (isLoading) {
  // We haven't finished reading from AsyncStorage yet
  // return <SplashScreen />;
  return (
    <Stack.Navigator screenOptions={{
      orientation: 'portrait_up',
    }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
    </Stack.Navigator>
    );
  }
else {  
  return (
  <Stack.Navigator screenOptions={{
    orientation: 'portrait_up',
  }}>
    {isOnboardingCompleted ? (
      // Onboarding completed, user is signed in
      <>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      </>
    ) : (
      // User is NOT signed in
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    )}
  </Stack.Navigator>
  );
}}