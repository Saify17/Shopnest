import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="bg-slate-50/60 min-h-screen text-slate-800">
      
      {/* ================= HERO SECTION ================= */}
      {/* DESIGN ENHANCEMENT: Swapped flat gradient for a rich slate dark mode look with ambient radial glow spots */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 md:py-28">
        
        {/* Background Radial Glow Effects */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-600/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-screen-xl mx-auto px-4 text-center z-10">
          
          {/* Glassmorphism Badge */}
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-indigo-200 border border-white/15 text-xs md:text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-inner">
            <span>🛍️</span> Welcome to Shopnest
          </span>

          {/* High-Impact Headline with Gradient Text Accent */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight m-0">
            Everything you need,
            <br />
            <span className="bg-gradient-to-r from-indigo-300 via-white to-violet-300 bg-clip-text text-transparent">
              all in one nest.
            </span>
          </h1>

          <p className="text-slate-300 text-base md:text-lg mt-5 mb-8 max-w-xl mx-auto leading-relaxed">
            Quality products, honest prices, delivered straight to your door.
          </p>

          {/* Elevated Call-to-Action Button */}
          <Link
            to="/products"
            className="no-underline inline-flex items-center gap-2 bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Shop Now
            <span className="text-lg">→</span>
          </Link>

        </div>
      </section>

      {/* ================= WHY SHOP WITH US ================= */}
      {/* DESIGN ENHANCEMENT: Upgraded plain background boxes to white floating cards with subtle borders and icon badges */}
      <section className="max-w-screen-xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">

          {/* Feature Card 1 */}
          <div className="group bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
            {/* Styled Icon Container */}
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
              🚚
            </div>
            <h3 className="font-bold text-lg text-slate-900 mt-0 mb-2">Fast Delivery</h3>
            <p className="text-sm text-slate-500 leading-relaxed m-0">
              Get your order to your doorstep in no time.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="group bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
              ✅
            </div>
            <h3 className="font-bold text-lg text-slate-900 mt-0 mb-2">Quality Checked</h3>
            <p className="text-sm text-slate-500 leading-relaxed m-0">
              Every product picked and verified for you.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="group bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform duration-300">
              ↩️
            </div>
            <h3 className="font-bold text-lg text-slate-900 mt-0 mb-2">Easy Returns</h3>
            <p className="text-sm text-slate-500 leading-relaxed m-0">
              Not happy? Hassle-free returns, no questions.
            </p>
          </div>

        </div>
      </section>

      {/* ================= CLOSING CTA STRIP ================= */}
      {/* DESIGN ENHANCEMENT: Transformed flat section into a high-converting gradient banner container */}
      <section className="max-w-screen-xl mx-auto px-4 pb-16 md:pb-20">
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-10 md:p-14 text-center text-white shadow-xl">
          
          {/* Subtle Ambient Light Accent */}
          <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight m-0 mb-3">
              Ready to start shopping?
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Browse the full catalog and find something you'll love.
            </p>
            <Link
              to="/products"
              className="no-underline inline-block bg-white text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg hover:bg-indigo-50 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>

        </div>
      </section>

    </div>
  )
}

export default Home