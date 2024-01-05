import { useRef, useEffect } from 'react';

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
          price: item.price,
        })),
      };
    });
    return SECTION_LIST_MOCK_DATA;
  }

