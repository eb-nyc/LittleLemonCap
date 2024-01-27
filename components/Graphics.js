import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import * as Font from 'expo-font';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {loadUserAvatar} from '../screens/ProfileScreen';

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
        let userFirstName;
        let userLastName;
        try {
            // Retrieve userFirstName and userLastName from AsyncStorage
            userFirstName = await AsyncStorage.getItem('userFirstName');
            userLastName = await AsyncStorage.getItem('userLastName');
        } catch (error) {
            console.error('Error fetching data abbreviations from AsyncStorage:', error);
        } finally {
            // Extract the first letter of userFirstName and the first letter of userLastName
            const firstLetter = userFirstName ? userFirstName.charAt(0) : '?';
            const secondLetter = userLastName ? userLastName.charAt(0) : '?';

            // Combine the letters to form the two-letter abbreviation
            const abbreviationResult = firstLetter + secondLetter;

            // Update the state with the abbreviation
            setAbbreviation(abbreviationResult);
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
    loadUserAvatar;
}, []);


//Return the Text component with the abbreviation
if (userAvatar) {
    return (
        <View style={styles.headerIconContainer}>
            <Image
                source={{ uri: userAvatar }}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel={'Avatar image of you!'}
            />
        </View>
    );
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
    return (
        <View style={styles.headerRightContainer}>
            <NameAbbreviation />
            <Image
                source={require('../assets/shoppingbag-bw.png')}
                style={styles.headerButton}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel={'Shopping Bag'}
            />
        </View>
    );
  };

  export const LogoBackButton = () => {
    const navigation = useNavigation();
    return (
//        <View style={styles.headerRightContainer}>
            <Pressable onPress={navigation.goBack}>
                <Image
                    source={require('../assets/logo-backbutton.png')}
                    style={styles.logoBackButton}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={'Back Button'}
                />
            </Pressable>
//        </View>
    );
  };
