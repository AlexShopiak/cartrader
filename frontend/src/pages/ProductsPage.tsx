import React, {useState, useRef, useEffect} from 'react';
import { ObjectId } from 'mongodb';
import axios from 'axios';

import Navbar from '../components/Navbar'
import './ProductsPage.css'

interface Product {
    _id: ObjectId;
    name: string;
    description: string;
    owner: string;
    price: string;
    __v: number;
}

const ProductsSearchBar = ({owners, updateProducts} : {owners: string[], updateProducts: (newProducts: Product[]) => void}) => {
	const [sorting, setSorting] = useState("");
	const [owner, setOwner] = useState("");
	const [name, setName] = useState("");

	const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSorting(event.target.value);
	}

	const handleOwnerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setOwner(event.target.value);
	}

	const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	}

	const handleFindClick = () => {
		let url = `http://localhost:5555/products/find?name=${name}`;
		if (sorting !== 'any') {
			url += `&sort=${sorting}`
		}
		if (owner !== 'any') {
			url += `&owner=${owner}`
		}

		axios.get(url)
		.then((response) => {
			updateProducts(response.data.products);
		})
		.catch((error) => {
			console.log(error);
		});
	}

	return (
		<div className='search-bar'>
			<select className="sort-select" value={sorting} onChange={handleSortChange}>
				<option value="any">No sorting</option>
				<option value="fromcheap">From cheap</option>
				<option value="tocheap">To cheap</option>
			</select>

			<select className="owner-select" value={owner} onChange={handleOwnerChange}>
				<option value="any">All owners</option>
				{owners.map((o,index) => (
					<option key={index}>{o}</option>
				))}
			</select>

			<input className='name-input' 
				type='text' 
				placeholder='Product name' 
				value={name} 
				onChange={handleNameChange}>
			</input>

			<button className='blue-button' onClick={handleFindClick}>Find</button>
		</div>
	)
};

const ProductItem = ({ p, handleClick } :{p:Product, handleClick:VoidFunction}) => {
	return (
		<div className="product">
			<h2>{p.name}</h2>
			<p>{p.description}</p>
			<p>Owner: {p.owner}</p>
			<p>Price: {p.price} GBP</p>
			<button className='blue-button' onClick={handleClick}>Buy</button>
		</div>
	);
};

const ProductsContainer = ({ products } : {products: Product[]}) => {
	const handleBuyClick = () => {
		console.log('buy stub')
	}

	return (
		<div className='products-container'>
			{products.length > 0 ? (
				products.map((p) => <ProductItem key={p._id.toString()} p={p} handleClick={handleBuyClick}/>)
			) : (
				<h2>No products availible</h2>
			)}
			
		</div>
	)
};

function ProductsPage() {
	const [products, setProducts] = useState<Product[]>([]);
	const ownersRef = useRef<string[]>([]);

	const updateProducts = (newProducts: Product[]) => {
		setProducts(newProducts);
	};
  
	useEffect(() => {
		axios
			.get('http://localhost:5555/products')
			.then((response) => {
				setProducts(response.data.products);
				ownersRef.current = (response.data.owners);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (<>
		<Navbar />
		<ProductsSearchBar owners={ownersRef.current} updateProducts={updateProducts}/>
		<ProductsContainer products={products}/>
	</>)
}

export default ProductsPage
