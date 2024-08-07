import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header'
import ProdList from './product-list'

function App() {
  const [search, setSearch] = useState('')

  return (
    <>
      <Header search={search} setSearch={setSearch} />
      <main className='flex gap-5 p-5 max-w-7xl m-auto'>
        
        <ProdList search={search}/>

      </main>
    </>
  )
}

export default App
