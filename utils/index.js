import { useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Purpose of function is to validate user-entered name
export const validateName = (enteredName) => {
  // Regular expression to match alphabetic letters, dashes, and periods
  const nameRegex = /^[a-zA-Z.\-]+$/;

  // Check if the enteredName matches the specified criteria
  const isValidName =
    enteredName.length >= 2 &&
    enteredName.length <= 25 &&
    nameRegex.test(enteredName);

  return isValidName;
};


// Purpose of function is to validate user-entered phone number
export const validatePhone = (enteredPhone) => {
    // Remove non-numeric characters from the input
    const numericPhoneNumber = enteredPhone.replace(/\D/g, '');

    // Check if the numeric phone number has exactly 10 digits
    const isValidPhone =
      numericPhoneNumber.length === 10;
    
    return isValidPhone;
  };


// Purpose of function is to validate user-entered email address
export const validateEmail = (enteredEmail) => {
  return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(enteredEmail);
};


// Purpose of function seems only to determine if this component is rendering for the first time or not.
export function useUpdateEffect(effect, dependencies = []) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      return effect();
    }
  }, dependencies);
}; 


// *getSectionListData converts the menuItems to SectionList format and exports as SECTION_LIST_MOCK_DATA
  // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
  // The title of each section should be the category.
  // The data property should contain an array of menu items. 
  // Each item has the following properties: "id", "title" and "price"
  export function getSectionListData(menuItems) {
    const uniqueCategories = [...new Set(menuItems.map((item) => item.category))];
    const SECTION_LIST_MOCK_DATA = uniqueCategories.map((category) => {
      const filteredItems = menuItems.filter((item) => item.category === category);
      return {
        title: category,
        data: filteredItems.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description,
          price: item.price,
          photo: item.photo,
        })),
      };
    });
    return SECTION_LIST_MOCK_DATA;
  }


  export const loadOnboardingCompleted = async () => {
    try {
      const userOnboardingCompleted = await AsyncStorage.getItem('userOnboarded');
      return userOnboardingCompleted === 'true';
    } catch (e) {
      console.error(`Error loading user onboarding completed status: `, e);
      return false;
    } finally {
      setTimeout(() => {
      }, 1000);
    }
  };


  export const loadAvatarStoredStatus = async () => {
    try {
      const userAvatarStoredStatus = await AsyncStorage.getItem('userAvatarStored');
      return userAvatarStoredStatus === 'true';
    } catch (e) {
      console.error(`Utils > Error loading userAvatarStored status: `, e);
      return false;
    } 
  };