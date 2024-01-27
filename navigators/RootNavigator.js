import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {HeaderBackButton} from "@react-navigation/elements";
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SplashScreen from '../screens/SplashScreen';
import { HeaderLogo, HeaderButtons, LogoBackButton } from '../components/Graphics';
import { loadOnboardingCompleted } from '../utils';
import * as Font from 'expo-font';
import AuthContext from '../AuthContext';


const Stack = createNativeStackNavigator();

export default function RootNavigator() {
const { isOnboardingCompleted } = React.useContext(AuthContext); //Context hook variable for routing
const [isLoading, setIsLoading] = useState(true);
const [fontLoaded, setFontLoaded] = useState(false);

    // Function to load up the necessary fonts
    useEffect(() => {
      async function loadFont() {
          await Font.loadAsync({
          'MarkaziText': require ('../assets/fonts/MarkaziText-var.ttf'),
          'Karla': require('../assets/fonts/Karla-var.ttf'),
          });
          setFontLoaded(true);
      };
      loadFont();
  }, []);


  // Function to transfer device's user onboading completion status from AsyncStorage to a variable.
  // This is only done once when this component initially renders.
  useEffect(() => {
    const loadOnboarding = async () => {
      try {
        const userOnboardingCompleted = await loadOnboardingCompleted();
        console.log(`loadingOnboarding: isOnboardingCompleted set to`, isOnboardingCompleted,`based on AsyncStorage.`);
      } catch (e) {
        console.error("Error loading onboarding status:", e);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    loadOnboarding();
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
  } else {  
  return (
    <Stack.Navigator screenOptions={{
      orientation: 'portrait-up',
      headerBackTitleVisible: false,
      headerTitle: "",
      headerLeft: () => <HeaderBackButton 
        labelVisible={false} 
        backImage={() => <LogoBackButton />} />,
      // headerRight: () => <HeaderButtons />,
    }}>
      {isOnboardingCompleted ? (
        // Onboarding completed, user is signed in
        <>
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            headerLeft: () => <HeaderLogo />,
            headerRight: () => <HeaderButtons />,
          }}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          options={{
            headerRight: () => <HeaderButtons />, 
          }}       
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