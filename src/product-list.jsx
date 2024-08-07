import { useState } from "react";
import { useEffect } from "react";
// import Mockdata from './assets/MOCK_DATA.json'
// import Filter from "./filter";
import Header from "./header";

function getData4Page(array, dataSize)  {
    const data4Page = []
    for (let i = 0; i < array.length; i += dataSize) {
        data4Page.push(array.slice(i, i + dataSize))
    }
    return data4Page;
}

const ProdList = ({ search }) => {
    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const itemsPerPage = 40;
    //filters
    const [stock, setStock] = useState(false)
    const [minPrice, setMinPirce] = useState('')
    const [maxPrice, setMaxPrice] = useState('')

    //category
    const [toy, setToy] = useState(false)
    const [cloth, setCloth] = useState(false)
    const [beauty, setBeauty] = useState(false)
    const [elect, setElect] = useState(false)
    const [home, setHome] = useState(false)

    //search
    // const [searchData, setSearchData] = useState('')

    
    useEffect(() => {
        fetch('/MOCK_DATA.json')
            .then(response => response.json())
            .then(data => {
                let filteredData = data; 
                let categories = [];
                for (let i = 0; i < filteredData.length; i++ ) {
                    if (!categories.includes(filteredData[i].category)) {
                        categories.push(filteredData[i].category)
                    }
                }

                console.log(categories)

                if (search !== '') {
                    filteredData = filteredData.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

                }

                if (toy) {
                    filteredData = filteredData.filter(item => item.category === 'toys')
                }
                if (cloth) {
                    filteredData = filteredData.filter(item => item.category === 'clothing')
                }
                if (beauty) {
                    filteredData = filteredData.filter(item => item.category === 'beauty products')
                }
                if (elect) {
                    filteredData = filteredData.filter(item => item.category === 'electronics')
                }   
                if (home) {
                    filteredData = filteredData.filter(item => item.category === 'home goods')
                }







                if (stock) {
                    // setFilter(true)
                    filteredData = filteredData.filter(item => item.inStock === true)
                }

                if (minPrice !== '' || maxPrice !== '') {
                    // setFilter(true)
                    // setData(getData4Page(filteredData.filter(item => item.price > minPrice && item.price < maxPrice), itemsPerPage))
                    filteredData = filteredData.filter(item => {
                        const price = parseFloat(item.price.slice(1))
                        if (minPrice !== '' && maxPrice !== '') {
                            return price >= minPrice && price <= maxPrice
                        } else if (minPrice !== '' ) {
                            return price >= minPrice
                        } else if (maxPrice !== '') {
                            return price <= maxPrice    
                        }

                        return true;
                    });
                    // let filtered = filteredData[0].price.slice(0,1)
                    // console.log(filtered)
                    // console.log(filteredData[0].price.slice(1))
                    console.log(minPrice)
                    console.log(maxPrice)
                    //what i want to do is that i want to match the value of item price and min or max price
                    


                }
                
                //now the category filter
                // toys, clothing, beauty products, electronics, homegoods
                
                
                
                
                setData(getData4Page(filteredData, itemsPerPage ))
                // setFilter(false)
                
            })
            .catch(error => console.error('Error Fetching JSON:', error) )

        
    },[stock, minPrice, maxPrice, toy, cloth, beauty, elect, home, search])

    const totalPages = data.length

    console.log(stock)
    console.log(data)
    console.log(totalPages)
    // let categories = []
    // for (let i = 0; i < data.length; i++ ) {
    //     if (!categories.includes(data[i].category)) {
    //         categories.push(data[i].category)
    //         console.log(i)
    //     }
    // }

    // console.log(categories)
    //page forward 
    function handleForward () {
        setPage(prevpage => prevpage + 1)
    }
    //page backward
    function handleBackward () {
        setPage(prevpage => prevpage - 1)
    }
    function handleChange () {
        setStock(prevStock => !prevStock)
    }
    //price filter
    function handleMin(e) {
        setMinPirce(e.target.value)
    }

    function handleMax(e) {
        setMaxPrice(e.target.value)
    }

    //category filter
    function handleCategory(e) {
        if (e.target.id === 'toys') {
            setToy(prevToy => !prevToy)
        } else if (e.target.id === 'clothing') {
            setCloth(prevCloth => !prevCloth)

        } else if (e.target.id === "beauty-products") {
            setBeauty(prevBeauty => !prevBeauty)
        } else if (e.target.id === 'electronics') {
            setElect(prevElect => !prevElect)
        } else if (e.target.id === 'homegoods') {
            setHome(prevHome => !prevHome)
        }
    } 


    return(
        <>
            <div className="w-1/6">
                <header className="text-4xl font-bold">Filter</header>
                <div className="">
                    <h2 className="text-lg font-bold">Price</h2>
                    <div className="flex justify-between ml-2">minPrice<input type="number" name="min" id="min" min='0' max='10' onChange={handleMin} className="w-12 ml-4"/></div>
                    <div className="flex justify-between ml-2">maxPrice<input type="number" name="max" id="max" min='0' max='10' onChange={handleMax} className="w-12 ml-4"/></div>
                </div>
                <div>
                    <h2 className="text-lg font-bold">Categories</h2>
                    <p className="flex justify-between ml-2">toys <input type="checkbox" name="toys" id="toys" onChange={handleCategory}/></p>
                    <p className="flex justify-between ml-2">clothing <input type="checkbox" name="clothing" id="clothing" onChange={handleCategory}/></p>
                    <p className="flex justify-between ml-2">beauty products <input type="checkbox" name="beauty-products" id="beauty-products" onChange={handleCategory}/></p>
                    <p className="flex justify-between ml-2">electronics <input type="checkbox" name="electronics" id="electronics" onChange={handleCategory}/></p>
                    <p className="flex justify-between ml-2">homegoods <input type="checkbox" name="homegoods" id="homegoods" onChange={handleCategory} /></p>
                

                </div>
                <div className="flex justify-between text-lg font-bold">inStock<input type="checkbox" name="inStock" id="inStock" className=""  onChange={handleChange}/></div>
            </div>
            <div className="w-5/6 ml-auto grid grid-cols-4 gap-2">
                {data[page - 1]?.map(item => (
                    // image, category, name, price
                    <div key={item.id} className="border border-gray-300">
                        <img src={item.image} alt="product image" 
                        className="w-full"/>
                        <p className='opacity-45 px-2'>{item.category}</p>
                        <h2 className="text-lg font-bold px-2 hover:text-red-600">{item.name}</h2>
                        <p className="text-red-600 font-bold text-sm px-2">{item.price}</p>
                    </div>
                ))}
                {/* product bl nk khu shi tl so tr ko thi ma product card a ti  a kya ya mr fik tl */}
                {/* pe taw page ta khu mr bl na khu shi tl so tr ko lel determine lok ya ohn ml */}
                <div className="flex gap-5 justify-center items-center col-span-4 p-5">
                    <button onClick={handleBackward} disabled={page === 1} className="bg-green-200 rounded-full py-1 px-3">back</button>
                    <p>{page} of {totalPages}</p>
                    <button onClick={handleForward} disabled={page === totalPages} className="bg-green-200 rounded-full py-1 px-3">next</button>
                </div>
                
            </div>
            
        </>
    )
}

export default ProdList;