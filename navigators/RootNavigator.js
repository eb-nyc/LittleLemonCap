import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HeaderBackButton} from "@react-navigation/elements";
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderLogo, HeaderButtons, LogoBackButton } from '../components/Graphics';
import * as Font from 'expo-font';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false); //variable to hold the name of the initial route name
const [isLoading, setIsLoading] = useState(true);
const [fontLoaded, setFontLoaded] = useState(false);

    // Function to load up the necessary fonts
    useEffect(() => {
      async function loadFont() {
          await Font.loadAsync({
          'MarkaziText': require ('../assets/fonts/MarkaziText.ttf'),
          'Karla': require('../assets/fonts/Karla.ttf'),
          });
          setFontLoaded(true);
      };
      loadFont();
  }, []);


  // Function to transfer device's user onboading completion status from AsyncStorage to a variable.
  // This is only done once when this component initially renders.
  useEffect(() => {
    const loadOnboardingCompleted = async () => {
    try {
      const userOnboardingCompleted = await AsyncStorage.getItem('userOnboarded');
      if (userOnboardingCompleted === 'true') {
        console.log('userOnboarded = TRUE');
        setIsOnboardingCompleted(true);
      } else {
        console.log('userOnboarded = FALSE');
        setIsOnboardingCompleted(false);
      }
    } catch (e) {
      console.error(`Error loading user onboarding completed status: `,e);
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
      headerShown: false,
    }}>
        <Stack.Screen name="Splash Screen" component={SplashScreen} />
    </Stack.Navigator>
    );
  }
else {  
  return (
  <Stack.Navigator screenOptions={{
    orientation: 'portrait-up',
    headerBackTitleVisible: false,
    headerTitle: "",
    headerLeft: () => <HeaderBackButton 
      labelVisible={false} 
      backImage={() => <LogoBackButton />} />,
    headerRight: () => <HeaderButtons />,
  }}>
    {isOnboardingCompleted ? (
      // Onboarding completed, user is signed in
      <>
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerLeft: () => <HeaderLogo />,
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
      />
      </>
    ) : (
      // User is NOT signed in
      <Stack.Screen 
        name="Onboarding" 
        component={OnboardingScreen} 
        options={{
          headerLeft: () => <HeaderLogo />,
        }}
      />
    )}
  </Stack.Navigator>
  );
}}