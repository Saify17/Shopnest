  import React from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { addToFav, removeFav } from "../../redux/favSlice";
  import { changeQty, deleteCart, clearCart } from "../../redux/cartSlice";
  import { toast, ToastContainer } from "react-toastify";
  import { Heart, Trash2 } from "lucide-react";
import Swal from 'sweetalert2';

  const Cart = () => {
    const dispatch = useDispatch();
    
  const cartItems = useSelector((myStore)=>myStore.cartStore.Cart);
let total = cartItems.reduce((tot,item)=> tot+=item.qty*item.price,0);
let pickup = cartItems.length > 0 ? 59 : 0;   // NEW: only charge pickup if there's actually something to pick up
let tax = 0;                       // default: empty cart = no tax
if (cartItems.length > 0) {        // same "cart not empty" gate as before
  if (total > 500) {
    tax = 30;                      // NEW: over $500 -> flat $30
  } else if (total > 300) {
    tax = 22;                      // NEW: over $300 (but not over $500) -> flat $22
  } else {
    tax = 11;                      // NEW: cart has items but under $300 -> original base tax
  }
}     // NEW: same rule — empty cart, no tax

    return (
      
      <div className="cart-theme">
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
    <div className="mx-auto max-w-7xl px-4 2xl:px-0">
      <h2 className="text-3xl! font-bold text-indigo-700 dark:text-white  sm:text-2xl">
        Shopping Cart
      </h2>
      <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="space-y-6">
            
            {cartItems.length > 0 ? cartItems.map((items, index)=>{
              return <CartItem key={items.id} {...items}/>
            })
          :
          <h1 className='py-8 text-center '>No cart found here </h1> }
          </div>
          
        </div>
        <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
          <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-2xl font-bold  text-indigo-800! dark:text-white pb-4">
              Order summary
            </p>
            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Original price
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${total.toFixed(2)}
                  </dd>
                </dl>
                
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Store Pickup
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${pickup}
                  </dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    ${tax}
                  </dd>
                </dl>
              </div>
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">
                  Total
                </dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">
                 ${(total+pickup+tax).toFixed(2)}
                </dd>
              </dl>
            </div>
        
  <button 
// ✅ REPLACE YOUR ORDER NOW onClick WITH THIS:
onClick={() => {
  if (cartItems.length === 0) {
    toast.error("Your cart is empty!");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to place this order?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, place it!"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(clearCart()); 
      Swal.fire({
        title: "Order Placed!",
        text: "Thank you for your shopping!",
        icon: "success"
      });
    }
  });
}}
     
  type="button"
  className="flex items-center gap-2 bg-indigo-800! rounded-lg border-none text-white transfrom transition-transform transition-duration-300 hover:scale-105 px-4 py-2 text-lg w-full text-center! justify-center font-semibold"
>
  Order Now!
</button>
          </div>
        
        </div>
      </div>
    </div>
    <ToastContainer/>
  </section>






      
        
      </div>
    )
  }

  export default Cart

  function CartItem({id, qty , thumbnail,title, rating, price, brand, tags , discountPercentage}){
    const favItems = useSelector((myStore) => myStore.favStore.Fav);
  const checkFav = favItems.find((item) => item.id === id);
  
  function changeQtyHandler(type){
  let finalQty=qty;
    if(type=="+"){
      finalQty=qty+1
    }else{
      
        
          if(qty>1){

            finalQty=qty-1
          }
        
      
    }  dispatch(changeQty({id, finalQty})); console.log("here is the final" , finalQty)
  }


  let dispatch=useDispatch()
    function RemoveCart(){
    
    dispatch(deleteCart({ id }));
          toast.warning("Product removed from cart");
  }


function toggleFavHandler() {
    if (checkFav) {
      // FAVORITE LOGIC (LINE 5): If item exists in favorites, dispatch remove action
      dispatch(removeFav({ id }));
      toast.info("Removed from Favourites");
    } else {
      // FAVORITE LOGIC (LINE 6): Constructing favorite object with item attributes
      let favItem = { id, qty, thumbnail, title, rating, price, brand, tags };
      // FAVORITE LOGIC (LINE 7): If item is not favorited, dispatch add action
      dispatch(addToFav({ favItem }));
      toast.success("Added to Favourites");
    }
  }


    return(
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
              <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <a href="#" className="shrink-0 md:order-1">
                  <img
                    className="h-20 w-20 dark:hidden"
                    src={thumbnail}
                    alt={title}
                  />
                  <img
                    className="hidden h-20 w-20 dark:block"
                    src={thumbnail}
                    alt={title}
                  />
                </a>
                <label htmlFor="counter-input" className="sr-only ">
                  Choose quantity:
                </label>
                <div className="flex items-center justify-between md:order-3 md:justify-end">
                  <div className="flex items-center">
                    <button onClick={()=>changeQtyHandler("-")}
                      type="button"
                      id="decrement-button"
                      data-input-counter-decrement="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                     <span className='font-bold'>-</span>
                    </button>
                    <input
                      type="text"
                      id="counter-input"
                      data-input-counter=""
                      className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0 dark:text-white"
                      placeholder=""
                      value={qty}
                      required=""
                    />
                    <button onClick={()=> changeQtyHandler("+")}
                      type="button"
                      id="increment-button"
                      data-input-counter-increment="counter-input"
                      className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                    >
                     <span className='font-bold'>+</span>
                    </button>
                  </div>
                  <div className="text-end md:order-4 md:w-32">
                    <p className="text-base font-bold text-gray-900 dark:text-white">
                      {(qty * price).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                  <a
                    href="#"
                    className="text-xl font-bold  text-gray-900 hover:underline dark:text-white"
                  >
                    {title} 
                  </a>
                  <div className='mt-2'> <span className="text-xs  font-bold uppercase tracking-widest text-green-600">
              {brand}
            </span></div>
                  <div className="flex items-center gap-4">


{/* --- ADD TO FAVORITES BUTTON --- */}
{/* Add to Favorites — Indigo Outline Gradient */}
<button
  onClick={toggleFavHandler}
  type="button"
  /* RESTORED: Kept your exact class string including 'bg-indigo-800!' */
  className="flex items-center gap-2 bg-indigo-800! rounded-lg border-none text-white transfrom transition-transform transition-duration-300 hover:scale-105 px-4 py-2 text-sm font-semibold"
>
 
  <Heart
    className={`relative z-10 h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${
      checkFav ? "fill-red-500 text-red-500" : "fill-none text-white"
    }`}
  />

  <span className="relative z-10">
    {checkFav ? "Add to Favorites" : "Add to Favorites"}
  </span>
</button>

{/* Remove — Indigo Outline Gradient */}
<button
  
  onClick={RemoveCart}
  className="flex items-center gap-2 bg-black rounded-lg  border-none text-white transfrom transition-transform transition-duration-300 hover:scale-105 px-4 py-2 text-sm font-semibold hover:bg-black "
>
  <Trash2 className="relative z-10 h-4 w-4 " />
  <span className="relative z-10">Remove</span>
</button>

                    
                  </div>
                </div>
              </div>
            </div>
    )
  }