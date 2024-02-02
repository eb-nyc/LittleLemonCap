import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Pressable, Image, Alert } from 'react-native';
import * as Font from 'expo-font';
import styles from '../styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {loadUserAvatar} from '../screens/ProfileScreen';
import AuthContext from '../AuthContext';

/*
import AuthContext from '../AuthContext';
const { contextFirstName, contextLastName, avatarStored } = React.useContext(AuthContext); //Context hook variable for routing
*/

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
    const { contextFirstName, contextLastName, avatarStored } = React.useContext(AuthContext); //Context hook variable for routing


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

    // function to load abbreviations from Async userFirstName and userLastName
    const fetchNames = () => {
        let userFirstName = contextFirstName;
        let userLastName = contextLastName;
        const firstLetter = userFirstName ? userFirstName.charAt(0) : null;
        const secondLetter = userLastName ? userLastName.charAt(0) : null;

        // Combine the letters to form the two-letter abbreviation
        const abbreviationResult = firstLetter + secondLetter;

        // Update the state with the abbreviation
        setAbbreviation(abbreviationResult);
    };

    // Use the useEffect hook to fetch abbreviations when the component mounts or when the fonts are loaded
    useEffect(() => {
        if (fontLoaded) {
            fetchNames();
        }
    }, [fontLoaded, contextFirstName, contextLastName]);

  // Function to transfer device's user image from AsyncStorage to a variable.
  // This is only done once when this component initially renders.
  useEffect(() => {
    loadUserAvatar;
}, []);


//Return the Text component with the abbreviation
if (avatarStored) {
    return (
        <Pressable 
        ref={pressableProfileRef}
        style={styles.headerIconContainerContainer}
        onPress={() => navigation.navigate('Profile')}
        >
            <Image
                style={styles.headerAvatarContainer}
                source={require('../assets/profile-image.png')}
                accessible={true}
                accessibilityLabel={'Placeholder for the avatar image of the user.'}
            />
        </Pressable>
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
    const navigation = useNavigation();
    return (
        <View style={styles.headerRightContainer}>
            <Pressable style ={styles.editProfileKarla} onPress={() => navigation.navigate('Profile')}>
                <Text style ={styles.editProfileKarla}>
                    Edit{'\n'}Profile
                </Text>
            </Pressable>
            <NameAbbreviation />
            <Pressable onPress={infoShopping}>
                <Image
                    source={require('../assets/shoppingbag-bw.png')}
                    style={styles.headerButton}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={'Shopping Bag'}
                />
            </Pressable>
            {/*
            <Pressable onPress={infoShopping}>
                <Image
                    source={require('../assets/shoppingbag-bw.png')}
                    style={styles.headerButton}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={'Shopping Bag'}
                />
            </Pressable>
            */}
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

  const infoShopping = () => {
    Alert.alert(
      "Placeholder Only",
      "In a full app, this would link to the user's shopping cart and display current order information.",
      [{ text: "Ok"}]
    );
  };

