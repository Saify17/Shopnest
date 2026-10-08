import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { store } from '../../redux/store'
import { Provider } from 'react-redux'

const MainLayout = () => {
  return (
    <Provider store={store}>
      <Header/>
      <Outlet/>
      <Footer/>
    </Provider>
  )
}

export default MainLayout
