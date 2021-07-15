import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { AuthReducer } from "./reducer/authReducer";
import { CartReducer } from "./reducer/cartReducer";
import { CustomerReducer } from "./reducer/customReducer";
const rootReducer = combineReducers({
  auth: AuthReducer.reducer,
  cart: CartReducer.reducer,
  customer: CustomerReducer.reducer,
});
const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
let store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});
let persistor = persistStore(store);
export { store, persistor };
