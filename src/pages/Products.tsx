import Navbar from './components/Navbar'
import React, {useState} from 'react';

import './Products.css'

interface Product {
    name: string;
    description: string;
	owner: string;
    price: number;
}

const ProductsSearchBar = ({ owners } : {owners: string[]}) => {
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
		//? setName("");
		console.log("click Find");//STUB
	}

	return (<div className='search-bar'>
		<select className="sort-select" value={sorting} onChange={handleSortChange}>
			<option value="" disabled selected>Price sorting</option>
			<option value="any">-</option>
			<option value="fromcheap">From cheap</option>
			<option value="tocheap">To cheap</option>
		</select>

		<select className="owner-select" value={owner} onChange={handleOwnerChange}>
			<option value="" disabled selected>Owner</option>
			<option value="any">-</option>
			{owners.map((o,index) => <option key={index}>{o}</option>)}
		</select>

		<input className='name-input' 
			type='text' 
			placeholder='Find by name' 
			value={name} 
			onChange={handleNameChange}>
		</input>

		<button className='blue-button' onClick={handleFindClick}>Find</button>
	</div>)
};

const ProductsContainer = ({ products } : {products: Product[]}) => {
	const handleBuyClick = () => {
		console.log("click Buy");//STUB
	}

	return (<div className='products-container'>
		{products.length > 0 ? (
			products.map((p) => 
				<div className="product">
					<h2>{p.name}</h2>
					<p>{p.description}</p>
					<p>Owner: {p.owner}</p>
					<p>Price: {p.price} GBP</p>
					<button className='blue-button' onClick={handleBuyClick}>Buy</button>
				</div>
			)
		) : (
			<h2>No products availible</h2>
		)}
		
	</div>)
};

function Products() {
	const ownersStub = ["Alex", "Andrew", "Max"];
	const productsStub = [
		{name:"Apple",  description:"Info1", owner:"alex", price:5},
		{name:"Banana", description:"Info2", owner:"alex", price:10},
		{name:"Potato", description:"Info3", owner:"alex", price:12},
		{name:"Potato", description:"Info3", owner:"alex", price:12},
	];

	return (<>
		<Navbar />
		<ProductsSearchBar owners={ownersStub}/>
		<ProductsContainer products={productsStub}/>
	</>)
}

export default Products