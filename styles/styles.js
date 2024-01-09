import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

// CONTAINERS
  pageContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    topnavContainer: {
      flex: 1,
      marginHorizontal: 25,
      marginBottom: 8,
    },
    descriptionContainer: {
      flex: 4,
      backgroundColor: '#fff',
    },
    formContainer: {
      flex: 5,
      backgroundColor: '#fff',
      marginHorizontal: 25,
    },
    formHeadContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formInputContainer: {
      flex: 4,
      backgroundColor: '#fff',
    },
    formButtonContainer: {
        flex: 1,
        marginHorizontal: 25,
      },
  

// IMAGES
    image: {
      width: 120,
      height: 120,
      borderRadius: 0,
      alignSelf: 'center',
      padding: 0,
      marginTop: 35,
      marginBottom: 5,
    },

// FONTS
    regularText: {
      fontSize: 16,
      padding: 20,
      marginVertical: 8,
      color: 'black',
      textAlign: 'center',
    },
    regularKarla: {
      fontSize: 22,
      fontFamily: "Karla",
      padding: 20,
      marginVertical: 8,
      color: 'black',
      textAlign: 'center',
    },
    subtitleMarkazi: {
      fontSize: 40,
      fontFamily: "MarkaziText",
      padding: 10,
      marginVertical: 8,
      color: '#48742C',
      textAlign: 'center',
    },
    cardtitleKarla: {
        fontSize: 18,
        fontFamily: "Karla",
        paddingTop: 4,
        paddingBottom: 4,
        marginVertical: 0,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
      },
    navigationButtonText: {
        textAlign: 'center',
        fontWeight: 'normal',
        fontSize: 16,
        color: 'white',
      }, 
    
// ELEMENTS
    inputBox: {
      height: 40,
      marginBottom: 14,
      borderWidth: 1,
      padding: 10,
      fontSize: 16,
      borderColor: '#D9D9D9',
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
  });

  export default styles;
  