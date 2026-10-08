import { createSlice } from "@reduxjs/toolkit";

export let favSlice = createSlice({
    name:"fav",
    initialState:{
        Fav: localStorage.getItem("Fav")? JSON.parse(localStorage.getItem("Fav")):[],
    },
    reducers:{
        addToFav:(state, reqData)=>{
        let {favItem}= reqData.payload;
        state.Fav=[favItem, ...state.Fav]
        localStorage.setItem("Fav", JSON.stringify(state.Fav));
        },
        removeFav:(state,reqData)=>{
            let{id}= reqData.payload;
            state.Fav = state.Fav.filter((item)=> item.id!=id);
            localStorage.setItem("Fav", JSON.stringify(state.Fav))

        }
    }
})

export const {addToFav, removeFav} = favSlice.actions;
export default favSlice.reducer;