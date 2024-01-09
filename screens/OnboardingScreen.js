import React, { useState, useEffect, useRef } from 'react';
import {View, KeyboardAvoidingView, Text, TextInput, Image, Pressable, Alert, Platform, SafeAreaView, ScrollView} from 'react-native';
import { validateEmail, validateName } from '../utils';
import styles from '../styles/styles';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({navigation}) {

// GENERAL SCREEN VARIABLES
  const pressableInputRef = useRef(); //Ref to store reference to current Pressable
  const [fontLoaded, setFontLoaded] = useState(false);
// ALL VARIABLES RELATED TO THE EMAIL ADDRESS
  const [email, onChangeEmail] = useState(''); //variable state = email text string submitted by user into TextInput
  const [subscribed, setSubscribed] = useState(false);  //variable state = if user has already submitted valid email
  const [validEmail, setValidEmail] = useState(false); //variable state = if text in input field is a valid format per validateEmail function
  const emailInputRef = useRef();   //Ref to store reference to TextInput component
  const [displayEmail, setDisplayEmail] = useState('');
// ALL VARIABLES RELATED TO THE FIRST NAME
  const [firstName, onChangeFirstName] = useState(''); //variable state = email text string submitted by user into TextInput
  const [validFirstName, setValidFirstName] = useState(false); //variable state = if text in input field is a valid format per validateName function
  const firstNameInputRef = useRef();   //Ref to store reference to TextInput component
  const [displayFirstName, setDisplayFirstName] = useState('');
// ALL VARIABLES RELATED TO THE LAST NAME
  const [lastName, onChangeLastName] = useState(''); //variable state = email text string submitted by user into TextInput
  const [validLastName, setValidLastName] = useState(false); //variable state = if text in input field is a valid format per validateName function
  const lastNameInputRef = useRef();   //Ref to store reference to TextInput component
  const [displayLastName, setDisplayLastName] = useState('');


  // Function to transfer device's userprofile data from AsyncStorage to userprofile variable, if any exists.
  // This is only done once when this component initially renders.
  const loadUserEmail = async () => {
    try {
      const userEmailString = await AsyncStorage.getItem('userEmail');
      if (userEmailString !== null) {
        onChangeEmail(userEmailString);
        setDisplayEmail(userEmailString);
        setValidEmail(true);
      }
    } catch (e) {
      console.error(`Error loading user profile: `, e);
    }
  };
  useEffect(() => {
    loadUserEmail();
}, []);


  // Function to transfer device's userFirstName data from AsyncStorage to firstName variable, if any exists.
  // This is only done once when this component initially renders.
  const loadFirstName = async () => {
    try {
      const userFirstNameString = await AsyncStorage.getItem('userFirstName');
      if (userFirstNameString !== null) {
        onChangeFirstName(userFirstNameString);
        setDisplayFirstName(userFirstNameString);
        setValidFirstName(true);
      }
    } catch (e) {
      console.error(`Error loading first name from AsyncStorage: `, e);
    }
  };
  useEffect(() => {
    loadFirstName();
  }, []);


  // Function to transfer device's userLastName data from AsyncStorage to lastName variable, if any exists.
  // This is only done once when this component first renders.
  const loadLastName = async () => {
    try {
      const userLastNameString = await AsyncStorage.getItem('userLastName');
      if (userLastNameString !== null) {
        onChangeLastName(userLastNameString);
        setDisplayLastName(userLastNameString);
        setValidLastName(true);
      }
    } catch (e) {
      console.error(`Error loading last name from AsyncStorage: `, e);
    }
  };
  useEffect(() => {
    loadLastName();
  }, []);


  // Function to save new user-provided email to the user profile array saved to AsyncStorage
const saveUserEmail = async () => {
    try {
    await AsyncStorage.setItem('userEmail', email);
    } catch (e) {
    console.error(`Error saving user profile: `,e);
    }
};

  // Function to save new user-provided first name to the user profile array saved to AsyncStorage
  const saveFirstName = async () => {
    try {
    await AsyncStorage.setItem('userFirstName', firstName);
    } catch (e) {
    console.error(`Error saving first name to AsyncStorage: `,e);
    }
  };

  // Function to save new user-provided last name to the user profile array saved to AsyncStorage
  const saveLastName = async () => {
    try {
    await AsyncStorage.setItem('userLastName', lastName);
    } catch (e) {
    console.error(`Error saving last name to AsyncStorage: `,e);
    }
  };


  // Function to load up the necessary fonts
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'MarkaziText': require ('../assets/fonts/MarkaziText.ttf'),
        'Karla': require('../assets/fonts/Karla.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);
  if (!fontLoaded) {
    return null; // or a I can insert a loading indicator graphic here
  }


  // function to remove the keyboard - used when valid email address is submitted
  const dismissKeyboard = () => {
    emailInputRef.current.blur(); 
  };

  // function to alert/prompt user to enter an email address with an acceptable format
  const handleInvalidEmail = () => {
    Alert.alert('Please provide a valid email address'); 
  };

  // function to alert user that the submitted information has been accepted
  const handleNewSubscription = () => {
//    Alert.alert(`Welcome to the Club!`); 
    setSubscribed(true); 
    dismissKeyboard(); 
    saveUserEmail();
    navigation.navigate('Profile');
    //onChangeEmail(''); 
    };

  // function to alert user that their email address as been updated with the submitted email
  const handleEmailUpdate = () => {
//    Alert.alert(`Thank you\nYour info has been updated.`); 
    setSubscribed(true); 
    dismissKeyboard(); 
    saveUserEmail();
    navigation.navigate('Profile');
    //onChangeEmail(''); 
    }

  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid email (validEmail) and if an email was already provided (subscribed).
  const processEmailSubmission = () => {
    {(!validEmail && !subscribed) && (
      handleInvalidEmail() )}
    {(validEmail && !subscribed) && ( 
      handleNewSubscription() )}
    {((!validEmail || email == '' || email == null) && subscribed) && (
      handleInvalidEmail() )}
    {(validEmail && !(email == '' || email == null) && subscribed) && ( 
      handleEmailUpdate() )}
  };

  // function to determine if text entered by user(enteredEmail) is a valid format per <validateEmail /> and return true/false value for {setValidEmaiol} and update the {email} variable state
  const reviewEmailEntry = (enteredEmail) => {
    const emailIsValid = validateEmail(enteredEmail);
    setValidEmail(emailIsValid);
    onChangeEmail(enteredEmail);
  };

  // function to alert/prompt user to enter an email address with an acceptable format
  const handleInvalidName = () => {
    Alert.alert(`*Required*\nPlease provide a valid name`); 
  };

  // function to handle valid first name submission 
  const handleFirstName = () => {
    saveFirstName();
    lastNameInputRef.current.focus();
    };

  // function to handle valid last name submission 
  const handleLastName = () => {
    saveLastName();
    emailInputRef.current.focus();
    };

  // function to determine if text entered by user(enteredFirstName) is a valid format per <validateName> 
  // and return true/false value for (validFirstName) and update the firstName variable state
  const reviewFirstNameEntry = (enteredFirstName) => {
    if (enteredFirstName.length < firstName.length) {
      const firstNameIsValid = validateName(firstName);
      setValidFirstName(firstNameIsValid);
    } else {
      const firstNameIsValid = validateName(enteredFirstName);
      setValidFirstName(firstNameIsValid);
      onChangeFirstName(enteredFirstName);
    }
  };

  // function to determine if text entered by user(enteredLastName) is a valid format per <validateName> 
  // and return true/false value for (validLastName) and update the lastName variable state
  const reviewLastNameEntry = (enteredLastName) => {
    const lastNameIsValid = validateName(enteredLastName);
    setValidLastName(lastNameIsValid);
    onChangeLastName(enteredLastName);
  };

  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid name (validFirstName of validLastName).
  const processFirstNameSubmission = () => {
    if (!validFirstName) {
      handleInvalidName();
    } else { 
      handleFirstName();
  }};
  
  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid name (validFirstName of validLastName).
  const processLastNameSubmission = () => {
    if (!validLastName) {
      handleInvalidName();
    } else { 
      handleLastName();
  }};

    // function to handle "return" key press on the email TextInput
    const handleEmailReturn = () => {
      reviewEmailEntry(email); // Validate the current email content
      processEmailSubmission(); // Process the submission based on validation
    };
  
    // function to handle "return" key press on the first name TextInput
    const handleFirstNameReturn = () => {
      reviewFirstNameEntry(firstName); // Validate the current first name content
      processFirstNameSubmission(); // Process the submission based on validation
    };
  
    // function to handle "return" key press on the last name TextInput
    const handleLastNameReturn = () => {
      reviewLastNameEntry(lastName); // Validate the current last name content
      processLastNameSubmission(); // Process the submission based on validation
    };
  
  // Page layout elements including a Pressable button that casuses four(4) conditions to be evaluated 
  // to determine what functions are performed when the Pressable is activated. 
  return (
    <KeyboardAvoidingView 
      style={styles.pageContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Add pixels of space between keyboard and content
    >
    <ScrollView
      style={styles.pageContainer}
    >
      <Image
        style={styles.image}
        source={require('../assets/little-lemon-logo-grey.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Little Lemon alternate grey logo'}
      />
      <Text style={styles.regularText}>
        {displayFirstName} {displayLastName} {'\n'}
        {displayEmail}
      </Text>

      <View style={styles.formContainer}>
        <View style={styles.formHeadContainer}> 
          <Text style={styles.subtitleMarkazi}>
            Let us get to know you
          </Text>
        </View>

        <View style={styles.formInputContainer}>
        <Text style={styles.cardtitleKarla}>First Name:</Text> 
        <TextInput
            style={styles.inputBox}
            value={firstName}
            onChangeText={reviewFirstNameEntry}
            placeholder={''}
            keyboardType='default'
            clearButtonMode='while-editing'
            autoCapitalize='words'
            autoCorrect={false}
            enterKeyHint='next'
            onSubmitEditing={handleFirstNameReturn}
            ref={firstNameInputRef}
          />
        <Text style={styles.cardtitleKarla}>Last Name:</Text> 
        <TextInput
            style={styles.inputBox}
            value={lastName}
            onChangeText={reviewLastNameEntry}
            placeholder={''}
            keyboardType='default'
            clearButtonMode='while-editing'
            autoCapitalize='words'
            autoCorrect={false}
            enterKeyHint='next'
            onSubmitEditing={handleLastNameReturn}
            ref={lastNameInputRef}
          />
        <Text style={styles.cardtitleKarla}>Email:</Text> 
        <TextInput
            style={styles.inputBox}
            value={email}
            onChangeText={reviewEmailEntry}
            placeholder={''}
            keyboardType='email-address'
            clearButtonMode='while-editing'
            autoCapitalize='none'
            autoCorrect={false}
            enterKeyHint='send'
            onSubmitEditing={handleEmailReturn}
            ref={emailInputRef}
          />
      </View>

      <View style={styles.formButtonContainer}>
        {(!validEmail && !subscribed) && ( 
          <Pressable 
          ref={pressableInputRef}
          style={styles.invalidEmailButton}
          onPress={handleInvalidEmail}
          hitSlop={{top: 20, bottom: 20}}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </Pressable>
        )}

        {(validEmail && !subscribed) && ( 
          <Pressable 
              style={styles.validEmailButton}
              onPress={handleNewSubscription}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </Pressable>
        )}

        {((!validEmail || email == '' || email == null) && subscribed) && ( 
          <Pressable 
          style={styles.invalidEmailButton}
          onPress={handleInvalidEmail}
          hitSlop={{top: 20, bottom: 20}}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </Pressable>
        )}

        {(validEmail && !(email == '' || email == null) && subscribed) && ( 
          <Pressable 
              style={styles.validEmailButton}
              onPress={handleEmailUpdate}
              hitSlop={{top: 20, bottom: 20}}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </Pressable>
        )}
      </View>

      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
