import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header'
import ProdList from './product-list'
import ProdPage from './product-page'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState([])


  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} />
        <main className='flex gap-5 p-5 max-w-7xl m-auto'>
          <Routes>
            <Route path='/' element={<ProdList search={search} allData={allData} setAllData={setAllData} />} />
            <Route path='/product-page/:productId' element={<ProdPage allData={allData}  />} />
          
          </Routes>
          
            
         
          
          

        </main>
      </Router>
      
    </>
  )
}

export default App
