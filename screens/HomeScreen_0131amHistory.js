import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  SafeAreaView,
  StatusBar,
  Alert,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  clearSQL,
  saveMenuItems,
  getMenuItems,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils';
//Import menu data from a resident file
import freshData from '../assets/little-lemon-menu.json'
// Note: If it doesn't appear this data is being imported, we can try an alternate way to import the data using "require":
// const freshData = require('./data.json');

// *************************
// COMMENTED OUT FOR TESTING
// *************************

const sections = ['Appetizers', 'Salads', 'Entrees'];

// This creates the layout for how each line of the menu will be displayed.
const Item = ({ title, description, price, photo }) => (
  <View style={styles.item}>
    <View style={styles.itemText}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>{description}</Text>
      </View>
      <Text style={styles.title}>${price}</Text>
      </View>
    <View style={styles.itemPhoto}>
      {photo ? (
      <Image
          source={{ uri: photo }}
          style={{
            //resizeMode: 'contain',
            resizeMode: 'cover',
            width: '100%',
            height: '100%',
            //flex: 1,
            }}
        />
      ) : null}
    </View>
  </View>
);



                        // ************
                        // * OLD CODE *
                        // ************
                        {/* <View style={styles.itemPhoto}> */}
                        //style={styles.foodImage}
                        // source={require('../assets/photo-hero-LL-sm.jpg')}
                        // source={require('../assets/food-hummus-sm.jpg')}
                        // source={{ uri: '../assets/food-hummus-sm.jpg' }}
  


// MAIN COMPONENT DECLARATION & EXPORT STATEMENT
export default function App() {
  // *************************
  // COMMENTED OUT FOR TESTING
  // *************************
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  const [filteredData, setFilteredData] = useState([]);

  // const[testData, setTestData] = useState(null);

  // useEffect(() => {
  //   // Access your JSON data
  //   console.log(`HomeScreen > App.js useEffect > Raw data from import:`,freshData);

  //   // Set the data to state
  //   setTestData(freshData);
  // }, []);



// *************************
// CODE UPDATE 01.31.0902
// *************************
  // *fetchData* grabs all the data from the source and loads it to a variable called "fetchdata".
  // As a part of the process it transforms the field called "title" to a field called "category". 
  const fetchData = async() => {
    try {
      const json = freshData;
      // Convert the JSON array with map method.
      const convertedMenu = json.menu.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
        photo: item.photo,
        category: item.category,
      }));
      console.log(`HomeScreen > fetchData > convertMenu output:`,convertedMenu);
      return convertedMenu;
    } catch (error) {
      Alert.alert(`fectchData - JSON didn't import properly: ${error.message}`);
    }
  };    

  // *************************
  // CODE UPDATE 01.31.0933
  // ************************* 
  useEffect(() => {
    (async () => {
      try {
        // Fetch data from the local JSON file, create table, and save new data to SQLite
        const menuItems = await fetchData();
        await createTable();
        // await clearSQL();
        await saveMenuItems(menuItems);
  
        // Set data for display
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setFilteredData(sectionListData); // This line is optional, depending on your needs
        console.log('HomeScreen > useEffect *ONE TIME!* fetchData grab and populate SQL with JSON file data');
      } catch (e) {
        Alert.alert('HomeScreen useEffect:', e.message);
      }
    })();
  }, []);

  // *************************
  // CODE UPDATE 01.31.1105
  // ************************* 
  useUpdateEffect(() => {
    (async () => {
      try {
        // Fetch data from the local JSON file, create table, and save new data to SQLite
        const menuItems = await fetchData();
        //await clearSQL();
        await saveMenuItems(menuItems);
        console.log(`DATA UPDATE TRIGGERED`);
      } catch (e) {
        Alert.alert('ERROR> HomeScreen useUpdateEffect:', e.message);
      }
    })();
  }, [freshData]);
  

  // *************************
  // CODE UPDATE 01.31.1105
  // ************************* 
  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setFilteredData(sectionListData);  // Added a new state for filtered data
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [filterSelections, query]);
  

// *handleFiltersChange* updates the menu data based on the current category selections
  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    setFilterSelections(arrayCopy);
  };


