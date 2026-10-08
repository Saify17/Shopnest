import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'

const Header = () => {
  // State for mobile menu and user dropdown toggles
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Redux state
  const favNumber = useSelector((myStore) => myStore.favStore.Fav.length)
  const cartCount = useSelector((myStore) => myStore.cartStore.Cart.length)

  return (
    <div>
      {/* ================= MAIN NAVIGATION WRAPPER ================= */}
      {/* CHANGED: bg-white -> bg-white + bottom border now indigo-tinted instead of plain slate, gives brand feel */}
      <nav className="bg-white sticky w-full z-20 top-0 border-b border-indigo-100 shadow-sm">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">

          {/* ================= BRAND LOGO SECTION ================= */}
          {/* CHANGED: was <a href="https://flowbite.com/"> with Flowbite logo image + "Flowbite" text
              -> now a simple text/emoji brand mark for Shopnest, no external link, no broken image dependency */}
          <Link
            to="/"
            className="no-underline flex items-center space-x-2 rtl:space-x-reverse"
          >
            <span className="text-2xl">🛍️</span>
            <span className="self-center text-xl text-indigo-700 font-extrabold whitespace-nowrap tracking-tight">
              Shopnest
            </span>
          </Link>

          {/* ================= USER MENU & MOBILE TOGGLE ================= */}
          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            
            {/* User Dropdown Toggle Button */}
           <div className="w-12  shadow-sm h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-700 text-white font-bold text-2xl flex justify-center items-center">
                S
              </div>

            {/* Dropdown Menu (Controlled by isDropdownOpen state) */}
            <div
              className={`z-50 ${
                isDropdownOpen ? 'block' : 'hidden'
              } absolute right-4 top-16 bg-white border border-indigo-100 rounded-xl shadow-lg w-44`}
              id="user-dropdown"
            >
              {/* CHANGED: "Joseph McFall / name@flowbite.com" -> generic Shopnest user placeholder */}
              <div className="px-4 py-3 text-sm border-b border-indigo-50">
                <span className="block text-slate-900 font-medium">Guest User</span>
                <span className="block text-slate-500 truncate">you@shopnest.com</span>
              </div>
              
              <ul
                className="list-none p-2 text-sm text-slate-600 font-medium m-0"
                aria-labelledby="user-menu-button"
              >
                <li>
                  <a
                    href="#"
                    className="no-underline inline-flex items-center w-full p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline inline-flex items-center w-full p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline inline-flex items-center w-full p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="no-underline inline-flex items-center w-full p-2 hover:bg-indigo-50 hover:text-indigo-700 rounded-lg"
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>

            {/* Mobile Hamburger Menu Button (Controlled by isNavOpen state) */}
            <button
              type="button"
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-slate-600 rounded-lg md:hidden hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
              aria-controls="navbar-user"
              aria-expanded={isNavOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth={2}
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {/* ================= NAV LINKS LIST ================= */}
          <div
            className={`items-center justify-between ${
              isNavOpen ? 'block' : 'hidden'
            } w-full md:flex md:w-auto md:order-1`}
            id="navbar-user"
          >
            {/* Added 'list-none' to eliminate bullet points while keeping the styled box intact */}
            <ul className="list-none font-medium flex flex-col p-4 md:p-3 mt-4 border border-indigo-100 rounded-xl bg-indigo-50 md:flex-row md:items-center md:space-x-8 rtl:space-x-reverse md:mt-0 md:bg-white m-0">
              
              {/* HOME LINK */}
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `no-underline block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                      isActive
                        ? 'text-indigo-700 font-bold'
                        : 'text-slate-700 font-medium hover:text-indigo-700'
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              {/* PRODUCTS LINK */}
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `no-underline block py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                      isActive
                        ? 'text-indigo-700 font-bold'
                        : 'text-slate-700 font-medium hover:text-indigo-700'
                    }`
                  }
                >
                  Products
                </NavLink>
              </li>

              {/* CART LINK */}
              <li>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `no-underline flex items-center gap-2 py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
                      isActive
                        ? 'text-indigo-700 font-bold'
                        : 'text-slate-700 font-medium hover:text-indigo-700'
                    }`
                  }
                >
                  Cart
                  <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-rose-500 rounded-full">
                    {cartCount}
                  </span>
                </NavLink>
              </li>


<li>
  <NavLink
    to="/favourite"
    className={({ isActive }) =>
     
      `no-underline flex items-center gap-2 py-2 px-3 rounded md:hover:bg-transparent md:border-0 md:p-0 ${
        isActive
          ? 'text-indigo-700 font-bold'
          : 'text-slate-700 font-medium hover:text-indigo-700'
      }`
    }
  >
    Favourite
    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-rose-500 rounded-full">
      {favNumber}
    </span>
  </NavLink>
</li>

            </ul>
          </div>

        </div>
      </nav>
    </div>
  )
}

export default Header