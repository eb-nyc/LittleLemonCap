import { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, Alert, ScrollView, Image, TextInput, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { Menu } from '../components/Menu';


// MAIN COMPONENT DECLARATION & EXPORT STATEMENT
export default function App() {
  const [searchTerm, onChangeSearchTerm] = useState(''); 

  const infoSearch = () => {
    Alert.alert(
      "Placholder Only",
      "A working search tool isn't part of the assignment requirements but good design would include this feature.",
      [{ text: "Ok"}]
    );
    onChangeSearchTerm('');
  };

  const infoReservation = () => {
    Alert.alert(
      "Placeholder Only",
      "In a full app, this would link to the reservations feature.",
      [{ text: "Ok"}]
    );
  };

  const infoOrderDelivery = () => {
    Alert.alert(
      "Placeholder Only",
      "In a full app, this would allow the user to start the process of placing an order for delivery.",
      [{ text: "Ok"}]
    );
  };



// UI display elements
  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
    <SafeAreaView style={styles.container}>
      <ScrollView  style={styles.container}>
        <>
        <View style={styles.leadContentContainer}>
          <Text style={styles.displayTitleMarkazi}>Little Lemon</Text>
          <Text style={styles.headTitleMarkazi}>Chicago</Text>
          <View style={styles.leadDescriptionContainer}>
           <View style={styles.descTextContainer}>
               <Text style={styles.descTextKarla}> 
              We are a family-owned Mediterranean restaurant, 
              focused on traditional recipes served with a modern twist.
              </Text>
              <Pressable onPress={infoReservation} style={styles.leadButton}>
                <Text style={styles.abbreviationKarla}>Make a Reservation</Text>
              </Pressable>
              <Pressable onPress={infoOrderDelivery} style={styles.leadButton}>
                <Text style={styles.abbreviationKarla}>Order Delivery</Text>
              </Pressable>
            </View> 
            <View style={styles.descImageContainer}>
              <Image
                style={styles.descImage}
                source={require('../assets/photo-hero-LL-sm.jpg')}
                //resizeMode="cover"
                accessible={true}
                accessibilityLabel={'Food tray presenting sample of foods'}
              />
            </View>
          </View>
        </View>

        <View style={styles.menuContentContainer}>
      
          <View style={styles.searchBarContainer}>
            <Image
              source={require('../assets/magnifyingglass-sm.png')}
              style={styles.iconSearch}
              resizeMode="contain"
              accessible={true}
              accessibilityLabel={'Search Icon: Magnifying Glass'}
            />
            <TextInput
              style={styles.searchInputBox}
              value={searchTerm}
              onChangeText={onChangeSearchTerm}
              placeholder={'Search menu'}
              keyboardType='default'
              clearButtonMode='while-editing'
              autoCapitalize='none'
              autoCorrect={false}
              enterKeyHint='done'
              onSubmitEditing={infoSearch}
            />
          </View>

          <Menu/>

        </View> 
        </>
      </ScrollView>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({

// CONTAINERS
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    alignContent: 'flex-start',
  },
  leadContentContainer: {
    flex: 1,
    backgroundColor: '#435F57',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 25,
    paddingTop: 8,
    marginBottom: 15,
  },
  leadDescriptionContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    marginBottom: 16,
    marginRight: 8,
    marginTop: 4,
    padding: 0,
  },
  descTextContainer: {
    flex: 1,
    flexDirection: 'column',
    marginRight: 12,
  },
  descImageContainer: {
    width: 143,
    height: 210,
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    alignContent: 'center',
  },
  searchBarContainer: {
    flex: 1,
    height: 40,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  searchInputBox: {
      flex: 0.95,
      height: 40,
      width: '100%',
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
      marginBottom: 8,
      fontSize: 16,
      borderRadius: 6,
      paddingLeft: 10,
  },
  menuContentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    width: '100%',
    //height: 340,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
  },


// FONTS
  displayTitleMarkazi: {
    fontSize: 64,
    fontFamily: "MarkaziText",
    marginBottom: -18,
    color: '#F4CE14',
    textAlign: 'left',
  },
  headTitleMarkazi: {
    fontSize: 40,
    fontFamily: "MarkaziText",
    color: 'white',
    textAlign: 'left',
  },
  descTextKarla: {
    fontSize: 16,
    fontFamily: "Karla",
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'left',
  },
  abbreviationKarla: {
    fontSize: 16,
    fontFamily: "Karla",
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    alignSelf: 'center',
    color: 'black',
    textAlign: 'center',
  },


// ELEMENTS
  descImage: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  leadButton: {
    height: 35,
    width: 160,
    marginTop: 12,
    marginHorizontal: 6,
    backgroundColor: '#F4CE14',
    borderColor: '#D8D8D8',
    borderWidth: 1,
    borderRadius: 16,
    alignContent: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  }, 
  iconSearch: {
    height: 28,
    width: 28,
    borderRadius: 0,
    marginLeft: 0,
    marginBottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});