import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FilterComponent = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [colorFilter, setColorFilter] = useState('');
    const [sizeFilter, setSizeFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');

    useEffect(() => {
        // Fetch products from the API
        axios.get('http://localhost:3002/admin/get')
            .then(response => {
                setProducts(response.data);
                setFilteredProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        // Apply filters whenever filter criteria change
        let filtered = products;

        if (colorFilter) {
            filtered = filtered.filter(product => product.color === colorFilter);
        }

        if (sizeFilter) {
            filtered = filtered.filter(product => product.size === sizeFilter);
        }

        if (typeFilter) {
            filtered = filtered.filter(product => product.type === typeFilter);
        }

        setFilteredProducts(filtered);
    }, [colorFilter, sizeFilter, typeFilter, products]);

    return (
        <div>
            <h1>Product List</h1>
            <div>
                <h2>Filters</h2>
                <div>
                    <label>Color:</label>
                    <select value={colorFilter} onChange={(e) => setColorFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="green">Green</option>
                        {/* Add more colors as needed */}
                    </select>
                </div>
                {/* Uncomment and adjust the following block if size filtering is required
                <div>
                    <label>Size:</label>
                    <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                    </select>
                </div>
                */}
                <div>
                    <label>Type:</label>
                    <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                        <option value="">All</option>
                        <option value="dress">Dress</option>
                        <option value="shirt">Shirt</option>
                        <option value="saree">Saree</option>
                        {/* Add more types as needed */}
                    </select>
                </div>
            </div>
            <div>
                <h2>Products</h2>
                <ul>
                    {filteredProducts.map(product => (
                        <li key={product._id}>{product.name} - {product.color} - {product.size} - {product.type}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterComponent;