import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { persistedLoginReducer } from './persistConfig';
import registerReducer from '../features/register/register';

const rootReducer = combineReducers({
  login: persistedLoginReducer,
  register: registerReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['login'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };
