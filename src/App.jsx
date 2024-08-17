import { useState } from 'react'
import './App.css'
import Header from './header'
import ProdList from './product-list'
import ProdPage from './product-page'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ProductProvider } from './productContext'
import Wishlist from './wishlist'
import cart from './cart' 


function App() {
  // const [search, setSearch] = useState('')
  // const [allData, setAllData] = useState([])



  return (
    <>
      <ProductProvider>
        <Router>
          <Header />
          <main className='flex gap-5 p-5 max-w-7xl m-auto'>
            <Routes>
              <Route path='/' element={<ProdList />} />
              <Route path='/product-page/:productId' element={<ProdPage   />} />
              <Route path='/wishlist' element={<Wishlist />}/>
        
            </Routes>
          </main>
        </Router>
      </ProductProvider>
      
    </>
  )
}

export default App
