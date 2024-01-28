import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import { loadOnboardingCompleted } from './utils';
import AuthContext from './AuthContext';


export default function App({ navigation }) {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);
  const [contextFirstName, setContextFirstName] = React.useState(''); //React Context variable to hold first name
  const [contextLastName, setContextLastName] = React.useState(''); //React Context variable to hold last name

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userOnboardingCompleted = await loadOnboardingCompleted();
        setIsOnboardingCompleted(userOnboardingCompleted);
        console.log(`bootstrapAsync: isOnboardingCompleted set to`, userOnboardingCompleted, `based on AsyncStorage.`);

        if (isOnboardingCompleted) {
          try {
            const loadFirstName = async () => {
              try {
                const userFirstNameString = await AsyncStorage.getItem('userFirstName');
                if (userFirstNameString !== null) {
                  setContextFirstName(userFirstNameString);
                }
              } catch (e) {
                console.error(`Error loading first name from AsyncStorage into Context: `, e);
              }
            };

            const loadLastName = async () => {
              try {
                const userLastNameString = await AsyncStorage.getItem('userLastName');
                if (userLastNameString !== null) {
                  setContextLastName(userLastNameString);
                }
              } catch (e) {
                console.error(`Error loading last name from AsyncStorage into Context: `, e);
              }
            };

            await loadFirstName();
            await loadLastName();
          } catch (error) {
            console.error('Error loading data into context:', error);
          }
        }
      } catch (e) {
        console.error("Error while loading onboard status on App.js:", e);
      }
    };

    bootstrapAsync();
  }, [isOnboardingCompleted]);

  React.useEffect(() => {
    console.log(`Currently this is loaded into contextFirstName:`, contextFirstName);
  }, [contextFirstName]);

  React.useEffect(() => {
    console.log(`Currently this is loaded into contextLastName:`, contextLastName);
  }, [contextLastName]);



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
      updateFirstName: async (newFirstName) => {
        // Transfer first name data to AsyncStorage and Context
        await setContextFirstName(newFirstName);
        try {
          await AsyncStorage.setItem('userFirstName', newFirstName);
          console.log(`Context updateFirstName: AsyncStorage userFirstName updated to`,newFirstName);
        } catch (e) {
          console.error(`Error saving first name to AsyncStorage: `,e);
        }
      
      /*
        try {
          await AsyncStorage.setItem('userOnboarded', 'false');
          setIsOnboardingCompleted(false);
        } catch (e) {
          console.error(`signOut error setting userOnboarded in AsyncStorage on App.js: `, e);
        }
      */
      },


      updateLastName: async (newLastName) => {
        // Transfer last name data to AsyncStorage and Context
        await setContextLastName(newLastName);
        try {
          await AsyncStorage.setItem('userLastName', newLastName);
          console.log(`Context updateLastName: AsyncStorage userLastName updated to`,newLastName);
          } catch (e) {
          console.error(`Error saving first name to AsyncStorage: `,e);
          }
        
        /*
        try {
          await AsyncStorage.setItem('userOnboarded', 'false');
          setIsOnboardingCompleted(false);
        } catch (e) {
          console.error(`signOut error setting userOnboarded in AsyncStorage on App.js: `, e);
        }
        */
      },

    }),
    []
  );

  return (
    <AuthContext.Provider value={{ isOnboardingCompleted, contextFirstName, contextLastName, ...authContext }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}