import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, Image, Pressable, Alert} from 'react-native';
import { validateEmail } from '../utils';

export default function OnboardingScreen() {
  const [email, onChangeEmail] = useState(''); //variable state = email text string submitted by user into TextInput
  const [subscribed, setSubscribed] = useState(false);  //variable state = if user has already submitted valid email
  const [validEmail, setValidEmail] = useState(false); //variable state = if text in input field is a valid format per validateEmail function
  const emailInputRef = React.createRef();   //Ref to store reference to TextInput component
  const pressableInputRef = React.createRef(); //Ref to store reference to current Pressable

  // function to remove the keyboard - used when valid email address is submitted
  const dismissKeyboard = () => {
    emailInputRef.current.blur(); 
  };

  // function to alert/prompt user to enter an email address with an acceptable format
  const handleInvalidEmail = () => {
    Alert.alert('Please provide a valid email address'); 
  };

  // function to alert user that the submitted email address has been accepted
  const handleNewSubscription = () => {
    Alert.alert(`Thanks for subscribing.\nStay tuned!`); 
    setSubscribed(true); 
    dismissKeyboard(); 
    onChangeEmail(''); 
  };

  // function to alert user that their email address as been updated with the submitted email
  const handleEmailUpdate = () => {
    Alert.alert(`Thank you\nYour email has been updated.`); 
    setSubscribed(true); 
    dismissKeyboard(); 
    onChangeEmail(''); 
  }

  // function to determine which prompt should be presented to user depending text in the input area is a valid email and if an email was already provided
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

  // four(4) conditions are evaluated to determine what functions are performed when the Pressable is activated. 
  return (
    <>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/little-lemon-logo-grey.png')}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={'Little Lemon alternate grey logo'}
      />
      <Text style={styles.regularText}>
        Subscribe to our newsletter for our latest delicious recipes!
      </Text>
      <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={reviewEmailEntry}
          placeholder={'Type your email'}
          keyboardType='email-address'
          clearButtonMode='while-editing'
          autoCapitalize='none'
          autoCorrect={false}
          enterKeyHint='send'
          onSubmitEditing={processEmailSubmission}
          ref={emailInputRef}
        />

      {(!validEmail && !subscribed) && ( 
      <Pressable 
      ref={pressableInputRef}
      style={styles.invalidEmailButton}
      onPress={handleInvalidEmail}
      hitSlop={{top: 20, bottom: 20}}
      >
        <Text style={styles.navigationButtonText}>Subscribe</Text>
      </Pressable>
      )}

      {(validEmail && !subscribed) && ( 
      <Pressable 
          style={styles.validEmailButton}
          onPress={handleNewSubscription}
      >
        <Text style={styles.navigationButtonText}>Subscribe</Text>
      </Pressable>
      )}

    {((!validEmail || email == '' || email == null) && subscribed) && ( 
      <Pressable 
      style={styles.invalidEmailButton}
      onPress={handleInvalidEmail}
      hitSlop={{top: 20, bottom: 20}}
      >
        <Text style={styles.navigationButtonText}>Subscribed</Text>
      </Pressable>
      )}

    {(validEmail && !(email == '' || email == null) && subscribed) && ( 
      <Pressable 
          style={styles.validEmailButton}
          onPress={handleEmailUpdate}
          hitSlop={{top: 20, bottom: 20}}
      >
        <Text style={styles.navigationButtonText}>Update Email Address</Text>
      </Pressable>
      )}


    </View>
    </>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 0,
    alignSelf: 'center',
    padding: 0,
    marginTop: 35,
    marginBottom: 5,
  },
  regularText: {
    fontSize: 22,
    padding: 20,
    marginVertical: 8,
    color: 'black',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderColor: 'black',
    borderRadius: 6,
    backgroundColor: 'white',
  },
  validEmailButton: {
    paddingHorizontal: 60,
    paddingVertical: 6,
    marginVertical: 16,
    margin: 10,
    backgroundColor: '#495E57',
    borderColor: '#495E57',
    borderWidth: 0,
    borderRadius: 10
  }, 
  invalidEmailButton: {
    paddingHorizontal: 60,
    paddingVertical: 6,
    marginVertical: 16,
    margin: 10,
    backgroundColor: 'gray',
    borderColor: 'gray',
    borderWidth: 0,
    borderRadius: 10
  }, 
  navigationButtonText: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 16,
    color: 'white',
  }, 
});
