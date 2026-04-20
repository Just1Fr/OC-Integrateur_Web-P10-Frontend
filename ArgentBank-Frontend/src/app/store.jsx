import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import authReducer from '../features/auth/authSlice'

const storage = {
    getItem: (key) => {
        return Promise.resolve(localStorage.getItem(key))
    },
    setItem: (key, value) => {
        return Promise.resolve(localStorage.setItem(key, value))
    },
    removeItem: (key) => {
        return Promise.resolve(localStorage.removeItem(key))
    },
}

const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["auth"],
    timeout: 0,
}

const reducers = combineReducers({
    auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['_persist'],
            },
        }),
})

export const persistor = persistStore(store)

export default store