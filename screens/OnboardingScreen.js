import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../AuthContext';
import {View, KeyboardAvoidingView, Text, TextInput, Image, Pressable, Alert, Platform, ScrollView, Keyboard} from 'react-native';
import { validateEmail, validateName } from '../utils';
import styles from '../styles/styles';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({navigation}) {

// GENERAL SCREEN VARIABLES
  const pressableInputRef = useRef(); //Ref to store reference to current Pressable
  const [fontLoaded, setFontLoaded] = useState(false);
  const { signIn } = useContext(AuthContext);
// ALL VARIABLES RELATED TO THE EMAIL ADDRESS
  const [email, onChangeEmail] = useState(''); //variable state = email text string submitted by user into TextInput
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


  // Function to transfer device's userFirstName data from AsyncStorage to firstName variable, if any exists.
  // This is only done once when this component initially renders.
  const loadFirstName = async () => {
    try {
      const userFirstNameString = await AsyncStorage.getItem('userFirstName');
      if (userFirstNameString !== null) {
        onChangeFirstName(userFirstNameString);
        setDisplayFirstName(userFirstNameString);
        setValidFirstName(true);
      } else {
        onChangeFirstName('');
        setDisplayFirstName('');
        setValidFirstName(false);
      }
    } catch (e) {
      console.error(`Error loading first name from AsyncStorage: `, e);
    }
  };
  useEffect(() => {
    loadFirstName();
  }, []);

  // Function to save new user-provided first name to AsyncStorage as {userFirstName}
  const saveFirstName = async () => {
    try {
    await AsyncStorage.setItem('userFirstName', firstName.toString());
    console.log(`AsyncStorage record for {userFirstName} updated to`,firstName.toString());
    } catch (e) {
    console.error(`Error saving first name to AsyncStorage: `,e);
    }
  };


  // Function to transfer device's userLastName data from AsyncStorage to lastName variable, if any exists.
  // This is only done once when this component first renders.
  const loadLastName = async () => {
    try {
      const userLastNameString = await AsyncStorage.getItem('userLastName');
      if (userLastNameString !== null) {
        onChangeLastName(userLastNameString);
        setDisplayLastName(userLastNameString);
        setValidLastName(true);
      } else {
        onChangeLastName('');
        setDisplayLastName('');
        setValidLastName(false);
      }
    } catch (e) {
      console.error(`Error loading last name from AsyncStorage: `, e);
    }
  };
  useEffect(() => {
    loadLastName();
  }, []);

  // Function to save new user-provided last name to AsyncStorage as {userLastName}
  const saveLastName = async () => {
    try {
    await AsyncStorage.setItem('userLastName', lastName.toString());
    console.log(`AsyncStorage record for {userLastName} updated to`,lastName.toString());
    } catch (e) {
    console.error(`Error saving last name to AsyncStorage: `,e);
    }
  };

  // Function to transfer device's userEmail data from AsyncStorage to Email variable, if any exists.
  // This is only done once when this component initially renders.
  const loadUserEmail = async () => {
    try {
      const userEmailString = await AsyncStorage.getItem('userEmail');
      if (userEmailString !== null) {
        onChangeEmail(userEmailString);
        setDisplayEmail(userEmailString);
        setValidEmail(true);
      } else {
        onChangeEmail('');
        setDisplayEmail('');
        setValidEmail(false);
      }
    } catch (e) {
      console.error(`Error loading user profile: `, e);
    }
  };
  useEffect(() => {
    loadUserEmail();
}, []);

  // Function to save new user-provided email to AsyncStorage as {userEmail}
const saveUserEmail = async () => {
    try {
    await AsyncStorage.setItem('userEmail', email.toString());
    console.log(`AsyncStorage record for {userEmail} updated to`,email);
    } catch (e) {
    console.error(`Error saving user profile: `,e);
    }
};


  // Function to load up the necessary fonts
  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'MarkaziText': require ('../assets/fonts/MarkaziText-var.ttf'),
        'Karla': require('../assets/fonts/Karla-var.ttf'),
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
    Keyboard.dismiss(); 
  };


  // function to handle "return" key press on the first name TextInput
  const handleFirstNameReturn = () => {
    //reviewFirstNameEntry(firstName); // Validate the current first name content
    processFirstNameSubmission(); // Process the submission based on validation
  };

  // function to determine if text entered by user(enteredFirstName) is a valid format per <validateName> 
  // and return true/false value for (validFirstName) and update the firstName variable state
  const reviewFirstNameEntry = (enteredFirstName) => {
    const firstNameIsValid = validateName(enteredFirstName);
    setValidFirstName(firstNameIsValid);
    onChangeFirstName(enteredFirstName);
  };

  // function to determine how entry should be handled depending on validity of first name  
  const processFirstNameSubmission = () => {
    if (!validFirstName) {
      handleInvalidFirstName();
    } else { 
      handleFirstName();
  }};
  
  // function to alert/prompt user to enter a first name with an acceptable format
  const handleInvalidFirstName = () => {
    Alert.alert(`*Required*\nPlease provide a first valid name`); 
  };

  // function to handle valid first name submission 
  const handleFirstName = () => {
    saveFirstName();
    lastNameInputRef.current.focus();
    };

  // function to handle "return" key press on the last name TextInput
  const handleLastNameReturn = () => {
    reviewLastNameEntry(lastName); // Validate the current last name content
    processLastNameSubmission(); // Process the submission based on validation
  };

  // function to determine if text entered by user(enteredLastName) is a valid format per <validateName> 
  // and return true/false value for (validLastName) and update the lastName variable state
  const reviewLastNameEntry = (enteredLastName) => {
    const lastNameIsValid = validateName(enteredLastName);
    setValidLastName(lastNameIsValid);
    onChangeLastName(enteredLastName);
  };

  // function to determine how entry should be handled depending on validity of last name  
  const processLastNameSubmission = () => {
    if (!validLastName) {
      handleInvalidLastName();
    } else { 
      handleLastName();
  }};

  // function to alert/prompt user to enter a last name with an acceptable format
  const handleInvalidLastName = () => {
    Alert.alert(`*Required*\nPlease provide a last valid name`); 
  };

  // function to handle valid last name submission 
  const handleLastName = () => {
    saveLastName();
    emailInputRef.current.focus();
    };


  // function to handle "return" key press on the email TextInput
  const handleEmailReturn = () => {
    reviewEmailEntry(email); // Validate the current email content
    processEmailSubmission(); // Process the submission based on validation
  };

  // function to determine if text entered by user(enteredEmail) is a valid format per <validateEmail /> and return true/false value for {setValidEmaiol} and update the {email} variable state
  const reviewEmailEntry = (enteredEmail) => {
    const emailIsValid = validateEmail(enteredEmail);
    setValidEmail(emailIsValid);
    onChangeEmail(enteredEmail);
  };
    
  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid email (validEmail).
  const processEmailSubmission = () => {
    {!validEmail && (
      handleInvalidEmail() )}
    {validEmail && ( 
      handleEmailUpdate() )}
  };

  // function to alert/prompt user to enter an email address with an acceptable format
  const handleInvalidEmail = () => {
    Alert.alert('Please provide a valid email address'); 
  };

  // function to alert user that their email address as been updated with the submitted email
  const handleEmailUpdate = () => {
  //  Alert.alert(`Thank you\nYour info has been updated.`); 
      dismissKeyboard(); 
      saveUserEmail();
  }
    
  // function to execute steps when the "Next" button is used successfully
  const handleNextButton = async () => {
      dismissKeyboard(); 
      saveFirstName();
      saveLastName();
      saveUserEmail();
      await signIn();
  }
      
  
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
            enterKeyHint='next'
            onSubmitEditing={handleEmailReturn}
            ref={emailInputRef}
          />
      </View>

      <View style={styles.formButtonContainer}>
        {(!validFirstName || !validLastName || !validEmail || email == '' || email == null) && ( 
          <Pressable
          style={styles.invalidButton}
          onPress={null}
          hitSlop={{top: 20, bottom: 20}}
          >
            <Text style={styles.navigationButtonText}>Next</Text>
          </Pressable>
        )}

        {(validEmail && validFirstName && validLastName) && (
          <Pressable
              style={styles.validButton}
              onPress={handleNextButton}
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
