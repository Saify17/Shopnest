import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { addToFav, removeFav } from '../../redux/favSlice'
import axios from 'axios'
import {addToCart, deleteCart} from '../../redux/cartSlice'
import { increment } from '../../redux/counterSlice'
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom'   // ADD: needed to make the image/title clickable-to-navigate
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
const Products = () => {
const [product, setProduct] = useState([])
let dispatch = useDispatch();

let apiProducts = ()=>{
  axios.get("https://dummyjson.com/products?limit=50&skip=144")
  .then((res)=>res.data)
  .then((finalRes)=>{
    console.log(finalRes.products)
    setProduct(finalRes.products);
  })
}

useEffect (()=>{
 apiProducts()
}, [])

  return (
    <div className="heading">
      <h1 className="text-center pt-4 font-bold text-indigo-700 ">Products Section</h1>
      
      <div className="max-w-[1410px] mx-auto grid grid-cols-4 gap-4 my-4">
        {product.map((item, index)=>{
          return <ProductCard key={item.id} {...item} fullData={item} />
        })}
        <ToastContainer/>
      </div>

    </div>
  )
}


export function ProductCard({id, thumbnail,title, rating, price, brand, tags , discountPercentage, fullData
}) {


  let dispatch = useDispatch();
let cartItem = useSelector((myStore)=> myStore.cartStore.Cart)
let checkItem = cartItem.find((item)=> item.id == id);

let favItems = useSelector((myStore)=> myStore.favStore.Fav)
let checkFav = favItems.find((item)=> item.id ==id);
  function addTooCart(){
    let cartItem = {
      id,
      qty:1,
      thumbnail,
      title,
      rating,
      price,
      brand,
      tags,
    };
    dispatch(addToCart({cartItem}));
    // console.log(cartItem)
    
    toast.success("Product added to cart");
  }

function deleteCartHandler() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(deleteCart({ id }));
      toast.warning("Product removed from cart");

      
      Swal.fire({
        title: "Deleted!",
        text: "Product removed from cart.",
        icon: "success"
      });
    }
  });
}

function toggleFavHandler(e){
  e.stopPropagation();
  if(checkFav){
    dispatch(removeFav({id}))
    toast.info("Removed from Favourites")
  }else{
    let favItem={id,
      qty:1,
      thumbnail,
      title,
      rating,
      price,
      brand,
      tags};
      dispatch(addToFav({favItem}));
      toast.success("added to Favourites");
  }
}

  return (
    <div className="group relative w-full max-w-md rounded-3xl border border-gray-100 bg-white p-4 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      
      {/* Product Image Stage */}
      <div className="relative flex h-64 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 p-6">
        
        {/* Discount Badge */}
        <span className="absolute left-3 top-3 rounded-full bg-rose-500 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          {discountPercentage} %       </span>

{/* Wishlist Button */}
<button
  type="button"
  onClick={toggleFavHandler} // NEW: makes the heart clickable
  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md transition-colors ${
    checkFav ? 'text-rose-500' : 'text-gray-400 hover:text-rose-500' // NEW: heart stays red once favorited
  }`}
  title={checkFav ? "Remove from wishlist" : "Add to wishlist"}
>
  <svg
    className="h-5 w-5"
    fill={checkFav ? "currentColor" : "none"} // NEW: this is the actual "filled vs outline" trick
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
</button>

        {/* Image */}
        <Link to={`/products/${id}` } state={{preloadedProduct: fullData}} className="flex h-full w-full items-center justify-center">
          <img
            className="h-full object-contain transition-transform duration-300 group-hover:scale-105"
            src={thumbnail}
            alt={title}
          />
        </Link>
      </div>

      {/* Content Body */}
      <div className="mt-4 space-y-3">
        {/* Brand & Rating */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            {brand}
          </span>
          <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
            <svg className="h-4 w-4 fill-amber-400 text-amber-400" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{rating} </span>
            <span className="font-normal text-gray-400">(1,233)</span>
          </div>
        </div>

        {/* Title */}
        <div>
          <Link to={`/products/${id}`} state={{preloadedProduct: fullData}} className="text-base font-bold text-gray-900 transition-colors hover:text-indigo-600">
            {title}
          </Link>
          <p className="mt-0.5 text-xs font-medium text-gray-500">
            {tags}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black tracking-tight text-gray-900">
              {price}
            </span>
            <span className="text-xs font-semibold text-gray-400 line-through">
              ${(price / (1 - discountPercentage / 100)).toFixed(2)}
            </span>
          </div>


          {
              checkItem ? 
              <button onClick={()=>{
            deleteCartHandler()
          }}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 border-none px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-600 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Remove Cart
          </button>    : 



          <button onClick={()=>{
            addTooCart()
          }}
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border-none bg-indigo-700 px-4 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-indigo-600 active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Add to cart
          </button>
            
          }
          
        </div>
      </div>  
    </div>
  );
}

export default Products
