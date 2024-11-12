import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage is localStorage
import listsReducer from '@/redux/listsReducer';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';

const userPersistConfig = {
  key: 'user',
  storage,
};
const listsPersistConfig = {
  key: 'lists',
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedListsReducer = persistReducer(listsPersistConfig, listsReducer);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    lists: persistedListsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
