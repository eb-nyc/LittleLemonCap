import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import { loadOnboardingCompleted } from './utils';
import AuthContext from './AuthContext';


export default function App({ navigation }) {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userOnboardingCompleted = await loadOnboardingCompleted();
        setIsOnboardingCompleted(userOnboardingCompleted);
        console.log(`isOnboardingCompleted set to`, userOnboardingCompleted,`based on AsyncStorage.`);
      } catch (e) {
        console.error("Error while loading onboard status on App.js:", e);
      }
    };
    bootstrapAsync();
  }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        // Sign-in logic
        try {
          await AsyncStorage.setItem('userOnboarded', 'true');
          setIsOnboardingCompleted(true);
        } catch (e) {
          console.error(`signIn error setting userOnboarded in AsyncStorage on App.js: `, e);
        }
      },
      signOut: async () => {
        // Sign-out logic
        try {
          await AsyncStorage.setItem('userOnboarded', 'false');
          setIsOnboardingCompleted(false);
        } catch (e) {
          console.error(`signOut error setting userOnboarded in AsyncStorage on App.js: `, e);
        }
      },
      signUp: async (data) => {
        // Sign-up logic
        try {
          await AsyncStorage.setItem('userOnboarded', 'true');
          setIsOnboardingCompleted(true);
        } catch (e) {
        console.error(`signUp error setting userOnboarded in AsyncStorage on App.js: `, e);
        }
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={{ isOnboardingCompleted, ...authContext }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}