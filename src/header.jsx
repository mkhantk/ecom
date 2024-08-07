import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Header = ({ search, setSearch }) => {
    // const [search, setSearch] = useState('')

    function handleSearch(e) {
        // console.log(e.target.value)
        setSearch(e.target.value)
        console.log(search)
    }

    return(
        <>
            <header className="flex gap-5 justify-end items-center p-5 bg-green-600 bg-opacity-20 mb-5">
                <h1 className="logo mr-auto text-5xl font-bold">Ecom</h1>
                <div className="relative flex justify-center items-center mr-auto">
                    <input type="search" name="" id="search" className="ring mr-auto rounded-full px-5 py-1 indent-2" onChange={handleSearch}/>  
                    <FaSearch className="absolute left-2"/>
                </div>
                
                <nav className="list-none flex gap-5">
                    <li>link1</li>
                    <li>link2</li>
                    <li>link3</li>
                </nav>
            </header>
        </>
    )
}

export default Header;