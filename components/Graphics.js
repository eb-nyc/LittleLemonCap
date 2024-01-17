import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import * as Font from 'expo-font';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export const HeaderLogo = () => {
  return (
    <Image
      source={require('../assets/logo-horizontal-sm.png')}
      style={styles.headerLogo}
      resizeMode="contain"
      accessible={true}
      accessibilityLabel={'Little Lemon logo'}
    />
  );
};

export const NameAbbreviation = () => {
    const [fontLoaded, setFontLoaded] = useState(false);
    const [abbreviation, setAbbreviation] = useState('');
    const [avatarOnFile, setAvatarOnFile] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
    const navigation = useNavigation();
    const pressableProfileRef = useRef(); //Ref to store reference to current Pressable

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

    // function to load abbreviations from Async userFirstName and userLastName
    const fetchNames = async () => {
        try {
            // Retrieve userFirstName and userLastName from AsyncStorage
            const userFirstName = await AsyncStorage.getItem('userFirstName');
            const userLastName = await AsyncStorage.getItem('userLastName');

            // Extract the first letter of userFirstName and the first letter of userLastName
            const firstLetter = userFirstName ? userFirstName.charAt(0) : '?';
            const secondLetter = userLastName ? userLastName.charAt(0) : '?';

            // Combine the letters to form the two-letter abbreviation
            const abbreviationResult = firstLetter + secondLetter;

            // Update the state with the abbreviation
            setAbbreviation(abbreviationResult);
        } catch (error) {
            console.error('Error fetching data abbreviations from AsyncStorage:', error);
        };
    };

    // Use the useEffect hook to fetch abbreviations when the component mounts or when the fonts are loaded
    useEffect(() => {
        if (fontLoaded) {
            fetchNames();
        }
    }, [fontLoaded]);

  // Function to transfer device's user image from AsyncStorage to a variable.
  // This is only done once when this component initially renders.
  useEffect(() => {
    const loadUserAvatar = async () => {
    try {
      const userAvatarImage = await AsyncStorage.getItem('userImage');
      if (userAvatarImage !== null) {
        console.log('User image found in AsyncStorage.');
        setAvatarOnFile(true);
        setUserAvatar(userAvatarImage);
      } else {
        console.log('User image was NOT found in AsyncStorage.');
        setAvatarOnFile(false);
      }
    } catch (e) {
      console.error(`Error loading user image: `, e);
    }
  };
    loadUserAvatar();
}, []);


//Return the Text component with the abbreviation
if (avatarOnFile) {
    return (<View><Text>""</Text></View>);
} else if (abbreviation) {
    return (
        <Pressable 
        ref={pressableProfileRef}
        style={styles.abbreviationContainer}
        onPress={() => navigation.navigate('Profile')}
        >
            <Text style={styles.abbreviationKarla}>
                {abbreviation}
            </Text>
        </Pressable>
    ); 
} else {
    return (<View><Text>""</Text></View>);
};  
};

  
export const HeaderButtons = () => {
    const navigation = useNavigation();
    console.log('HeaderButtons component is rendering on Profile Page.');
    return (
        <View style={styles.headerRightContainer}>
            <NameAbbreviation />
            <Pressable onPress={() => navigation.navigate('Profile')}>
                <Image
                    source={require('../assets/shoppingbag-bw.png')}
                    style={styles.headerButton}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={'Shopping Bag'}
                />
            </Pressable>
        </View>
    );
  };
