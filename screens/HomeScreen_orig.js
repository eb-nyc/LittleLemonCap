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
  Image,
  Pressable,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils';

//Import menu data from a resident file
import menuData from '../assets/little-lemon-menu.json'

//const API_URL = '../assets/little-lemon-menu.json';

// {require('../assets/photo-hero-LL-sm.jpg')}
// const API_URL =
//  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
// const API_URL = {require('../assets/little-lemon-menu.json')}

const sections = ['Appetizers', 'Salads', 'Entrees'];

// This creates the layout for how each line of the menu will be displayed.
const Item = ({ title, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}</Text>
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

  // == DATA STEP A ==
  // *fetchData* grabs all the data from the API_URL and loads it to a variable called "fetchdata".
  // The method "response.json()" converts the JSON into a object variable called "json".
  // As a part of the process it transforms the field called "title" to a field called "category". 
    const fetchData = async() => {
    try {
      //const response = API_URL;
      //const json = JSON.parse(response)
      // const json = response.json();
      const json = menuData;

      // Convert the JSON array with map method so that "title" becomes "category".
      const convertedMenu = json.menu.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category.title,
      }));
      return convertedMenu;
    } catch (error) {
      Alert.alert(`JSON didn't import properly: ${error.message}`);
    }
  };    
  
// == DATA STEP B ==
// Convert fetchData's parsed JSON object to 'menuItems' (only if the SQL data pull, getMenuItems, comes up empty) ==
// The formatted data for SectionList, sectionListData, is assigned to the variable state, *data*.
// useEffect to refresh menu data from SQLite data base...
// but, if the SQLite database is empty, it loads it from the remote URL via the fetchdata function. 
// *menuItems* is invoked to contain all the *fetchData* data pulled from the SQLite 'menuitems' database 
// via the getMenuItems database function
  useEffect(() => {
    (async () => {
      try {
        await createTable();
        const menuItems = await fetchData();
        saveMenuItems(menuItems);

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

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setFilteredData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, [menuData]);

// useUpdateEffect to refresh menu display based on what categories are currently selected/highlighted.
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
        keyExtractor={(item, index) => item.id || index.toString()}
        renderItem={({ item }) => (
          <Item title={item.title} price={item.price} />
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
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 16,
    paddingVertical: 0,
    width: '100%',
    alignSelf: 'center',
    color: '#435F57',
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 20,
    color: 'black',
    //textAlign: 'center',
  },

// CONTAINERS - For leading content
  leadContentContainer: {
    flex: 0.95,
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
