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
    {console.log('HomeScreen > Item > Confirmation that a SectionList item is being rendered.')}
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
      ) : (
        console.log('HomeScreen > Item > {photo} not found for an item.')
      )}
    </View>
  </View>
);


// MAIN COMPONENT DECLARATION & EXPORT STATEMENT
export default function App() {

  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );
  const [filteredData, setFilteredData] = useState([]);

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
      throw error;
    }
  };    


  useEffect(() => {
    const fetchDataAndSave = async () => {
      try {
        // Fetch data from the local JSON file, create table, and save new data to SQLite
        const menuItems = await fetchData();
        await createTable();
        await clearSQL();
        await saveMenuItems(menuItems);
  
        // Set data for display
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setFilteredData(sectionListData); // This line is optional, depending on your needs
        console.log('HomeScreen > useEffect *ONE TIME!* fetchData grab and populate SQL with JSON file data');
      } catch (e) {
        Alert.alert('HomeScreen useEffect:', e.message);
      }
    };
    fetchDataAndSave();
  }, []);


  useUpdateEffect(() => {
    (async () => {
      try {
        // Fetch data from the local JSON file, create table, and save new data to SQLite
        const menuItems = await fetchData();
        console.log('HomeScreen > useUpdateEffect > const menuItems = await fetchData completed.');
        //await clearSQL();
        await saveMenuItems(menuItems);
        console.log(`DATA UPDATE TRIGGERED. HomeScreen > useUpdateEffect: saveMenuItems(menuItems)`);
      } catch (e) {
        Alert.alert('ERROR> HomeScreen useUpdateEffect:', e.message);
      }
    })();
  }, [freshData]);
  

  // const updateFilteredMenu = async (filterSelections, query) => {
  //   const activeCategories = sections.filter((s, i) => {
  //     // If all filters are deselected, all categories are active
  //     if (filterSelections.every((item) => item === false)) {
  //       console.log(`HomeScreen > useUpdateEffect > activeCategories. App has determined that all items in every {filterSelection} is false.`);
  //       return true;
  //     }
  //     console.log('HomeScreen > useUpdateEffect: System has executed [return filterSelection(i).');
  //     return filterSelections[i];
  //   });

  const updateFilteredMenu = async (filterSelections, query) => {
    const activeCategories = sections.filter((_, i) => filterSelections[i]);  

    try {
      const filteredMenu = await filterByQueryAndCategories(query,activeCategories);
      return(filteredMenu);
    } catch (e) {
      Alert.alert(e.message);
      throw e;
    }
  };


  useUpdateEffect(() => {
    const updateMenuItems = async () => {
      try {
        const checkMenuItems = await fetchData();
        await saveMenuItems(checkMenuItems);
        let menuItems = await updateFilteredMenu(filterSelections, query);
        console.log(`HomeScreen > useUpdateEffect > updateFilteredMenu`);
        console.log(`HomeScreen > useUpdateEffect > *menuItems* from filterByQueryAndCategories:`,menuItems);
        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        console.log(`HomeScreen > useUpdateEffect > *sectionListData*:`,sectionListData);
        console.log(`HomeScreen > useUpdateEffect > *data:`,data);
        setFilteredData(sectionListData);  // Added a new state for filtered data
        console.log(`HomeScreen > useUpdateEffect > *sectionListData* sent to setFilterdData:`,sectionListData);
        console.log(`HomeScreen > useUpdateEffect > *filteredData:`,filteredData);
      } catch (error) {
        console.error('HomeScreen > useUpdateEffect > menuItems=updateFilteredMenu', error);
      }
    };
    updateMenuItems();
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