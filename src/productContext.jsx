import { createContext, useState } from "react";

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
	const [search, setSearch] = useState("");
	const [wishlistCount, setWishlistCount] = useState(0); // New state for wishlist
	const [wishlist, setWishlist] = useState([]);

	//cart
	const [cart, setCart] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [shopCount, setShopCount] = useState({});

	return (
		<ProductContext.Provider
			value={{
				search,
				setSearch,
				wishlist,
				setWishlist,
				wishlistCount,
				setWishlistCount,
				cart,
				setCart,
				cartCount,
				setCartCount,
				shopCount,
				setShopCount,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};
