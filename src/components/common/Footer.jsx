import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-indigo-100 text-slate-600">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-10">
          
          {/* ================= BRAND & SLOGAN ================= */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="no-underline inline-flex items-center space-x-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-2xl font-extrabold text-indigo-700 tracking-tight">
                Shopnest
              </span>
            </Link>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed m-0">
              Your modern destination for everyday essentials and quality products delivered directly to your doorstep.
            </p>
          </div>

          {/* ================= LINK COLUMNS ================= */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Shop Links */}
            <div>
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3 mt-0">
                Shop
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-sm">
                <li>
                  <Link to="/" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    All Products
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3 mt-0">
                Company
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-sm">
                <li>
                  <a href="#" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-3 mt-0">
                Legal
              </h3>
              <ul className="list-none p-0 m-0 space-y-2 text-sm">
                <li>
                  <a href="#" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="no-underline text-slate-600 hover:text-indigo-700 transition-colors">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ================= BOTTOM COPYRIGHT BAR ================= */}
        <div className="pt-6 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="m-0 text-center sm:text-left">
            © {new Date().getFullYear()}{' '}
            <Link to="/" className="no-underline text-indigo-700 font-semibold hover:underline">
              Shopnest
            </Link>
            . All Rights Reserved.
          </p>
          <div className="flex space-x-6 text-slate-400">
            <a href="#" className="no-underline hover:text-indigo-700 transition-colors">
              Privacy
            </a>
            <a href="#" className="no-underline hover:text-indigo-700 transition-colors">
              Terms
            </a>
            <a href="#" className="no-underline hover:text-indigo-700 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer