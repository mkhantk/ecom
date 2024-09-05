import { useContext, useState } from "react";
import { FaSearch, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProductContext } from "./productContext";

const Header = () => {
	const { search, setSearch, wishlistCount, cartCount } =
		useContext(ProductContext);
	function handleSearch(e) {
		// console.log(e.target.value)
		setSearch(e.target.value);
		// console.log(search)
	}

	return (
		<>
			<header className="flex gap-5 justify-end items-center py-5 bg-green-600 bg-opacity-20 mb-5 px-8 max-sm:px-5 max-sm:py-3">
				<Link to="/">
					<h1 className="logo mr-auto max-sm:text-3xl max-md:text-4xl text-5xl font-bold hover:text-red-500">
						Ecom
					</h1>
				</Link>
				<div className="relative flex justify-center items-center m-auto">
					<input
						type="search"
						name=""
						id="search"
						className="mr-auto rounded-full px-5 py-1 indent-2 w-full"
						onChange={handleSearch}
					/>
					<FaSearch className="absolute left-2" />
				</div>

				<nav className="list-none flex gap-6">
					{/* <li>link1</li> */}
					<li className="relative">
						<Link to={"/wishlist"}>
							<FaHeart className="text-2xl" />
							<div className="bg-red-500 px-2 rounded-full absolute -top-4 left-4 text-white">
								{wishlistCount}
							</div>
						</Link>
					</li>
					<li className="relative">
						<Link to={"/cart"}>
							<FaShoppingCart className="text-2xl" />
							<div className="bg-red-500 px-2 rounded-full absolute -top-4 left-4 text-white ">
								{cartCount}
							</div>
						</Link>
					</li>
				</nav>
			</header>
		</>
	);
};

export default Header;
