import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({

// CONTAINERS
    splashContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    headerButtonContainer: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    headerRightContainer: {
      flexDirection: 'row',
      marginBottom: 11,
      width: 86,
      height: 40,
    },
    abbreviationContainer: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FBDABB',
      marginRight: 8,
      marginBottom: 11,
      borderRadius: 20,
    },
    headerIconContainer: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 0,
      marginBottom: 0,
      borderRadius: 0,
    },
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
    avatarEditContainer: {
      marginHorizontal: 25,    },
      justifyContent: 'center',
    profileInputContainer: {
      marginHorizontal: 25,    },
    formButtonContainer: {
      flex: 1,
      alignItems: 'center',
    },
  

// IMAGES
    splashLogo: {
        width: 300,
        borderRadius: 0,
        alignSelf: 'center',
        marginBottom: 200,
    },
    headerLogo: {
        height: 40,
        width: 146,
        borderRadius: 0,
        marginLeft: 0,
        marginBottom: 11,
        alignSelf: 'flex-start'
    },
    headerButton: {
        height: 40,
        width: 40,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 30,
        marginBottom: 11,
    },
    logoBackButton: {
        height: 40,
        width: 169,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 11,
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
    sectionTitleKarla: {
        fontSize: 20,
        fontFamily: "Karla",
        paddingTop: 4,
        paddingBottom: 4,
        marginVertical: 0,
        fontWeight: '900',
        color: 'black',
        textAlign: 'center',
    },
    navigationButtonText: {
        fontSize: 40,
        fontFamily: "MarkaziText",
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
    }, 
    abbreviationKarla: {
        fontSize: 16,
        fontFamily: "Karla",
        paddingTop: 0,
        paddingBottom: 0,
        marginVertical: 0,
        alignSelf: 'center',
        fontWeight: '900',
        color: 'black',
        textAlign: 'center',
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
    validButton: {
      height: 51,
      width: '100%',
//      paddingHorizontal: 60,
//      paddingVertical: 6,
      marginVertical: 16,
//      marginHorizontal: 25,
      backgroundColor: '#F4CE14',
      borderColor: '#F4CE147',
      borderWidth: 0,
      borderRadius: 10
    }, 
    invalidButton: {
      height: 51,
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
  