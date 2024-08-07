import { useState } from "react";

const Filter = () => {
    const [stock, setStock] = useState(false)
    

    const handleChange = () =>  {
        setStock(prevStock => !prevStock)
    }
    return(
        <>
            
        </>
    )
}

export default Filter;