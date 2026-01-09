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
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "./product-list";

import type { Product } from "./product-list";

const ProdPage = () => {
	const {
		setWishlistCount,
		wishlist,
		setWishlist,
		setCartCount,
		cart,
		setCart,
		shopCount,
		setShopCount,
	} = useContext(ProductContext); //from context

	const { productId } = useParams();

	const ratingStar = [];
	// const [shopCount, setShopCount] = useState(1)
	const [favorite, setFavorite] = useState<boolean>(() =>
		wishlist.includes(Number(productId)),
	);
	// const [favorite, setFavorite] = useState(() => {
	// 	if (wishlist.includes(Number(productId))) {
	// 		return <FaHeart className="text-red-500 text-3xl m-2 " />;
	// 	} else {
	// 		return (
	// 			<FaRegHeart
	// 				id="regHeart"
	// 				className="text-gray-400 text-3xl m-2 hover:text-red-500"
	// 			/>
	// 		);
	// 	}
	// });

	// useEffect(() => {
	// 	const productData = allData.find((item) => item.id === Number(productId));
	// 	setProduct(productData);
	// 	// console.log(productData)
	// }, [productId, allData]);

	// const { data } = useQuery<Product[]>({
	// 	queryKey: ["products"],
	// 	queryFn: fetchProduct,
	// 	select: (list) => list?.find((item) => item.id === Number(productId)),
	// });

	const { data, isLoading, isError } = useQuery<
		Product[],
		Error,
		Product | undefined
	>({
		queryKey: ["products"],
		queryFn: fetchProduct,
		select: (list) => list?.find((item) => item.id === Number(productId)),
	});

	if (isLoading) return <p className="flex justify-center">Loading...</p>;
	if (isError || !data)
		return <p className="flex justify-center">Product not found.</p>;
	//the product page should appear when i clicked on each product
	//name ko onclick lk yin product paalge ka win lr ya ml
	//ae lo lok pho so yin state tway ko nauk page mr pass lok ya ml
	//ae tr ma product page mr paw mr so tawf kr
	if (data) {
		for (let i = 0; i < 5; i++) {
			if (i < Math.floor(data.rating)) {
				ratingStar.push(<FaStar key={i} />);
			} else if (i < data.rating) {
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
			const currentCount = prevShopCount[data.id] || 1;

			if (id === "minus" && currentCount > 1) {
				return { ...prevShopCount, [data.id]: currentCount - 1 };
			} else if (id === "plus") {
				return { ...prevShopCount, [data.id]: currentCount + 1 };
			} else {
				return prevShopCount;
			}
		});
	}
	//favorite lok tae hr mr lok ya mr ka faorite lok lk yin, header ka favorite mr twr paw ya ml,
	//ae lo fik pho a twk so, header nae product page ko props nae connect lok ya ml, pe yin, create another two component(wishlist, cart)
	//both of them are able to add and delete by clicking
	//and don't forget about the count before add to cart.

	//so where do we start with?
	// 1st
	//2nd
	//3rd

	function handleHeart() {
		// console.log(e.currentTarget.firstChild.id)
		setWishlist((prev: [number]) => {
			const isFav = prev.includes(Number(productId));
			const result = isFav
				? prev.filter((item: number) => item !== Number(productId))
				: [...prev, Number(productId)];
			setWishlistCount(result.length);
			return result;
		});
		setFavorite((prev) => !prev);
	}
	//cart
	function handleCart() {
		// click nake yin cart a thit tor ya ma
		//p yin count lel htwk ya ml
		if (!cart.includes(data.id)) {
			setCart((prevCart) => [...prevCart, data.id]);
			setCartCount((prevCartCount) => prevCartCount + 1);

			setShopCount((prevShopCount) => {
				const newCount = prevShopCount[data.id] ? prevShopCount[data.id] : 1;
				return { ...prevShopCount, [data.id]: newCount };
			});
		}
		// console.log(cart)
	}

	return (
		<div className="w-5/6 grid grid-cols-1 md:grid-cols-2 justify-center items-start m-auto gap-5">
			<img src={data.image} alt="product icon" className="w-full" />
			<div className="flex flex-col gap-2">
				<h2 className="text-5xl font-bold">{data.name}</h2>
				<p className="opacity-30 text-lg">category: {data.category}</p>
				<p className="text-3xl font-bold text-red-500 py-3">{data.price}</p>
				<p className="flex gap-2 items-center text-yellow-500">{ratingStar}</p>
				<p className="text-lg">
					InStock: {data.inStock ? "In stock" : "Out of stock"}
				</p>
				<div className="flex gap-3 mt-auto ">
					<div className="flex gap-5 ring-1 p-2 rounded-lg hover:ring-red-500">
						<button type="button" id="minus" onClick={handleClick}>
							<FaMinus />
						</button>
						<p className="">{shopCount[data.id] || 1} </p>
						<button type="button" id="plus" onClick={handleClick}>
							<FaPlus />
						</button>
					</div>
					<button
						type="button"
						className="p-1 px-2 text-lg bg-red-500 rounded-lg hover:bg-gray-200 hover:text-red-500 hover:ring-1 ring-red-500 disabled:opacity-30 disabled:pointer-events-none "
						onClick={handleCart}
						disabled={!data.inStock}
					>
						add to cart
					</button>
					{/* <button onClick={handleHeart}>{favorite}</button> */}
					<button type="button" onClick={handleHeart}>
						{favorite ? (
							<FaHeart className="text-red-500 text-3xl m-2 " />
						) : (
							<FaRegHeart
								id="regHeart"
								className="text-gray-400 text-3xl m-2 hover:text-red-500"
							/>
						)}
					</button>
				</div>
			</div>
			<div className="md:col-span-2 flex flex-col justify-center items-center border-t-2">
				<h1 className="text-3xl font-bold my-5">Description</h1>
				<div className="text-lg">{data.description}</div>
			</div>
		</div>
	);
};

export default ProdPage;
