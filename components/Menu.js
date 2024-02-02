import { useState} from 'react';
import { View, Pressable, Text, StyleSheet, Image } from 'react-native';


const IntroContent = () => {
  return (
    <View style={styles.leadContentContainer}>
      <Text style={styles.displayTitleMarkazi}>Little Lemon</Text>
      <Text style={styles.headTitleMarkazi}>Chicago</Text>
      <View style={styles.leadDescriptionContainer}>
        <View style={styles.descTextContainer}>
            <Text style={styles.descTextKarla}> 
          We are a family-owned Mediterranean restaurant, 
          focused on traditional recipes served with a modern twist.
          </Text>
          <View style={styles.leadButton} onPress={''}>
            <Text style={styles.abbreviationKarla}>Make a Reservation</Text>
          </View> 
          <View style={styles.leadButton} onPress={''}>
            <Text style={styles.abbreviationKarla}>Order Delivery</Text>
          </View>
        </View> 
        <View style={styles.descImageContainer}>
          <Image
            style={styles.descImage}
            source={require('../assets/photo-hero-LL-sm.jpg')}
            accessible={true}
            accessibilityLabel={'Food tray presenting sample of foods'}
          />
        </View>
      </View>
    </View>
  );
}


const NoSelectedFilters = ({setCategoryIndex}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Pressable 
        onPress={() => {
          setCategoryIndex(1);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Appetizers
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(2);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Salads
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(3);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Entrees
          </Text>
        </View>
      </Pressable>
    </View>
  );
}


const AppetizerFilter = ({setCategoryIndex}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Pressable 
        onPress={() => {
          setCategoryIndex(0);
        }}
      >
        <View style={styles.categoryFillContainer}>
          <Text style={styles.categoryText}>
            Appetizers
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(2);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Salads
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(3);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Entrees
          </Text>
        </View>
      </Pressable>
    </View>
  );
}


const SaladFilter = ({setCategoryIndex}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Pressable 
        onPress={() => {
          setCategoryIndex(1);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Appetizers
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(0);
        }}
      >
        <View style={styles.categoryFillContainer}>
          <Text style={styles.categoryText}>
            Salads
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(3);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Entrees
          </Text>
        </View>
      </Pressable>
    </View>
  );
}


