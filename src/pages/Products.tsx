import Navbar from './components/Navbar'
import React, {useState} from 'react';

import './Products.css'

const ProductsSearchBar = () => {
	const [sorting, setSorting] = useState("");
	const [owner, setOwner] = useState("");
	const [name, setName] = useState("");

	const owners = ["Alex", "Andrew", "Max"];//STUB

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

		<button className='search-button' onClick={handleFindClick}>Find</button>
	</div>)
};

const ProductsTable = () => {
	return (<>
		ProductsTable
	</>)
};

function Products() {
	return (<>
		<Navbar />
		<ProductsSearchBar />
		<ProductsTable />
	</>)
}

export default Products