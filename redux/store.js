import { configureStore } from "@reduxjs/toolkit";
import { campsitesReducer } from "../features/campsites/campsitesSlice";
import { commentsReducer } from "../features/comments/commentsSlice";
import { partnersReducer } from "../features/partners/partnersSlice";
import { promotionsReducer } from "../features/promotions/promotionsSlice";
import { favoritesReducer } from "../features/favorites/favoritesSlice";
import {
  persistStore,
  persistCombineReducers,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: true,
};

//okay, you pass this as anarguement, what exxactly is its function?

//will defintely be useful to know of this library
export const store = configureStore({
  reducer: persistCombineReducers(config, {
    campsites: campsitesReducer,
    comments: commentsReducer,
    partners: partnersReducer,
    promotions: promotionsReducer,
    favorites: favoritesReducer,
  }),

  //interesting, use middleware to test the state of the data and redirect/cancel the api call that would be run usually...redux app uses middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
