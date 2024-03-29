import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigators/RootNavigator';
import { loadAvatarStoredStatus, loadOnboardingCompleted } from './utils';
import AuthContext from './AuthContext';


export default function App({ navigation }) {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = React.useState(false);
  const [contextFirstName, setContextFirstName] = React.useState(''); //React Context variable to hold first name
  const [contextLastName, setContextLastName] = React.useState(''); //React Context variable to hold last name
  const [avatarStored, setAvatarStored] = React.useState(false);

  // Checks AsyncStorage for onboarded status. If onboarded, loads first and last name into Context hook for use throughout app
  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const userAvatarStoredStatus = await loadAvatarStoredStatus();
        setAvatarStored(userAvatarStoredStatus);
        const userOnboardingCompleted = await loadOnboardingCompleted();
        setIsOnboardingCompleted(userOnboardingCompleted);
        //console.log(`bootstrapAsync: isOnboardingCompleted set to`, userOnboardingCompleted, `based on AsyncStorage.`);  //dev check

        if (isOnboardingCompleted) {
          try {
            const loadFirstName = async () => {
              try {
                const userFirstNameString = await AsyncStorage.getItem('userFirstName');
                if (userFirstNameString !== null) {
                  setContextFirstName(userFirstNameString);
                }
              } catch (e) {
                console.error(`App.js > loadFirstName. Error loading first name from AsyncStorage into Context: `, e);
              }
            };

            const loadLastName = async () => {
              try {
                const userLastNameString = await AsyncStorage.getItem('userLastName');
                if (userLastNameString !== null) {
                  setContextLastName(userLastNameString);
                }
              } catch (e) {
                console.error(`App.js > loadLastName. Error loading last name from AsyncStorage into Context: `, e);
              }
            };

            await loadFirstName();
            await loadLastName();
          } catch (error) {
            console.error('(App.js > bootstrapAsync. Error loading data into context:', error);
          }
        }
      } catch (e) {
        console.error("Error while loading onboard status on App.js:", e);
      } 
    };

    bootstrapAsync();
  }, [isOnboardingCompleted]);


  // The two useEffect hooks below are just development checks to confirm names are saved to Context. Commmenting out for now.
  // React.useEffect(() => {
  //   console.log(`App.js - useEffect. Currently this is loaded into contextFirstName:`, contextFirstName);
  // }, [contextFirstName]);


  // React.useEffect(() => {
  //   console.log(`App.js - useEffect. Currently this is loaded into contextLastName:`, contextLastName);
  // }, [contextLastName]);


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
          //console.log(`Apps.js > Context updateFirstName > AsyncStorage userFirstName updated to`,newFirstName);
        } catch (e) {
          console.error(`Error saving first name to AsyncStorage: `,e);
        }
      },
      updateLastName: async (newLastName) => {
        // Transfer last name data to AsyncStorage and Context
        await setContextLastName(newLastName);
        try {
          await AsyncStorage.setItem('userLastName', newLastName);
          //console.log(`Apps.js > Context updateLastName: > AsyncStorage userLastName updated to`,newLastName);
        } catch (e) {
          console.error(`Error saving first name to AsyncStorage: `,e);
        }
      },
      deleteFirstName: async () => {
        try {
          await AsyncStorage.removeItem('userFirstName');
          //console.log('Context deleteFirstName > userFirstName removed from AsyncStorage.');
          await setContextFirstName('');
        } catch (e) {
          console.error('Context > Error removing user first name from AsyncStorage: ', e);
        }
      },
      deleteLastName: async () => {
        try {
          await AsyncStorage.removeItem('userLastName');
          //console.log('Context deleteLastName > userLastName removed from AsyncStorage.');
          await setContextLastName('');
        } catch (e) {
          console.error('Context > Error removing user first name from AsyncStorage: ', e);
        }
      },
      avatarOn: async (data) => {
        // Turns on the avatar image in relevant elements
        try {
          await AsyncStorage.setItem('userAvatarStored', 'true');
          setAvatarStored(true);
        } catch (e) {
          console.error(`App.js > avatarOn error setting userAvatarStored in AsyncStorage: `, e);
        }
      },
      avatarOff: async (data) => {
        // Turns on the avatar image in relevant elements
        try {
          await AsyncStorage.setItem('userAvatarStored', 'false');
          setAvatarStored(false);
        } catch (e) {
          console.error(`App.js > avatarOn error setting userAvatarStored in AsyncStorage: `, e);
        }
      },
    }),
    []
  );

  
  return (
    <AuthContext.Provider value={{ isOnboardingCompleted, avatarStored, contextFirstName, contextLastName, ...authContext }}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}