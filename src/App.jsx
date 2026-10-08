import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import Cart from './components/pages/Cart'
import MainLayout from './components/common/MainLayout'
import Products from './components/pages/Products'
import Favourite from './components/pages/Favourite'
import ProductDetail from './components/pages/ProductDetail'   // ADD

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/favourite" element={<Favourite/>}/>
          <Route path="/products/:id" element={<ProductDetail/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
