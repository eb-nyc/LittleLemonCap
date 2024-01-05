import * as React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
      <Stack.Navigator initialRouteName="Onboarding">
          <Stack.Screen 
          name="Loyalty Club" 
          component={OnboardingScreen}
          />
          <Stack.Screen 
          name="Profile" 
          component={ProfileScreen}
          />
          <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          />
      </Stack.Navigator>
  );
}
