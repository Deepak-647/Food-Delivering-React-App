import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import coordsSlice from "./coordsSlice";

const store = configureStore({
     reducer:{
        cart :cartSlice,
        coords:coordsSlice
     }
})

export default store;