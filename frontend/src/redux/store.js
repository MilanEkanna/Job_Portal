


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { jobSlice } from "./jobSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { companySlice } from "./companySlice";
import { applicationSlice } from "./applicationSlice";


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}


const rootReducer = combineReducers({
  auth: authSlice.reducer,
  jobs: jobSlice.reducer,
  company: companySlice.reducer,
  application: applicationSlice.reducer,
  // add more reducers here
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),

  // reducer: {
  //   auth: authSlice.reducer,
  //   jobs: jobSlice.reducer
  // },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
  //   immutableCheck: false, // disable immutable checks it ensures that the state object remain immutable once it created
  //   serializableCheck: false, //In the context of programming, particularly in JavaScript and Redux, serialization typically involves converting an object into a string format (like JSON) that can be saved to a file, sent over a network, or stored in a database. 
  //   // -->> json.parse is used to convert an serialized object back to deserialized object
  //   // -->> json.stringify is used to convert an deserialized object to serialized object

  // }),
});

export default store;