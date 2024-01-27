import React, { useState, useEffect, useRef, useContext } from 'react';
import AuthContext from '../AuthContext';
import {View, KeyboardAvoidingView, Text, TextInput, Image, Pressable, Alert, Platform, SafeAreaView, ScrollView, Keyboard} from 'react-native';
import { validateEmail, validateName, validatePhone } from '../utils';
import styles from '../styles/styles';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AvatarPicker from '../utils/AvatarPicker';
import HomeScreen from '../screens/HomeScreen';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen({navigation}) {

  // GENERAL SCREEN VARIABLES
    const pressableInputRef = useRef(); //Ref to store reference to current Pressable
    const [fontLoaded, setFontLoaded] = useState(false);
    const { signOut } = useContext(AuthContext);
  // ALL VARIABLES RELATED TO THE AVATAR IMAGE MANAGMENT
    const [avatarOnFile, setAvatarOnFile] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null);
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
  // ALL VARIABLES RELATED TO THE PHONE NUMBER
    const [phone, onChangePhone] = useState(''); //variable state = phone text string submitted by user into TextInput
    const phoneInputRef = useRef();   //Ref to store reference to TextInput component
    const [displayphone, setDisplayPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false); //variable state = user has submitted valid phone no.
  // ALL VARIABLES RELATED TO EMAIL NOTIFICATION OPTIONS
    const [promoChecked, setPromoChecked] = useState(true);
    const [newsChecked, setNewsChecked] = useState(true);
  // ALL VARIABLES RELATED TO UNDO AND LOGOUT BUTTONS
    const [onboard, setOnboard] = useState(true);
  // ALL VARIABLES RELATED TO THE MAIN BUTTON
    const [pressState, setPressState] = useState(false); //variable state = main button currently pressed?



  // Function to transfer userIMAGE from AsyncStorage when component renders.
  const loadUserAvatar = async () => {
    try {
      const userAvatarURI = await AsyncStorage.getItem('userImage');
      if (userAvatarURI) {
        // setUserAvatar(userAvatarURI);
        console.log(`Found userImage in AsyncStorage!`);
        const parsedUserAvatar = JSON.parse(userAvatarURI);
        console.log(`Parsed userImage loaded from AsyncStorage and saved as userAvatar.`);
        setAvatarOnFile(true);
        setUserAvatar(parsedUserAvatar);
      } else {
        console.log(`Unable to use loadUserAvatar to get userImage from AsyncStorage.`);
        setAvatarOnFile(false);
      }
    } catch (e) {
      console.error(`Error loading user image:`,e);
    }
  };

  useEffect(() => {
    loadUserAvatar();
    console.log(`-- useEffect (loadUserAvatar) --`);
  }, []);


  // Function to save user image to AsyncStorage as {userImage}.
  const saveAvatarImage = async (imageURI) => {
    try {
      await AsyncStorage.setItem('userImage', JSON.stringify(imageURI));
      console.log(`Saving stringifyd version of imageURI to AsyncStorage.`);
    } catch (e) {
      console.error(`Error saving userAvatar to AsyncStorage: `,e);
    }
  };


  // Function to upload image from device
  const handleChangeAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.cancelled) {
      setUserAvatar(result.uri);
      // Save the new image URI to AsyncStorage
      saveAvatarImage(result.uri);
    }
  };


  // Function to remove user image from AsyncStorage
  const removeUserAvatar = async () => {
    try {
      await AsyncStorage.removeItem('userImage');
      console.log('User image removed from AsyncStorage.');
      setAvatarOnFile(false);
      setUserAvatar(require('../assets/profile-ph.png'));
    } catch (e) {
      console.error('Error removing user image from AsyncStorage: ', e);
    }
  };
  
  // Function to display and save a default image for userAvatar.
  const saveDefaultAvatar = () => {
    setUserAvatar(require('../assets/profile-image.png'));
    console.log('Message to confirm the saveDefaultAvatar function is running.');
  };
  
  useEffect(() => {
    console.log(`useEffect -- saveUserAvatar(userAvatar) -- Saving userAvatar to AsyncStorage.`);
    saveAvatarImage(userAvatar);
  }, [userAvatar]);


  const loadDefaultAvatar = () => {
    // Load the default avatar image
    console.log ('Message to confirm the loadDefaultAvatar function is running.');
    //setUserAvatar(require('../assets/profile-image.png'));
    setUserAvatar('../assets/profile-image.png');
    // saveAvatarImage();
    // loadUserAvatar();
  };

  // Function to handle the "Change" button and show the alert
  const changeAvatar = () => {
    const showAlert = () => {
      Alert.alert(
        "Photo Selection Disabled",
        "The mobile simulator didn't allow photo selection from the device, so this button just loads the provided profile picture.",
        [{ text: "OK", onPress: saveDefaultAvatar }]
        //[{ text: "OK", onPress: () => console.log('Confirm Change Button press works.') }]
      );
    };
    showAlert();
  };



  // Function to transfer device's user email from AsyncStorage when this component renders.
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


  // Function to transfer userFirstName from AsyncStorage when this component renders.
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


  // Function to transfer userLastName from AsyncStorage when this component renders.
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


  // Function to transfer userPhone from AsyncStorage when component renders.
  const loadPhone = async () => {
    try {
      const userPhoneString = await AsyncStorage.getItem('userPhone');
      if (userPhoneString !== null) {
        onChangePhone(userPhoneString);
      }
    } catch (e) {
      console.error(`Error loading phone number from AsyncStorage: `, e);
    }
  };
  useEffect(() => {
    loadPhone();
  }, []);


  // Function to save new user-provided email to AsyncStorage