const EntreeFilter = ({setCategoryIndex}) => {
  return (
    <View style={styles.categoriesContainer}>
      <Pressable 
        onPress={() => {
          setCategoryIndex(1);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Appetizers
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(2);
        }}
      >
        <View style={styles.categoryCellContainer}>
          <Text style={styles.categoryText}>
            Salads
          </Text>
        </View>
      </Pressable>
      <Pressable 
        onPress={() => {
          setCategoryIndex(0);
        }}
      >
        <View style={styles.categoryFillContainer}>
          <Text style={styles.categoryText}>
            Entrees
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const AppetizerMenu = () => {
  return (
    <>
      {/* ****FOOD ITEM #1 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Hummus with Pita Bread</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
          Crafted from chickpeas, tahini, and a blend of spices, served with lightly toasted pita bread.
        </Text>
        <Text style={styles.foodPrice}>$10.99</Text>
        </View>

        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-hummus-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Bowl of delectable, creamy hummus with pita bread triangles to the side.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #2 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Falafel</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Deep-fried chickpea or fava bean patties, often served with tahini sauce or in pita bread.
        </Text>
        <Text style={styles.foodPrice}>$12.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-falafel-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable falafel.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #3 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Dolma</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Grape leaves stuffed with a mixture of rice, pine nuts, and herbs.
        </Text>
        <Text style={styles.foodPrice}>$14.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-stuffedgrapeleaves-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable stuffed grape leaves.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #4 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Brushetta</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Grilled bread rubbed with garlic and topped with diced tomatoes, basil, and olive oil.
        </Text>
        <Text style={styles.foodPrice}>$10.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-bruschetta-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable Brushetta.'}
            />
        </View>
      </View>
    </>
  );
}



const SaladMenu = () => {
  return (
    <>
      {/* ****FOOD ITEM #1 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Caprese Salad</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Tomatoes, fresh mozzarella, and basil, drizzled with olive oil and balsamic glaze.
        </Text>
        <Text style={styles.foodPrice}>$12.99</Text>
        </View>

        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-caprese-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable Caprese salad'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #2 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Greek Salad</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Seasoned tomato, cucumbers, olives, red onions, and feta cheese, drizzled with olive oil.
        </Text>
        <Text style={styles.foodPrice}>$13.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-greeksalad-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable Greek salad.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #3 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Tabbouleh</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Finely chopped parsley, tomatoes, mint, onion, bulgur, with olive oil and lemon juice.
        </Text>
        <Text style={styles.foodPrice}>$11.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-tabbouleh-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable Tabbouleh.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #4 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Chickpea Salad</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Chickpeas, cherry tomatoes, cucumbers, red onions, feta cheese, olive oil & dressing.
        </Text>
        <Text style={styles.foodPrice}>$11.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-chickpea-salad-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of delectable chickpea salad.'}
            />
        </View>
      </View>
    </>
  );
}



const EntreeMenu = () => {
  return (
    <>
      {/* ****FOOD ITEM #1 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Grilled Souvlaki</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Skewers of marinated and grilled lamb or chicken, served with pita bread and tzatziki.
        </Text>
        <Text style={styles.foodPrice}>$18.99</Text>
        </View>

        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-souvlaki-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Plate filled with savory souvlaki.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #2 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Ratatouille</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Vegetable stew with eggplant, zucchini, bell peppers, tomatoes, and herbs.
        </Text>
        <Text style={styles.foodPrice}>$16.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-ratatouille-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Bowl of delectable Ratatouille.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #3 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Seafood Risotto</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Creamy Italian rice dish cooked with a variety of fresh seafood, herbs, and saffron.
        </Text>
        <Text style={styles.foodPrice}>$21.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-risotto-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Bowl of delectable seafood risotta with shrimp.'}
            />
        </View>
      </View>

      {/* ****FOOD ITEM #4 **** */}
      <View style={styles.item}>
        <View style={styles.itemTextContainer}>
          <Text style={styles.foodTitle}>Grilled Swordfish</Text>
        <View style={styles.itemDescription}>
        <Text style={styles.foodDescription}>
        Freshly grilled swordfish seasoned with olive oil, lemon, & herbs. Served with potatoes.
        </Text>
        <Text style={styles.foodPrice}>$25.99</Text>
        </View>
        </View>
        <View style={styles.itemPhoto}>
          <Image
              style={styles.descImage}
              source={require('../assets/food-grilledswordfish-sm.jpg')}
              accessible={true}
              accessibilityLabel={'Photo of grilled swordfish on a flaming grill with potatoes.'}
            />
        </View>
      </View>
    </>
  );
}




export const Menu = () => {
  const [categoryIndex, setCategoryIndex] = useState(0);

  let result;
  switch (categoryIndex) {
    case 0:
      result = 
        <>
          <NoSelectedFilters setCategoryIndex={setCategoryIndex}/>
          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Appetizers</Text>
          </View>
          <AppetizerMenu />

          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Salads</Text>
          </View>
          <SaladMenu />

          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Entrees</Text>
          </View>
          <EntreeMenu />
        </>
      break;
    case 1:
      result = 
        <>
          <AppetizerFilter setCategoryIndex={setCategoryIndex}/>
          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Appetizers</Text>
          </View>
          <AppetizerMenu />
        </>
      break;
    case 2:
      result = 
        <>
          <SaladFilter setCategoryIndex={setCategoryIndex}/>
          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Salads</Text>
          </View>
          <SaladMenu />
        </>
      break;
    case 3:
      result = 
        <>
          <EntreeFilter setCategoryIndex={setCategoryIndex}/>
          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Entrees</Text>
          </View>
          <EntreeMenu />
        </>
      break;   
    default:
      result = 
        <>
          <NoSelectedFilters setCategoryIndex={setCategoryIndex}/>
          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Appetizers</Text>
          </View>
          <AppetizerMenu />

          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Salads</Text>
          </View>
          <SaladMenu />

          <View style={styles.menuHeaderContainer}>
            <Text style={styles.menuHeader}>Entrees</Text>
          </View>
          <EntreeMenu />
        </>;
  }

  return <View>{result}</View>;
};




const styles = StyleSheet.create({

// MENU CONTAINERS - For menu content
  menuContentContainer: {
    flex: 1,
    width: '100%',
    height: 340,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
  },
  categoriesContainer: {
    //flex: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: 'black',
  },
  categoryCellContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6.4%',
    paddingVertical: 7,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
  },
  categoryFillContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '6.6%',
    paddingVertical: 7,
    backgroundColor: '#F4CE14',
    borderWidth: 0.5,
    borderColor: 'black',
    overflow: 'hidden',
  },
  menuHeaderContainer: {
    padding: 0,
    width: '100%',
    height: 20,
    marginVertical: 8,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
    height: 120,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderColor: '#D9D9D9',
    borderBottomWidth: 1,
  },
  itemTextContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 6,
  },
  itemDescription: {
    height: 80,
    width: '100%',
    marginTop: 4,
  },
  itemPhoto: {
    width: 133,
    height: 100,
    borderRadius: 16,
    backgroundColor: 'yellow',
    overflow: 'hidden',
  },


// FONTS
  menuHeader: {
    fontSize: 16,
    width: '100%',
    color: '#435F57',
    backgroundColor: '#FFF',
    textAlign: 'center',
    fontFamily: "Karla",
  },
  categoryText: {
    fontSize: 18,
    color: 'black',
    fontFamily: "Karla",
    //textAlign: 'center',
  },
  foodTitle: {
    fontSize: 18,
    color: 'black',
  },
  foodDescription: {
    fontSize: 14,
    color: 'black',
    fontFamily: "Karla",
  },
  foodPrice: {
    fontSize: 14,
    color: 'black',
    marginTop: 6,
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


// INTRO CONTENT STYLES
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
  // height: '30%',
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

// INTRO CONTENT FONTS
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
  fontWeight: '900',
  color: 'black',
  textAlign: 'center',
},


// INTRO CONTENT ELEMENTS
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

});