import React, { useContext, useState } from 'react'
import { FaRegHeart } from 'react-icons/fa'
import { ProductContext } from './productContext'

const Wishlist = () => {
    const { wishlist, allData, setWishlist, setWishlistCount } = useContext(ProductContext)
    

    //handleclick function
    function handleClick (e) {
        // console.log(e.target.id)
        setWishlist(prevWishlist => prevWishlist.filter(id => id !== Number(e.target.id)))
        setWishlistCount(prevWishlistCount => prevWishlistCount - 1)
        // console.log(wishlist)
    }

    return (
        <>
            <div id='container' className='w-full'>
                {wishlist.length !== 0 && (
                    <h1 className='text-5xl font-bold m-5 text-center'>wishlist</h1>
                )}
                {wishlist.length === 0 ? (
                    <div id='empty' className=' text-6xl text-red-500 opacity-30 pt-32'>
                        <FaRegHeart className='text-8xl m-auto' />
                        <div className='text-center'>wishlist is empty</div>
                    </div>
                ) : (
                    <div id='wishlist' className='grid grid-cols-5 gap-5'>
                        
                        {wishlist.map(item => (
                            <div key={item} id={item} className="border border-gray-300 shadow-md relative">
                                <img src={allData[item -1].image} alt="product-image" className="w-full" />
                                <p className='opacity-45 px-2'>{allData[item - 1].category}</p>
                                <h2 className="text-lg font-bold px-2 py-1 hover:text-red-600">{allData[item -1].name}</h2>
                                <p className="text-red-600 font-bold text-sm px-2">{allData[item-1].price}</p>

                                <div id='overlay' className='hover:bg-gray-200 w-full h-full absolute top-0 opacity-0 hover:opacity-50 flex justify-center items-center'>
                                    <button id= {item} className='px-5 py-2 bg-white rounded-lg shadow-lg hover:bg-green-400 ring-1 ring-gray-300 '
                                    onClick={handleClick}>remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
                }
            </div>
        </>
    )
}

export default Wishlist