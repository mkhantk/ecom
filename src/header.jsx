import { useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch }) => {
    

    function handleSearch(e) {
        // console.log(e.target.value)
        setSearch(e.target.value)
        console.log(search)
    }

    return(
        <>
            <header className="flex gap-5 justify-end items-center p-5 bg-green-600 bg-opacity-20 mb-5">
                <Link to='/'>
                    <h1 className="logo mr-auto text-5xl font-bold">Ecom</h1>
                </Link>
                <div className="relative flex justify-center items-center m-auto">
                    <input type="search" name="" id="search" className="mr-auto rounded-full px-5 py-1 indent-2" onChange={handleSearch}/>  
                    <FaSearch className="absolute left-2"/>
                </div>
                
                <nav className="list-none flex gap-5">
                    {/* <li>link1</li> */}
                    <li>
                        <FaHeart />
                    </li>
                    <li>
                        <FaShoppingCart /> 
                    </li>
                </nav>
            </header>
        </>
    )
}

export default Header;