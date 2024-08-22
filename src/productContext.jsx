import { createContext, useState } from 'react';

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [search, setSearch] = useState('');
  const [allData, setAllData] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);  // New state for wishlist
  const [wishlist, setWishlist] = useState([]);
  const [product, setProduct] = useState(null)

  //cart
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [shopCount, setShopCount] = useState({})

  return (
    <ProductContext.Provider 
        value={{ search, setSearch, allData, setAllData, wishlist, setWishlist, product, setProduct, wishlistCount, setWishlistCount, cart, setCart, cartCount, setCartCount, shopCount, setShopCount }}>
      {children}
    </ProductContext.Provider>
  );
};