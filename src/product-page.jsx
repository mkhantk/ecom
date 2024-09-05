import { useContext, useEffect, useState } from "react";
import {
	FaRegHeart,
	FaStar,
	FaStarHalfAlt,
	FaRegStar,
	FaPlus,
	FaMinus,
	FaHeart,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { ProductContext } from "./productContext";

const ProdPage = () => {
	const {
		allData,
		product,
		setProduct,
		wishlistCount,
		setWishlistCount,
		wishlist,
		setWishlist,
		cartCount,
		setCartCount,
		cart,
		setCart,
		shopCount,
		setShopCount,
	} = useContext(ProductContext); //from context

	const { productId } = useParams();

	const ratingStar = [];
	// const [shopCount, setShopCount] = useState(1)
	const [favorite, setFavorite] = useState(() => {
		if (wishlist.includes(Number(productId))) {
			return <FaHeart className="text-red-500 text-3xl m-2 " />;
		} else {
			return (
				<FaRegHeart
					id="regHeart"
					className="text-gray-400 text-3xl m-2 hover:text-red-500"
				/>
			);
		}
	});

	useEffect(() => {
		const productData = allData.find(
			(item) => item.id === Number(productId)
		);
		setProduct(productData);
		// console.log(productData)
	}, [productId, allData]);

	//the product page should appear when i clicked on each product
	//name ko onclick lk yin product paalge ka win lr ya ml
	//ae lo lok pho so yin state tway ko nauk page mr pass lok ya ml
	//ae tr ma product page mr paw mr so tawf kr
	if (!product) {
		return <p className="flex justify-center items-center">Loading...</p>;
	} else {
		for (let i = 0; i < 5; i++) {
			if (i < Math.floor(product.rating)) {
				ratingStar.push(<FaStar key={i} />);
			} else if (i < product.rating) {
				ratingStar.push(<FaStarHalfAlt key={i} />);
			} else {
				ratingStar.push(<FaRegStar key={i} />);
			}
		}
	}

	function handleClick(e) {
		// console.log(e.currentTarget.id)
		let id = e.currentTarget.id;
		setShopCount((prevShopCount) => {
			const currentCount = prevShopCount[product.id] || 1;

			if (id === "minus" && currentCount > 1) {
				return { ...prevShopCount, [product.id]: currentCount - 1 };
			} else if (id === "plus") {
				return { ...prevShopCount, [product.id]: currentCount + 1 };
			} else {
				return prevShopCount;
			}
		});

		// console.log(shopCount)
		// if (e.currentTarget.id === 'minus' && (shopCount[productId] || 1) > 1) {
		//     setShopCount(prevShopCount => prevShopCount[productId] - 1)
		// } else if (e.currentTarget.id === 'plus') {
		//     setShopCount(prevShopCount => prevShopCount[productId] + 1)
		// }
	}
	//favorite lok tae hr mr lok ya mr ka faorite lok lk yin, header ka favorite mr twr paw ya ml,
	//ae lo fik pho a twk so, header nae product page ko props nae connect lok ya ml, pe yin, create another two component(wishlist, cart)
	//both of them are able to add and delete by clicking
	//and don't forget about the count before add to cart.

	//so where do we start with?
	// 1st
	//2nd
	//3rd

	function handleHeart(e) {
		// console.log(e.currentTarget.firstChild.id)

		if (e.currentTarget.firstChild.id === "regHeart") {
			setFavorite(<FaHeart className="text-red-500 text-3xl m-2 " />);
			if (!wishlist.includes(product.id)) {
				setWishlist((prevWishlist) => [...prevWishlist, product.id]);
				setWishlistCount((prevWishlistCount) => prevWishlistCount + 1);
			}
		} else {
			setFavorite(
				<FaRegHeart
					id="regHeart"
					className="text-gray-400 text-3xl m-2 hover:text-red-500"
				/>
			);
			if (wishlist.includes(product.id)) {
				setWishlist((prevWishlist) =>
					prevWishlist.filter((id) => id !== Number(product.id))
				);
				setWishlistCount((prevWishlistCount) => prevWishlistCount - 1);
			}
		}
	}
	//cart
	function handleCart(e) {
		// click nake yin cart a thit tor ya ma
		//p yin count lel htwk ya ml
		if (!cart.includes(product.id)) {
			setCart((prevCart) => [...prevCart, product.id]);
			setCartCount((prevCartCount) => prevCartCount + 1);
			// setShopCount(prevShopCount => {
			//     if (!prevShopCount[product.id]) {
			//         return {...prevShopCount, [product.id]: 1}
			//     }
			// })
			setShopCount((prevShopCount) => {
				const newCount = prevShopCount[product.id]
					? prevShopCount[product.id]
					: 1;
				return { ...prevShopCount, [product.id]: newCount };
			});
		}
		// console.log(cart)
	}

	return (
		<>
			<div className="w-5/6 grid grid-cols-1 md:grid-cols-2 justify-center items-start m-auto gap-5">
				<img
					src={product.image}
					alt="product image"
					className="w-full"
				/>
				<div className="flex flex-col gap-2">
					<h2 className="text-5xl font-bold">{product.name}</h2>
					<p className="opacity-30 text-lg">
						category: {product.category}
					</p>
					<p className="text-3xl font-bold text-red-500 py-3">
						{product.price}
					</p>
					<p className="flex gap-2 items-center text-yellow-500">
						{" "}
						{ratingStar}
					</p>
					<p className="text-lg">
						InStock: {product.inStock ? "In stock" : "Out of stock"}
					</p>
					<div className="flex gap-3 mt-auto ">
						<div className="flex gap-5 ring-1 p-2 rounded-lg hover:ring-red-500">
							<button id="minus" onClick={handleClick}>
								<FaMinus />
							</button>
							<p className="">{shopCount[product.id] || 1} </p>
							<button id="plus" onClick={handleClick}>
								<FaPlus />
							</button>
						</div>
						<button
							className="p-1 px-2 text-lg bg-red-500 rounded-lg hover:bg-gray-200 hover:text-red-500 hover:ring-1 ring-red-500 "
							onClick={handleCart}
						>
							add to cart
						</button>
						<button onClick={handleHeart}>{favorite}</button>
					</div>
				</div>
				<div className="md:col-span-2 flex flex-col justify-center items-center border-t-2">
					<h1 className="text-3xl font-bold my-5">Description</h1>
					<div className="text-lg">{product.description}</div>
				</div>
			</div>
		</>
	);
};

export default ProdPage;
