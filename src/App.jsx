import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './header'
import ProdList from './product-list'
import Filter from './filter'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <main className='flex gap-5 p-5'>
        <Filter />
        <ProdList />

      </main>
    </>
  )
}

export default App
