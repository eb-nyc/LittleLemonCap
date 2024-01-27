import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const AvatarPicker = ({ onChangeAvatar }) => {
  const [userAvatarImage, setUserAvatarImage] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work.');
      } else {
        changeAvatar();
      }
    })();
  }, []);

  const changeAvatar = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        setUserAvatarImage(result.uri);
        console.log('Uploaded Image:', userAvatarImage);
        onChangeAvatar(result.uri); // Pass the image URI to the parent component
      }
    } catch (error) {
      console.error('Image upload error', error);
      Alert.alert('Error', 'Image upload not successful. Try again');
    }
  };

  return (
    // You can render your UI or use it as a hook to trigger the image picker
    // For example, you might have a Pressable button triggering changeAvatar function
    // and displaying the selected image.
    // You can customize the UI based on your requirements.
    null
  );
};

export default AvatarPicker;
