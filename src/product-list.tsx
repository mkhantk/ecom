import { useContext, useRef, useState, useMemo } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowUp, FaFilter } from "react-icons/fa";
import { ProductContext } from "./productContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface Product {
	id: number;
	name: string;
	description: string;
	price: string;
	category: string;
	image: string;
	rating: number;
	inStock: boolean;
}
export const fetchProduct = async (): Promise<Product[]> => {
	const response = await axios.get("./MOCK_DATA.json");

	return response.data;
};

function getData4Page(array, dataSize) {
	const data4Page = [];
	for (let i = 0; i < array.length; i += dataSize) {
		data4Page.push(array.slice(i, i + dataSize));
	}
	return data4Page;
}

const ProdList = () => {
	const { search, allData, setAllData } = useContext(ProductContext);
	// const [data, setData] = useState([]);
	const [page, setPage] = useState<number>(1);
	const itemsPerPage = 40;
	//filters
	const [stock, setStock] = useState<boolean>(false);
	const [minPrice, setMinPirce] = useState<number | "">("");
	const [maxPrice, setMaxPrice] = useState<number | "">("");

	//category
	const [toy, setToy] = useState<boolean>(false);
	const [cloth, setCloth] = useState<boolean>(false);
	const [beauty, setBeauty] = useState<boolean>(false);
	const [elect, setElect] = useState<boolean>(false);
	const [home, setHome] = useState<boolean>(false);

	//for product page
	const divRef = useRef({});

	const [filter, setFilter] = useState(true);

	const [scroll, setScroll] = useState(false);

	useEffect(() => {
		let isScrolling = false;
		function onScroll() {
			if (!isScrolling) {
				isScrolling = true;
				requestAnimationFrame(() => {
					setScroll(window.scrollY > 50);
					isScrolling = false;
				});
			}
		}
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	});

	// this is the current version using tan satack query for data fetching and handling async.
	const queryClient = useQueryClient();
	const { data, error } = useQuery<Product[]>({
		queryKey: ["products"],
		queryFn: fetchProduct,
	});
	// console.log(data);
	// if (error) throw new Error("error while fetching data", error);

	const filteredProduct = useMemo(() => {
		const selectedCategories = [];
		if (toy) selectedCategories.push("toys");
		if (cloth) selectedCategories.push("clothing");
		if (beauty) selectedCategories.push("beauty products");
		if (elect) selectedCategories.push("electronics");
		if (home) selectedCategories.push("home goods");

		return data?.filter((item) => {
			if (
				search !== " " &&
				!item.name.toLowerCase().includes(search.toLowerCase())
			) {
				return false;
			}

			if (
				selectedCategories.length > 0 &&
				!selectedCategories.includes(item.category)
			) {
				return false;
			}

			if (stock && !item.inStock) return false;

			const numPrice = parseInt(item.price.split("$")[1]);

			if (minPrice !== "" && numPrice < Number(minPrice)) return false;
			if (maxPrice !== "" && numPrice > Number(maxPrice)) return false;
			return true;
		});
	}, [
		data,
		search,
		toy,
		cloth,
		beauty,
		elect,
		home,
		stock,
		minPrice,
		maxPrice,
	]);

	const pages = useMemo(
		() => (filteredProduct ? getData4Page(filteredProduct, itemsPerPage) : ""),

		[filteredProduct],
	);
	const totalPages = pages.length;

	useEffect(() => {
		setPage(1);
	}, [search, toy, cloth, beauty, elect, home, stock, minPrice, maxPrice]);

	//page forward
	function handleForward() {
		setPage((prevpage) => prevpage + 1);
	}
	//page backward
	function handleBackward() {
		setPage((prevpage) => prevpage - 1);
	}
	function handleChange() {
		setStock((prevStock) => !prevStock);
	}
	//price filter
	function handleMin(e) {
		setMinPirce(e.target.value);
	}

	function handleMax(e) {
		setMaxPrice(e.target.value);
	}

	//category filter
	function handleCategory(e) {
		if (e.target.id === "toys") {
			setToy((prevToy) => !prevToy);
		} else if (e.target.id === "clothing") {
			setCloth((prevCloth) => !prevCloth);
		} else if (e.target.id === "beauty-products") {
			setBeauty((prevBeauty) => !prevBeauty);
		} else if (e.target.id === "electronics") {
			setElect((prevElect) => !prevElect);
		} else if (e.target.id === "homegoods") {
			setHome((prevHome) => !prevHome);
		}
	}

	function handleClick(e) {
		// console.log(e.currentTarget.id);
		let filt = document.getElementById("filter");
		if (filter) {
			filt.classList.remove("hide");
			// setFilter(false);
		} else {
			filt.classList.add("hide");
			// setFilter(true);
		}

		setFilter((prevFilter) => !prevFilter);
	}

	return (
		<>
			<div id="toggle" className="hide max-md:block">
				<FaFilter id="bar" className="text-3xl" onClick={handleClick} />
			</div>
			<div
				id="filter"
				className="w-1/6 hide md:block max-md:absolute max-md:w-1/2 max-md:top-24 max-md:left-16 max-md:bg-white z-20 max-md:h-screen max-md:p-5 transition-all duration-300"
			>
				<header className="text-4xl font-bold mb-2">Filter</header>
				<div className="flex flex-col gap-2 mb-2">
					<h2 className="text-lg font-bold py-2">Price</h2>
					<div className="flex flex-col flex-1 justify-between ml-2">
						min
						<input
							type="number"
							name="min"
							id="min"
							min="0"
							max="10"
							onChange={handleMin}
							className="w-full ring-1 ring-black"
						/>
					</div>
					<div className="flex flex-col flex-1 justify-between ml-2">
						max
						<input
							type="number"
							name="max"
							id="max"
							min="0"
							max="10"
							onChange={handleMax}
							className="w-full ring-1 ring-black"
						/>
					</div>
				</div>
				<div className="flex flex-col gap-2 mb-3">
					<h2 className="text-lg font-bold py-2">Categories</h2>
					<p className="flex justify-between ml-2">
						toys{" "}
						<input
							type="checkbox"
							name="toys"
							id="toys"
							onChange={handleCategory}
						/>
					</p>
					<p className="flex justify-between ml-2">
						clothing{" "}
						<input
							type="checkbox"
							name="clothing"
							id="clothing"
							onChange={handleCategory}
						/>
					</p>
					<p className="flex justify-between ml-2">
						beauty products{" "}
						<input
							type="checkbox"
							name="beauty-products"
							id="beauty-products"
							onChange={handleCategory}
						/>
					</p>
					<p className="flex justify-between ml-2">
						electronics{" "}
						<input
							type="checkbox"
							name="electronics"
							id="electronics"
							onChange={handleCategory}
						/>
					</p>
					<p className="flex justify-between ml-2">
						home goods{" "}
						<input
							type="checkbox"
							name="homegoods"
							id="homegoods"
							onChange={handleCategory}
						/>
					</p>
				</div>
				<div className="flex justify-between text-lg font-bold">
					inStock
					<input
						type="checkbox"
						name="inStock"
						id="inStock"
						className=""
						onChange={handleChange}
					/>
				</div>
			</div>
			<div className="md:w-5/6 w-[365px] m-auto grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 relative transition-all duration-300">
				{pages[page - 1]?.map((item) => (
					// image, category, name, price
					<div
						ref={(el) => (divRef.current[item.id] = el)}
						key={item.id}
						className="border border-gray-300 shadow-md"
					>
						<img src={item.image} alt="product icon" className="w-full" />
						<p className="opacity-45 px-2">{item.category}</p>
						<Link to={`/product-page/${item.id}`}>
							<h2
								id={item.id}
								className="text-lg font-bold px-2 py-1 hover:text-red-600"
							>
								{item.name}
							</h2>
						</Link>

						<p className="text-red-600 font-bold text-sm px-2">{item.price}</p>
					</div>
				))}
				{/* product bl nk khu shi tl so tr ko thi ma product card a ti  a kya ya mr fik tl */}
				{/* pe taw page ta khu mr bl na khu shi tl so tr ko lel determine lok ya ohn ml */}
				<div className="flex gap-5 justify-center items-center col-span-2 md:col-span-3 lg:col-span-4 p-5">
					<button
						onClick={handleBackward}
						disabled={page === 1}
						className="bg-green-200 rounded-full py-1 px-3"
					>
						back
					</button>
					<p>
						{page} of {totalPages}
					</p>
					<button
						onClick={handleForward}
						disabled={page === totalPages}
						className="bg-green-200 rounded-full py-1 px-3"
					>
						next
					</button>
				</div>
			</div>

			{scroll && (
				<button
					className="fixed bottom-5 right-5 p-2 hover:ring"
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
				>
					<FaArrowUp size={30} />
				</button>
			)}
		</>
	);
};

export default ProdList;
