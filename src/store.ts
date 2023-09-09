import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./app/product/store/products.slice";
import ordersSlice from "./app/orders/store/orders.slice";
import authSlice from "./app/auth/store/auth.slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    orders: ordersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
