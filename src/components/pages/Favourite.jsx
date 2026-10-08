import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFav } from '../../redux/favSlice'          // STEP 1: bring in the ONE action this page needs — it only ever removes, never adds
import { toast, ToastContainer } from 'react-toastify'
import { Heart, Trash2 } from 'lucide-react'                // same icon set Cart.jsx already uses, keeps the whole app visually consistent
import { Link } from 'react-router-dom'

const Favourite = () => {
  // STEP 2: pull the favorites array straight out of favStore — this one line IS the page's entire data source
  const favItems = useSelector((myStore) => myStore.favStore.Fav)

  return (
    <div className="cart-theme">
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-7xl px-4 2xl:px-0">

          <h2 className="text-2xl font-semibold text-gray-900 sm:text-2xl flex items-center gap-2">
            <Heart className="h-6 w-6 fill-rose-500 text-rose-500" />
            My Favourites
          </h2>

          <div className="mt-6 sm:mt-8">
            {/* STEP 3: identical branching pattern to Cart.jsx — length check decides grid vs empty message */}
            {favItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {favItems.map((item) => (
                  <FavouriteCard key={item.id} {...item} />   // STEP 4: one card per saved item, id used as the React key
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-gray-500 mb-4">No favourites yet — items you heart will show up here.</p>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 bg-indigo-800 text-white rounded-lg px-4 py-2 text-sm font-semibold hover:scale-105 transition-transform"
                >
                  Browse Products
                </Link>
              </div>
            )}
          </div>

        </div>
        <ToastContainer />
      </section>
    </div>
  )
}

export default Favourite

// STEP 5: a self-contained card — same "component owns its own dispatch" pattern as CartItem in Cart.jsx
function FavouriteCard({ id, thumbnail, title, price, brand }) {
  const dispatch = useDispatch()

  function removeFavHandler() {
    // STEP 6: same shape as Cart.jsx's RemoveCart — hand over just the id, the reducer does the actual filtering
    dispatch(removeFav({ id }))
    toast.warning("Removed from Favourites")
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <img src={thumbnail} alt={title} className="h-40 w-full object-contain mb-4" />
      <h3 className="text-lg font-bold text-gray-900 truncate m-0">{title}</h3>
      <span className="text-xs font-bold uppercase tracking-widest text-green-600">{brand}</span>
      <div className="flex items-center bg-gray-50! justify-between mt-4">
        <p className="text-base font-bold text-gray-900 m-0">${price}</p>
        <button
          onClick={removeFavHandler}
          className="flex items-center gap-2 bg-indigo-800! rounded-lg border-none text-white transition-transform hover:scale-105 px-3 py-2 text-sm font-semibold"
        >
          <Trash2 className="h-4 w-4" />
          Remove
        </button>
      </div>
    </div>
  )
}