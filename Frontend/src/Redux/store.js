import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import userReducer from './userSlice.js';
import storage from 'redux-persist/lib/storage';
import {version} from 'react';
import persistStore from 'redux-persist/es/persistStore';

const rootReducers = combineReducers({user: userReducer})
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
}

const persisedtReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
    reducer: persisedtReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store);