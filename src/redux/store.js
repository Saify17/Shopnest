import { configureStore } from "@reduxjs/toolkit";
import  cartSlice  from "./cartSlice";
import counterSlice from "./counterSlice"; 
import favSlice from './favSlice'
 export let store = configureStore({
    reducer:{
        counterStore:counterSlice,
        cartStore:cartSlice,
        favStore:favSlice,
    }
 })