const saveUserEmail = async () => {
    try {
    await AsyncStorage.setItem('userEmail', email);
    console.log(`AsyncStorage userEmail updated to`,email);
    } catch (e) {
    console.error(`Error saving user email: `,e);
    }
};

  // Function to remove email from AsyncStorage
  const removeEmail = async () => {
    try {
      await AsyncStorage.removeItem('userEmail');
      console.log('User email removed from AsyncStorage.');
      setValidEmail(false);
      onChangeEmail('');
    } catch (e) {
      console.error('Error removing user email from AsyncStorage: ', e);
    }
  };



  // Function to save new user-provided first name to AsyncStorage
  const saveFirstName = async () => {
    try {
    await AsyncStorage.setItem('userFirstName', firstName);
    console.log(`AsyncStorage userFirstName updated to`,firstName);
    } catch (e) {
    console.error(`Error saving first name to AsyncStorage: `,e);
    }
  };

  // Function to remove first name from AsyncStorage
  const removeFirstName = async () => {
    try {
      await AsyncStorage.removeItem('userFirstName');
      console.log('User first name removed from AsyncStorage.');
      setValidFirstName(false);
      onChangeFirstName('');
    } catch (e) {
      console.error('Error removing user first name from AsyncStorage: ', e);
    }
  };


  // Function to save new user-provided last name to AsyncStorage
  const saveLastName = async () => {
    try {
    await AsyncStorage.setItem('userLastName', lastName);
    console.log(`AsyncStorage userLastName updated to`,lastName);
    } catch (e) {
    console.error(`Error saving last name to AsyncStorage: `,e);
    }
  };

  // Function to remove last name from AsyncStorage
  const removeLastName = async () => {
    try {
      await AsyncStorage.removeItem('userLastName');
      console.log('User last name removed from AsyncStorage.');
      setValidLastName(false);
      onChangeLastName('');
    } catch (e) {
      console.error('Error removing user last name from AsyncStorage: ', e);
    }
  };


  // Function to save new user-provided phone number to AsyncStorage
  const savePhone = async () => {
    try {
    await AsyncStorage.setItem('userPhone', phone);
    console.log(`AsyncStorage userPhone updated to`,phone);
    } catch (e) {
    console.error(`Error saving phone number to AsyncStorage: `,e);
    }
  };

  // Function to remove phone number from AsyncStorage
  const removePhone = async () => {
    try {
      await AsyncStorage.removeItem('userPhone');
      console.log('User phone number removed from AsyncStorage.');
      setValidPhone(false);
      onChangePhone('');
    } catch (e) {
      console.error('Error removing user phone number from AsyncStorage: ', e);
    }
  };



  // function to determine if enteredPhone is a valid format per <validatePhone /> and return true/false value for {setValidPhone}.
  const reviewPhoneEntry = (enteredPhone) => {
    const phoneIsValid = validatePhone(enteredPhone);
    setValidPhone(phoneIsValid);
    onChangePhone(enteredPhone);
  };

  // function to handle "return" key press on the phone TextInput
  const handlePhoneReturn = () => {
    processPhoneSubmission(); // Process the submission based on validation
  };
  
  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid email (validEmail) and if an email was already provided (subscribed).
  const processPhoneSubmission = () => {
    {(!validPhone || phone == '' || phone == null) && (
      handleInvalidPhone() )}
    {validPhone && !(phone == '' || phone == null) && ( 
      handlePhoneUpdate() )}
  };

  // function to alert/prompt user to enter an phone address with an acceptable format
  const handleInvalidPhone = () => {
    Alert.alert('Your phone number should be 10 digits, including area code.'); 
  };

    // Function to remove the keyboard - used when valid email address is submitted
    const dismissKeyboard = () => {
      Keyboard.dismiss(); 
    };
    
  // function to handle phone number submission 
  const handlePhoneUpdate = () => {
    dismissKeyboard();    
  };
  


  // function to load up the necessary fonts
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


  // function to alert/prompt user to enter an email address with an acceptable format
  const handleInvalidEmail = () => {
    Alert.alert('Please provide a valid email address'); 
  };

  // function to alert user that the submitted information has been accepted
  const handleNewSubscription = () => {
    Alert.alert(`Welcome to the Club!`); 
    setSubscribed(true); 
    dismissKeyboard(); 
    //onChangeEmail(''); 
    };

  // function to alert user that their email address as been updated with the submitted email
  const handleEmailUpdate = () => {
    setSubscribed(true); 
    dismissKeyboard();
    phoneInputRef.current.focus(); 
    }

  // function to determine which prompt should be presented to user depending if text in the input area  
  // is a valid email (validEmail) and if an email was already provided (subscribed).
  const processEmailSubmission = () => {
    {(!validEmail || email == '' || email == null) && (
      handleInvalidEmail() )}
    {validEmail && !(email == '' || email == null) && ( 
      handleEmailUpdate() )}
  };

  // function to determine if enteredEmail is a valid format per <validateEmail /> and return true/false value for {setValidEmail} and update the {email} variable state
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
    lastNameInputRef.current.focus();
    };

  // function to handle valid last name submission 
  const handleLastName = () => {
    emailInputRef.current.focus();
    };

  // function to determine if text entered by user(enteredFirstName) is a valid format per <validateName> 
  // and return true/false value for (validFirstName) and update the firstName variable state
  const reviewFirstNameEntry = (enteredFirstName) => {
    // if (enteredFirstName.length < firstName.length) {
    //   const firstNameIsValid = validateName(firstName);
    //   setValidFirstName(firstNameIsValid);
    // } else {
      const firstNameIsValid = validateName(enteredFirstName);
      setValidFirstName(firstNameIsValid);
      onChangeFirstName(enteredFirstName);
    // }
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

    

// ****  EMAIL NOTIFICATION FUNCTIONS ****

  // Functions to check and uncheck promo notification box
  const modifyPromo = () => {
    setPromoChecked(!promoChecked);
  };

  // Functions to check and uncheck news notification box
  const modifyNews = () => {
    setNewsChecked(!newsChecked);
  };


  // ****  UNDO AND LOGOUT FUNCTION MANAGEMENT FUNCTION ****

  // function to manage all updates when Undo Changes button is pressed
  const undoChanges = () => {
      dismissKeyboard();
      loadUserAvatar();
      loadFirstName();
      loadLastName();
      loadUserEmail();
      loadPhone();
  };

  // Function to save change onboard status in AsyncStorage as {userOnboarded}.
  const saveOnboardStatus = async () => {
    await signOut();
  };

  // function to manage all updates when Logout button is pressed
  const logout = () => {
    dismissKeyboard();
    removeUserAvatar();
    removeFirstName();
    removeLastName();
    removeEmail();
    removePhone();
    setOnboard(false);
    saveOnboardStatus();
    setTimeout(() => {
    }, 1000);
  };


    // ****  SAVE AND EXIT FUNCTION MANAGEMENT FUNCTION ****
    // function to manage all updates when Save & Exit button is pressed
    const saveAndExit = () => {
        Keyboard.dismiss();;
        //saveAvatarImage(userAvatar);
        saveFirstName();
        saveLastName(); 
        saveUserEmail();
        savePhone();
        navigation.navigate('Home');
    };

    // function to alert/prompt user to enter an email address with an acceptable format
    const handleInvalidData = () => {
      Alert.alert('Valid email and first & last name are required.'); 
    };

    const testImageVar = require('../assets/profile-image.png');
    const testImagePath = '../assets/shoppingbag-bw.png';

  // ***  MAIN UI LAYOUT  *** 
  return (
    <KeyboardAvoidingView 
      style={styles.pageContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90} // Add pixels of space between keyboard and content
    >
    <ScrollView style={styles.profileInputContainer}>
      <Text style={styles.sectionTitleKarla}>PROFILE INFORMATION</Text>

      <View style={styles.cardTitleContainer}>
        <Text style={styles.cardtitleKarla}>Avatar:</Text> 
        <Text style={styles.cardcaptionKarla}> (optional)</Text>
      </View>
      <View style={styles.avatarEditContainer}>
        <View style={styles.avatarButtonContainer}>
              <Image
                style={styles.blankAvatarContainer}
                source={userAvatar}
                resizeMode="contain"
                accessible={true}
                accessibilityLabel={'Avatar image of you!'}
              />

          <Pressable 
            style={styles.profileAvatarButton}
            onPress={changeAvatar}
          >
            <Text style={styles.abbreviationKarla}>
                Change
            </Text>
          </Pressable> 

          <Pressable 
            style={styles.profileAvatarButton}
            onPress={removeUserAvatar}
          >
            <Text style={styles.abbreviationKarla}>
                Remove
            </Text>
          </Pressable>
           
        </View>
      </View>

  
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
        <View style={styles.cardTitleContainer}>
          <Text style={styles.cardtitleKarla}>Phone: </Text> 
          <Text style={styles.cardcaptionKarla}> (optional)</Text>
        </View>
        <TextInput
            style={styles.inputBox}
            value={phone}
            onChangeText={reviewPhoneEntry}
            placeholder={'e.g. 555-123-4567'}
            keyboardType='phone-pad'
            clearButtonMode='while-editing'
            autoCapitalize='none'
            autoCorrect={false}
            enterKeyHint='next'
            onSubmitEditing={handlePhoneReturn}
            ref={phoneInputRef}
        />

        <Text style={styles.cardtitleKarla}>Email Notifications:</Text> 

      {/* Promo Email Notification Option Line */}
        <View style={styles.notificationOptionsContainer}>
        {promoChecked ? (
          <Pressable onPress={modifyPromo}>
                <Image
                    source={require('../assets/checkbox-filled.png')}
                    style={styles.checkboxSize}
                    resizeMode="stretch"
                    accessible={true}
                    accessibilityLabel={'Unchecked option to receive email notifications about special offers and promotions.'}
                />
          </Pressable>
        ) : (
          <Pressable onPress={modifyPromo}>
                <Image
                    source={require('../assets/checkbox-empty.png')}
                    style={styles.checkboxSize}
                    resizeMode="stretch"
                    accessible={true}
                    accessibilityLabel={'Checked option to receive email notifications about special offers and promotions.'}
                />
          </Pressable>
        )}
          <Text style={styles.notificationsKarla}> Special Offers & Promotions</Text>
        </View>        

      {/* News & Event Email Notification Option Line */}
        <View style={styles.notificationOptionsContainer}>
        {newsChecked ? (
          <Pressable onPress={modifyNews}>
                <Image
                    source={require('../assets/checkbox-filled.png')}
                    style={styles.checkboxSize}
                    resizeMode="stretch"
                    accessible={true}
                    accessibilityLabel={'Unchecked option to receive email notifications about news and special events.'}
                />
          </Pressable>
        ) : (
          <Pressable onPress={modifyNews}>
                <Image
                    source={require('../assets/checkbox-empty.png')}
                    style={styles.checkboxSize}
                    resizeMode="stretch"
                    accessible={true}
                    accessibilityLabel={'Checked option to receive email notifications about news and special events.'}
                />
          </Pressable>
        )}
          <Text style={styles.notificationsKarla}> News & Events (e.g. New Year’s Eve)</Text>
        </View>   

        <View style={styles.notificationButtonContainer}>

          <Pressable 
            style={styles.notiUndoButton}
            onPress={undoChanges}
          >
            <Text style={styles.undoKarla}>
                Undo Changes
            </Text>
          </Pressable> 
          <Pressable 
            style={styles.notiLogoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutKarla}>
                Logout
            </Text>
          </Pressable> 
        </View>


  {/* Conditional formatting options for Main Button */}
      <View style={styles.formButtonContainer}>
        {(!validEmail || !validFirstName || !validLastName) && ( 
          <Pressable 
          ref={pressableInputRef}
          style={styles.invalidButton}
          onPress={handleInvalidData}
          hitSlop={{top: 20, bottom: 20}}
          >
            <Text style={styles.navigationButtonText}>Save & Exit</Text>
          </Pressable>
        )}

        {(validEmail && validFirstName && validLastName && !pressState) && ( 
          <Pressable 
              style={styles.validButton}
              onPress={saveAndExit}
          >
            <Text style={styles.navigationButtonText}>Save & Exit</Text>
          </Pressable>
        )}

        {(validEmail && validFirstName && validLastName && pressState) && ( 
          <Pressable 
              style={styles.pressedButton}
              onPress={null}
          >
            <Text style={styles.navigationButtonText}>Save & Exit</Text>
          </Pressable>
        )}


      </View>

    </ScrollView>
    </KeyboardAvoidingView>
  );
}
