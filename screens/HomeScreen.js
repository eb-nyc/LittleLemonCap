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
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../database';
import Filters from '../components/Filters';
import { getSectionListData, useUpdateEffect } from '../utils';

const API_URL =
  'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';

const sections = ['Appetizers', 'Salads', 'Beverages'];

// This creates the layout for how each line of the menu will be displayed.
const Item = ({ title, price }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.title}>${price}.00</Text>
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
      const response = await fetch(API_URL);
      const json = await response.json();

      // Convert the JSON array with map method so that "title" becomes "category".
      const convertedMenu = json.menu.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        category: item.category.title,
      }));
      return convertedMenu;
    } catch (error) {
      Alert.alert(`JSON didn't import properly: ${e.message}`);
    }
  };    
  
// == DATA STEP B ==
// Convert fetchData's parsed JSON object to 'menuItems' (only if the SQL data pull, getMenuItems, comes up empty) ==
// The formatted data for SectionList, sectionListData, is assigned to the variable state, *data*.
// useEffect to refresh menu data from SQLite data base...
// but, if the SQLite database is empty, it loads it from the remote URL via the fetchdata function. 
// *menuItems* is invoked to contain all the *fetchData* data pulled from the SQLite 'menuitems' database via the getMenuItems database function
  useEffect(() => {
    (async () => {
      try {
        await createTable();
        let menuItems = await getMenuItems();

        if (!menuItems.length) {
          const menuItems = await fetchData();
          saveMenuItems(menuItems);
        }

        const sectionListData = getSectionListData(menuItems);
        setData(sectionListData);
        setFilteredData(sectionListData);
      } catch (e) {
        // Handle error
        Alert.alert(e.message);
      }
    })();
  }, []);

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
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: 'white' }}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#495E57',
  },
  sectionList: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 24,
    backgroundColor: '#495E57',
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
    fontSize: 24,
    paddingVertical: 8,
    color: '#FBDABB',
    backgroundColor: '#495E57',
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
});