// The following 3 declarations appear to be related to the search function.
// Some of this syntax wasn't taught in previous courses, but get the gist.
  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);
  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);
  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };









          // *************************
          /* COMMENTED OUT FOR TESTING - NOW OUTDATED
          // *************************
          useUpdateEffect(() => {
            const updateData = async () => {
              const fetchedMenuItems = await fetchData();
              await saveMenuItems(fetchedMenuItems);
              const activeCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                  return true;
                }
                return filterSelections[i];
              });
              try {
                const menuItems = await filterByQueryAndCategories(
                  query,
                  activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
                setFilteredData(sectionListData);
              } catch (e) {
                Alert.alert(e.message);
              }
            };


                        // ************
                        // * OLD CODE *
                        // ************
                        // useEffect(() => {
                        //   (async () => {
                        //     try {
                        //       await createTable();
                        //       let menuItems = await getMenuItems();
                      
                        //       if (!menuItems.length) {
                        //         const menuItems = await fetchData();
                        //         saveMenuItems(menuItems);
                        //       }
                      
                        //       const sectionListData = getSectionListData(menuItems);
                        //       setData(sectionListData);
                        //       setFilteredData(sectionListData);
                        //     } catch (e) {
                        //       // Handle error
                        //       Alert.alert(e.message);
                        //     }
                        //   })();
                        // }, []);




          // *************************
          /* COMMENTED OUT FOR TESTING - NOW OUTDATED
          // *************************
            const fetchData = async() => {
              try {
                const json = freshData;
                // Convert the JSON array with map method so that "title" becomes "category".
                const convertedMenu = json.menu.map(item => ({
                  id: item.id,
                  title: item.title,
                  description: item.description,
                  price: item.price,
                  photo: item.photo,
                  category: item.category.title,
                }));
                return convertedMenu;
              } catch (error) {
                Alert.alert(`fectchData - JSON didn't import properly: ${error.message}`);
              }
            };    
            */
  

                // Convert fetchData's parsed JSON object to 'menuItems' (only if the SQL data pull, getMenuItems, comes up empty) ==
                // The formatted data for SectionList, sectionListData, is assigned to the variable state, *data*.
                // useEffect to refresh menu data from SQLite data base...
                // *menuItems* is invoked to contain all the *fetchData* data pulled from the SQLite 'menuitems' database 
                // via the getMenuItems database function

                // ************
                // * OLD CODE *
                // ************

                        // useEffect(() => {
                        //   (async () => {
                        //     try {
                        //       await createTable();
                        //       let menuItems = await getMenuItems();
                      
                        //       if (!menuItems.length) {
                        //         const menuItems = await fetchData();
                        //         saveMenuItems(menuItems);
                        //       }
                      
                        //       const sectionListData = getSectionListData(menuItems);
                        //       setData(sectionListData);
                        //       setFilteredData(sectionListData);
                        //     } catch (e) {
                        //       // Handle error
                        //       Alert.alert(e.message);
                        //     }
                        //   })();
                        // }, []);


                        // if (!menuItems.length) {
                        //   const menuItems = await fetchData();
                        //   saveMenuItems(menuItems);
                        /*


                        await createTable();
                        let menuItems = await fetchData();
                          saveMenuItems(menuItems);


                        await createTable();
                        let menuItems = await getMenuItems();

                        if (!menuItems.length) {
                          const menuItems = await fetchData();
                          saveMenuItems(menuItems);
                        */
                        // }

                  // useEffect(() => {
                  //   (async () => {
                  //     try {
                  //       await createTable();
                  //       //const menuItems = await fetchData();
                  //       const fetchedMenuItems = await fetchData();
                  //       await saveMenuItems(fetchedMenuItems);
                  //       const sectionListData = getSectionListData(fetchedMenuItems);
                  //       setData(sectionListData);
                  //       setFilteredData(sectionListData);
                  //     } catch (e) {
                  //       // Handle error
                  //       Alert.alert(`HomeScreen useEffect: createTable, fetchData, saveMenuItems, {data}, {filteredData}`,e.message);
                  //     }
                  //   })();
                  // }, [freshData]);


                  // useEffect(() => {
                  //   (async () => {
                  //     try {
                  //       await createTable();
                  //       let menuItems = await getMenuItems();

                  //       if (!menuItems.length) {
                  //         // If SQLite data is empty, fetch data from remote URL
                  //         const fetchedMenuItems = await fetchData();
                  //         await saveMenuItems(fetchedMenuItems);
                  //         menuItems = fetchedMenuItems;
                  //       }

                  //       const sectionListData = getSectionListData(menuItems);
                  //       setData(sectionListData);
                  //       setFilteredData(sectionListData);
                  //     } catch (e) {
                  //       // Handle error
                  //       Alert.alert('HomeScreen useEffect:', e.message);
                  //     }
                  //   })();
                  // }, [freshData]);


                  // useEffect(() => {
                  //   (async () => {
                  //     try {
                  //       // Fetch data from the local JSON file
                  //       const freshData = await fetchData();
                        
                  //       // Clear existing data from SQLite
                  //       await createTable();
                  //       await saveMenuItems([]);
                  
                  //       // Save new data to SQLite
                  //       await saveMenuItems(freshData);
                  
                  //       // Set data for display
                  //       const sectionListData = getSectionListData(freshData);
                  //       setData(sectionListData);
                  //       setFilteredData(sectionListData);
                  //       console.log('useEffect *ONE TIME!* fetchData grab and update SQLite activities');
                  //     } catch (e) {
                  //       // Handle error
                  //       Alert.alert('HomeScreen useEffect:', e.message);
                  //     }
                  //   })();
                  // }, []);


          // *************************
          /* COMMENTED OUT FOR TESTING - NOW OUTDATED
          // ************************* 
          useEffect(() => {
            (async () => {
              try {
                // Fetch data from the local JSON file
                const freshData = await fetchData();
                
                // Clear existing data from SQLite
                await createTable();
                await saveMenuItems([]);
          
                // Save new data to SQLite
                await saveMenuItems(freshData);
          
                // Set data for display
          
                const sectionListData = getSectionListData(freshData);
                setData(sectionListData);
                setFilteredData(sectionListData); // This line is optional, depending on your needs
                console.log('useEffect *ONE TIME!* fetchData grab and update SQLite activities');
              } catch (e) {
                // Handle error
                Alert.alert('HomeScreen useEffect:', e.message);
              }
            })();
          }, []);

          */

                // ************
                // * OLD CODE *
                // ************
                // useUpdateEffect to refresh menu display based on what categories are currently selected/highlighted.
                // useUpdateEffect(() => {
                //   (async () => {
                //     // Trying out the 2 lines of code below to ensure the most recent menu data is being used.
                //     let fetchedMenuItems = await fetchData();
                //     await saveMenuItems(fetchedMenuItems);
                //     const activeCategories = sections.filter((s, i) => {
                //       // If all filters are deselected, all categories are active
                //       if (filterSelections.every((item) => item === false)) {
                //         return true;
                //       }
                //       return filterSelections[i];
                //     });
                //     try {
                //         const menuItems = await filterByQueryAndCategories(
                //         query,
                //         activeCategories
                //       );
                //       const sectionListData = getSectionListData(menuItems);
                //       setData(sectionListData);
                //       setFilteredData(sectionListData);  // Added a new state for filtered data
                //     } catch (e) {
                //       Alert.alert(e.message);
                //     }
                //   })();
                // }, [filterSelections, query]);


          // *************************
          /* COMMENTED OUT FOR TESTING - NOW OUTDATED
          // *************************
          useUpdateEffect(() => {
            const updateData = async () => {
              const fetchedMenuItems = await fetchData();
              await saveMenuItems(fetchedMenuItems);
              const activeCategories = sections.filter((s, i) => {
                if (filterSelections.every((item) => item === false)) {
                  return true;
                }
                return filterSelections[i];
              });
              try {
                const menuItems = await filterByQueryAndCategories(
                  query,
                  activeCategories
                );
                const sectionListData = getSectionListData(menuItems);
                setData(sectionListData);
                setFilteredData(sectionListData);
              } catch (e) {
                Alert.alert(e.message);
              }
            };
            updateData();
          }, [filterSelections, query, freshData]);


*/



