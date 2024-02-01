import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

// *createTable* creates a new table in the 'little lemon' database called 'menuitems' with a primary key and...
// the following fields: uuid, title, description, price, photo, category
export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, description text, price text, photo text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

// *getMenuItems* pulls all the data from the SQLite table 'menuitems'.
export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        //resolve(rows._array);
        const menuItems = rows._array;
        resolve(menuItems);
        console.log('GetMenuItems Result:', menuItems);
      });
    });
  });
}


// *saveMenuItems* populates the SQLite table 'menuitems' with data from the JSON via fetchData > getMenuItems > menuItems 
// Ref: Coursera Note - 2. Implement a single SQL statement to save all menu data in a table called menuitems.

// export function saveMenuItems(menuItems) {
//   db.transaction((tx) => {
//     menuItems.forEach((item) => {
//       tx.executeSql (
//         'insert into menuitems (uuid, title, price, category) values(?, ?, ?, ?)',
//         [item.id, item.title, item.price, item.category]
//       );
//     });
//   });
// }

export function clearSQL() {
  db.transaction((tx) => {
    tx.executeSql('DELETE FROM menuitems', [], (_, deleteResult) => {
      console.log('clearSQL Deletion Result:', deleteResult);
    });
  });
}


export function saveMenuItems(menuItems) {
  // console.log('database.js > saveMenuItems > menuItems before save to SQL Lite:', menuItems);
  db.transaction((tx) => {
    menuItems.forEach((item) => {
      tx.executeSql (
        'INSERT OR REPLACE INTO menuitems (uuid, title, description, price, photo, category) VALUES (?, ?, ?, ?, ?, ?)',
        [item.id, item.title, item.description, item.price, item.photo, item.category]
      );
    console.log('**** database > saveMenuItems function completed. ****');
    });
  });
}


// export function saveMenuItems(menuItems) {
//   db.transaction((tx) => {
//     menuItems.forEach((item) => {
//       tx.executeSql (
//         'insert into menuitems (uuid, title, price, category) values(?, ?, ?, ?)',
//         [item.id, item.title, item.price, item.category]
//       );
//     });
//   });
// }




// Below is the most recent function from 01.31 morning. Trying to break it up to test. See code above.
// export function saveMenuItems(menuItems) {
//   console.log('database.js > saveMenuItems > menuItems before save to SQL Lite:', menuItems);
//   db.transaction((tx) => {
//     tx.executeSql('BEGIN TRANSACTION');
//       try {
//         menuItems.forEach((item) => {
//           tx.executeSql ('INSERT OR REPLACE INTO menuitems (uuid, title, description, price, photo, category) VALUES (?, ?, ?, ?, ?, ?)',
//             [item.id, item.title, item.description, item.price, item.photo, item.category],
//             (_, insertResult) => {
//               console.log('saveMenuItems Insertion Result:', insertResult);
//             }
//           );
//         });
//         tx.executeSql('COMMIT');
//       } catch (e) {
//         console.error(`Error in saveMenuItems:`,e);
//       }
//   });
// }

// export function saveMenuItems(menuItems) {
//   return new Promise((resolve, reject) => {    //NEW LINE: Maybe why menu didn't display
//     console.log('JSON Menu Items Before:', menuItems);
//     db.transaction((tx) => {
//       tx.executeSql('DELETE FROM menuitems', [], (_, deleteResult) => {
//         console.log('saveMenuItems Deletion Result:', deleteResult);
//         menuItems.forEach((item, index, array) => {
//           tx.executeSql (
//             'INSERT INTO menuitems (uuid, title, description, price, photo, category) VALUES (?, ?, ?, ?, ?, ?)',
//             [item.id, item.title, item.description, item.price, item.photo, item.category],
//             (_, insertResult) => {
//               console.log('saveMenuItems Insertion Result:', insertResult);
//               if (index === array.length - 1) {   //NEW LINE: Maybe why menu didn't display
//                 resolve();  // Resolve the promise after the last insertion   //NEW LINE: Maybe why menu didn't display
//               }
//             }
//           );
//         });
//       });
//     });
//   });
// }

// export function saveMenuItems(menuItems) {
//   return new Promise((resolve, reject) => {
//     console.log('JSON Menu Items Before:', menuItems);
//     db.transaction((tx) => {
//       tx.executeSql('DELETE FROM menuitems', [], (_, deleteResult) => {
//         console.log('saveMenuItems Deletion Result:', deleteResult);
//         menuItems.forEach((item, index, array) => {
//           tx.executeSql (
//             'INSERT INTO menuitems (uuid, title, description, price, photo, category) VALUES (?, ?, ?, ?, ?, ?)',
//             [item.id, item.title, item.description, item.price, item.photo, item.category],
//             (_, insertResult) => {
//               console.log('saveMenuItems Insertion Result:', insertResult);
//               if (index === array.length - 1) {
//                 resolve();  // Resolve the promise after the last insertion
//               }
//             }
//           );
//         });
//       });
//     });
//   });
// }



/**
Component that executes a SQL statement to filter the menu by 2 criteria: a query string and a list of categories.

 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      // Build the SQL query based on the provided conditions
      const sqlQuery = `
        SELECT *
        FROM menuitems
        WHERE 
          title LIKE ? AND 
          category IN (${activeCategories.map(() => '?').join(', ')})
      `;

      // Prepare the arguments for the SQL query
      const sqlArguments = [
        `%${query}%`,  // This will match the query as a substring of the title
        ...activeCategories,
      ];

      tx.executeSql(sqlQuery, sqlArguments, (_, { rows }) => {
        resolve(rows._array);
      }, (_, error) => {
        reject(error);
      });
    });
  });
}
