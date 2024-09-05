import React, { useContext } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { ProductContext } from "./productContext";

const Cart = () => {
	const { cart, setCart, allData, shopCount, setShopCount, setCartCount } =
		useContext(ProductContext);

	function handleClick(e) {
		setCart((prevCart) =>
			prevCart.filter((item) => item !== Number(e.target.id))
		);
		setCartCount((prevCartCount) => prevCartCount - 1);
		setShopCount((prevShopCount) => {
			const keys = Object.keys(prevShopCount).reduce((total, current) => {
				if (current !== e.target.id) {
					total[current] = prevShopCount[current];
				}
				return total;
			}, {});
			return keys;
		});

		//problem ka 1 fik yin count ma pya tr

		//reduce nae lok ma ya ml, d mr error fik tr ka forcefully
	}

	return (
		<>
			<div id="container" className="w-full">
				{cart.length !== 0 && (
					<h1 className="text-5xl font-bold m-5 text-center">Cart</h1>
				)}

				{cart.length === 0 ? (
					<div
						id="empty"
						className=" text-6xl text-red-500 opacity-30 pt-32"
					>
						<FaCartShopping className="text-8xl m-auto" />
						<div className="text-center">cart is empty</div>
					</div>
				) : (
					<div
						id="cart"
						className="grid grid-cols-5 gap-5 max-md:grid-cols-3"
					>
						{cart.map((item) => (
							<div
								key={item}
								id={item}
								className="border border-gray-300 shadow-md relative"
							>
								<img
									src={allData[item - 1].image}
									alt="product-image"
									className="w-full"
								/>
								<p className="opacity-45 px-2">
									{allData[item - 1].category}
								</p>
								<h2 className="text-lg font-bold px-2 py-1 hover:text-red-600">
									{allData[item - 1].name}
								</h2>
								<p className="text-red-600 font-bold text-sm px-2">
									{allData[item - 1].price}
								</p>
								<p className="px-2">
									Quantity: {shopCount[item]}
								</p>

								<div
									id="overlay"
									className="hover:bg-gray-200 w-full h-full absolute top-0 opacity-0 hover:opacity-50 flex justify-center items-center"
								>
									<button
										id={item}
										className="px-5 py-2 bg-white rounded-lg shadow-lg hover:bg-green-400 ring-1 ring-gray-300 "
										onClick={handleClick}
									>
										remove
									</button>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default Cart;
