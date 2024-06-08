import { configureStore } from "@reduxjs/toolkit";
import { productCartApi } from "../features/cart/cart";

const store = configureStore({
  reducer: {
    [productCartApi.reducerPath]: productCartApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productCartApi.middleware),
});

export default store;
