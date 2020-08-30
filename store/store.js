import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from "redux-thunk";

import recipesReducer from './reducers/recipes';

const rootReducer = combineReducers({
    recipes: recipesReducer
  });
  
// const persistConfig = {
  
//   key: 'root',
  
//   storage: AsyncStorage,
  
//   whitelist: [
//     'recipes',
//   ],
// //   blacklist: [],
// };

//const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
 // persistedReducer, 
 rootReducer,
  applyMiddleware(
    ReduxThunk
  ),
);

let persistor = persistStore(store);

export {
  store,
 // persistor,
};