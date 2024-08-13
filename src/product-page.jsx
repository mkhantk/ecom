import { useEffect, useState } from "react";
import { FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar, FaPlus, FaMinus, FaHeart } from "react-icons/fa";
import { useParams } from "react-router-dom";


const ProdPage = ({ allData }) => {
    const {productId} = useParams()
    const [product, setProduct] = useState(null)
    const ratingStar = []
    const [count, setCount] = useState(1)
    const [favorite, setFavorite] = useState(<FaRegHeart id="regHeart" className="text-gray-400 text-3xl m-2 hover:text-red-500" />)

    useEffect(() => {
        const productData = allData.find(item => item.id === Number(productId))
        setProduct(productData)
        // console.log(productData)

        
    }, [productId, allData])
    
    //the product page should appear when i clicked on each product 
    //name ko onclick lk yin product paalge ka win lr ya ml 
    //ae lo lok pho so yin state tway ko nauk page mr pass lok ya ml
    //ae tr ma product page mr paw mr so tawf kr
    if (!product) {
        return <p className="flex justify-center items-center">Loading...</p>
    } else {
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(product.rating)) {
                ratingStar.push(<FaStar />)
            } else if ( i < product.rating) {
                ratingStar.push(<FaStarHalfAlt />)
            } else {
                ratingStar.push(<FaRegStar />)
            }
        }
    }

    function handleClick(e) {
        // console.log(e.currentTarget.id)
        if (e.currentTarget.id === 'minus' && count > 1) {
            setCount(prevCount => prevCount - 1)
        } else if (e.currentTarget.id === 'plus') {
            setCount(prevCount => prevCount + 1)
        }
    }
    //favorite lok tae hr mr lok ya mr ka faorite lok lk yin, header ka favorite mr twr paw ya ml, 
    //ae lo fik pho a twk so, header nae product page ko props nae connect lok ya ml, pe yin, create another two component(wishlist, cart)
    //both of them are able to add and delete by clicking 
    //and don't forget about the count before add to cart.

    function handleHeart(e) {
        // console.log(e.currentTarget.firstChild.id)
        if (e.currentTarget.firstChild.id === 'regHeart') {
            setFavorite(<FaHeart className="text-red-500 text-3xl m-2 "/>)
        } else {
            setFavorite(<FaRegHeart id="regHeart" className="text-gray-400 text-3xl m-2 hover:text-red-500" />) 
        }
    }
    //change the rating to stars

    
    return(
        <>
            <div className="w-5/6 grid grid-cols-2 justify-center items-start m-auto gap-5">
                <img src={product.image} alt="product image" className="w-full"/>
                <div className="flex flex-col gap-2">
                    <h2 className="text-5xl font-bold">{product.name}</h2>
                    <p className="opacity-30 text-lg">category: {product.category}</p>
                    <p className="text-3xl font-bold text-red-500 py-3">{product.price}</p>
                    <p className="flex gap-2 items-center text-yellow-500"> {ratingStar}</p>
                    <p className="text-lg">InStock:  {product.inStock ? 'In stock' : 'Out of stock'}</p>
                    <div className="flex gap-3 mt-auto">
                        <div className="flex gap-5 ring-1 p-2 rounded-lg hover:ring-red-500">
                            <button id="minus" onClick={handleClick}><FaMinus /></button>
                            <p>{count}</p>
                            <button id="plus" onClick={handleClick}><FaPlus /></button>
                        </div>
                        <button className="p-1 px-2 text-lg bg-red-500 rounded-lg hover:bg-gray-200 hover:text-red-500 hover:ring-1 ring-red-500">add to cart</button>
                        <button onClick={handleHeart}>{favorite}</button>
                    </div>
                </div>
                <div className="col-span-2 flex flex-col justify-center items-center border-t-2">
                    <h1 className="text-3xl font-bold my-5">Description</h1>
                    <div className="text-lg">{product.description}</div>
                </div>
                
            </div>
        </>
    )
}

export default ProdPage;