// UI display elements
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.leadContentContainer}>
        <Text style={styles.displayTitleMarkazi}>
          Little Lemon
        </Text>
        <Text style={styles.headTitleMarkazi}>
          Chicago
        </Text>

      <View style={styles.leadDescriptionContainer}>
        <View style={styles.descTextContainer}>
          <Text style={styles.descTextKarla}> 
          We are a family-owned Mediterranean restaurant, 
          focused on traditional recipes served with a modern twist.
          </Text>

          <View 
            style={styles.leadButton}
            onPress={''}
          >
            <Text style={styles.abbreviationKarla}>
              Make a Reservation
            </Text>
          </View> 

          <View 
            style={styles.leadButton}
            onPress={''}
          >
            <Text style={styles.abbreviationKarla}>
              Order Delivery
            </Text>
          </View> 

          
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


      {/* 
      <ScrollView style={styles.testContentContainer}>
        <Text>{JSON.stringify(testData, null, 4)}</Text>
      </ScrollView>
       */}
      

       
      <View style={styles.menuContentContainer}>
        <Searchbar
          placeholder="Search"
          placeholderTextColor="gray"
          onChangeText={handleSearchChange}
          value={searchBarText}
          style={styles.searchBar}
          iconColor="gray"
          inputStyle={{ color: 'black' }}
          elevation={0}
          autoCapitalize='none'
          onBlur={() => {Keyboard.dismiss();}}
        />
        <Filters
          selections={filterSelections}
          onChange={handleFiltersChange}
          sections={sections}
        />
        <SectionList
          style={styles.sectionList}
          sections={filteredData}

          //keyExtractor={(item, index) => item.id || index.toString()}
          keyExtractor={(item) => item.id} // Update keyExtractor to use item.id  ***TEST CONDITION***
  
          renderItem={({ item }) => (
            <Item title={item.title} description={item.description} price={item.price} photo={item.photo} />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View> 
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#FFF',
  },

  // TESTDATA CONTAINER
  testContentContainer: {
    flex: 1,
    //width: '100%',
    //height: '100%',
    backgroundColor: '#FFF',
    paddingHorizontal: 4,
},
// MENU CONTAINERS - For menu content
  menuContentContainer: {
    flex: 1,
    width: '100%',
    height: 340,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
  },
  sectionList: {
    paddingHorizontal: 0,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderColor: 'black',
    borderWidth: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  itemText: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 6,
    backgroundColor: 'orange'
    //alignItems: 'flex-start',
    //justifyContent: 'center',
  },
  itemDescription: {
    height: 80,
    width: '100%',
    //alignItems: 'flex-start',
    //justifyContent: 'center',
  },
  itemPhoto: {
    //flex: 0.35,
    width: 133,
    height: 100,
    borderRadius: 16,
    backgroundColor: 'yellow',
    overflow: 'hidden',
  },

  header: {
    fontSize: 16,
    paddingVertical: 0,
    width: '100%',
    alignSelf: 'center',
    color: '#435F57',
    backgroundColor: '#FFF',
  },

// CONTAINERS - For leading content
  leadContentContainer: {
    flex: 1,
    width: '100%',
    //alignItems: 'center',
    //justifyContent: 'center',
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
    alignItems: 'flex-start',
    marginBottom: 16,
    marginTop: 4,
  },
  descTextContainer: {
    flex: 0.5,
    flexDirection: 'column',
    paddingRight: 12,
    //alignItems: 'flex-start',
    //justifyContent: 'center',
  },
  descImageContainer: {
    flex: 0.5,
    //width: 147,
    //height: 160,
    //alignItems: 'flex-start',
    //justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: 'white',
    overflow: 'hidden',
    //marginBottom: 10,
  },

// FONTS
  title: {
    fontSize: 18,
    color: 'black',
    //textAlign: 'center',
  },
  foodDescription: {
    fontSize: 14,
    color: 'black',
  },
  displayTitleMarkazi: {
    fontSize: 64,
    fontFamily: "MarkaziText",
    padding: 0,
    marginBottom: -18,
    color: '#F4CE14',
    textAlign: 'left',
  },
  headTitleMarkazi: {
    fontSize: 40,
    fontFamily: "MarkaziText",
    padding: 0,
    marginVertical: 0,
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
    fontWeight: '900',
    color: 'black',
    textAlign: 'center',
  },


// ELEMENTS
  descImage: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    //borderRadius: 16,
    resizeMode: 'cover',
  },
  foodImage: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    //borderRadius: 16,
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
});
