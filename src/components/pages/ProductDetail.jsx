import React, { useEffect, useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteCart } from '../../redux/cartSlice'   // actions this page needs to talk to cartSlice
import { addToFav, removeFav } from '../../redux/favSlice'      // actions this page needs to talk to favSlice
import { toast, ToastContainer } from 'react-toastify'
import { Heart, ShoppingCart } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()               // pulls the value sitting in the URL where ":id" is — e.g. "/products/5" -> id = "5"
  const location = useLocation()           // reads whatever data rode along with the navigation itself (the Link's `state` prop)

  // CHAIN: this is where the data handed over by Products.jsx's <Link state={{preloadedProduct: fullData}}> lands
  const preloaded = location.state?.preloadedProduct
  // only trust it if its id actually matches the URL's id — guards against a stale/wrong hand-off
  const [product, setProduct] = useState(preloaded?.id == id ? preloaded : null)
  const [loading, setLoading] = useState(!product)   // if we already have preloaded data, we're NOT loading — skip the spinner

  const dispatch = useDispatch()                                          // the "send" function — used later to fire actions at the slices
  const cartItems = useSelector((myStore) => myStore.cartStore.Cart)      // CHAIN: reads the SAME array Cart.jsx/Header read — one shared source
  const favItems  = useSelector((myStore) => myStore.favStore.Fav)        // CHAIN: reads the SAME array Favourite.jsx/Header read

  useEffect(() => {
    if (product) return                          // CHAIN: if Step 1 (preloadedProduct) already filled `product`, stop here — no network call needed
    setLoading(true)
    axios.get(`https://dummyjson.com/products/${id}`)   // fallback path — only runs on refresh / direct link / missing preload
      .then((res) => setProduct(res.data))              // CHAIN: API response -> stored in `product` state -> triggers a re-render below
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [id])                                        // re-runs this whole effect if `id` ever changes (e.g. clicking a different product while already here)

  if (loading) return <p className="text-center py-16">Loading product...</p>
  if (!product) return <p className="text-center py-16">Product not found.</p>

  // pulling the individual fields OUT of the `product` object, so the JSX below can use {title} instead of {product.title}
  const { title, description, price, brand, rating, discountPercentage, stock, category, thumbnail } = product

  // CHAIN: same "is this id already in that list?" check used in Cart.jsx and Products.jsx — just re-run here against THIS product's id
  const checkItem = cartItems.find((item) => item.id == id)
  const checkFav  = favItems.find((item) => item.id == id)

  function addTooCart() {
    // CHAIN: builds a box with only what's needed to display later in Cart.jsx — this shape must match what cartSlice's reducer expects
    let cartItem = { id: product.id, qty: 1, thumbnail, title, rating, price, brand, tags: product.tags, discountPercentage }
    dispatch(addToCart({ cartItem }))   // CHAIN: fires -> cartSlice's addToCart reducer unwraps {cartItem} -> pushes into Cart array -> saves to localStorage
    toast.success("Added to cart")
  }

  function deleteCartHandler() {
    dispatch(deleteCart({ id: product.id }))   // CHAIN: fires -> cartSlice's deleteCart reducer filters this id OUT of Cart array -> saves to localStorage
    toast.warning("Removed from cart")
  }

  function toggleFavHandler() {
    if (checkFav) {
      dispatch(removeFav({ id: product.id }))   // CHAIN: -> favSlice removes this id from Fav array -> localStorage updates -> Header badge count drops
      toast.info("Removed from Favourites")
    } else {
      let favItem = { id: product.id, thumbnail, title, price, brand }   // only the fields Favourite.jsx's cards actually display
      dispatch(addToFav({ favItem }))   // CHAIN: -> favSlice adds it to Fav array -> localStorage updates -> Header badge count rises
      toast.success("Added to Favourites")
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Link to="/products" className="text-indigo-700 text-sm font-medium hover:underline">← Back to Products</Link>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        <img src={thumbnail} alt={title} className="w-full rounded-xl border border-gray-200 object-contain h-98" />

        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-green-600">{brand}</span>
          <h1 className="text-3xl font-extrabold text-gray-900 mt-1">{title}</h1>
          <p className="text-gray-500 mt-3">{description}</p>

          <div className="flex items-center gap-3 mt-4">
            <span className="text-2xl font-bold text-indigo-700">${price}</span>
            {discountPercentage > 0 && (
              <span className="text-sm text-rose-500 font-semibold">-{discountPercentage.toFixed(0)}% off</span>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-2">Rating: {rating} ⭐ | Stock: {stock} | Category: {category}</p>

          <div className="flex items-center gap-4 mt-6">
            {/* checkItem decides BOTH the label AND which function fires — one button, two behaviors, same trick as Products.jsx's cart button */}
            <button
              onClick={checkItem ? deleteCartHandler : addTooCart}
              className="flex items-center gap-2 bg-indigo-800 rounded-lg text-white px-5 py-3 text-sm font-semibold hover:scale-105 transition-transform"
            >
              <ShoppingCart className="h-4 w-4" />
              {checkItem ? "Remove from Cart" : "Add to Cart"}
            </button>

            {/* checkFav flips the icon fill + label — same filled-vs-outline heart trick as Products.jsx and Cart.jsx */}
            <button
              onClick={toggleFavHandler}
              className="flex items-center gap-2 bg-black rounded-lg text-white px-5 py-3 text-sm font-semibold hover:scale-105 transition-transform"
            >
              <Heart className={`h-4 w-4 ${checkFav ? "fill-red-500 text-red-500" : "fill-none text-white"}`} />
              {checkFav ? "In Favourites" : "Add to Favourites"}
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />x
    </div>
  )
}

export default ProductDetail