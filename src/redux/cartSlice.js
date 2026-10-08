import { createSlice } from "@reduxjs/toolkit";

export let cartSlice = createSlice({
    name:"cart",
    initialState:{
        Cart:localStorage.getItem("CART")? JSON.parse(localStorage.getItem("CART")) : [],
    }, reducers:{
        addToCart:(state, reqData)=>{
            console.log(reqData.payload);
            let {cartItem}= reqData.payload;
            state.Cart= [cartItem, ...state.Cart]
            localStorage.setItem("CART", JSON.stringify(state.Cart))
        },
        deleteCart:(state, reqData)=>{
            let {id}= reqData.payload;
            state.Cart = state.Cart.filter((item)=> item.id!=id)
            localStorage.setItem("CART", JSON.stringify(state.Cart))
           
        }, 
        changeQty:(state,reqData)=>{
            let {id, finalQty}= reqData.payload;
            state.Cart=state.Cart.filter((item)=> {
                if(item.id==id){
                    item['qty']=finalQty 
                } return item
            })
            localStorage.setItem("CART", JSON.stringify(state.Cart))
        },
        clearCart:(state)=>{                              // NEW: no payload needed — just wipe everything
        state.Cart = [];
        localStorage.setItem("CART", JSON.stringify(state.Cart));
    },
    }
})
export const {addToCart, deleteCart, changeQty, clearCart} = cartSlice.actions
export default cartSlice.reducer
 