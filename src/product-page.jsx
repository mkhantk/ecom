import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProdPage = ({ allData }) => {
    const {productId} = useParams()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const productData = allData.find(item => item.id === Number(productId))
        setProduct(productData)
    }, [productId, allData])
    
    //the product page should appear when i clicked on each product 
    //name ko onclick lk yin product paalge ka win lr ya ml 
    //ae lo lok pho so yin state tway ko nauk page mr pass lok ya ml
    //ae tr ma product page mr paw mr so tawf kr
    if (!product) {
        return <p className="flex justify-center items-center">Loading...</p>
    }
    
    return(
        <>
            <div>
                <img src={product.image} alt="product image" />
                <div>
                    <h2>{product.name}</h2>
                    <p>{product.category}</p>
                    <p>price</p>
                </div>
                <div>description</div>
            </div>  
        </>
    )
}

export default ProdPage;