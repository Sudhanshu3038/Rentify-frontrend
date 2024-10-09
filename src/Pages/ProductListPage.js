import React, { useState } from 'react'; 
import { useParams, Link } from 'react-router-dom';
import { products } from '../productsApi/productsItem';
import "../Components/styles/ProductListPage.css";

function ProductListPage() {
  const { category, productType } = useParams();
  const [sortOption, setSortOption] = useState(''); 
  const [priceRange, setPriceRange] = useState([0, 10000]);

  let filteredProducts = products.filter((product) =>
    product.category.toLowerCase() === productType.toLowerCase()
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  if (sortOption === 'lowToHigh') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'highToLow') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  filteredProducts = filteredProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const handleMinPriceChange = (value) => {
    if (value <= priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  return (
    <div className="product-list-container d-flex">
      {/* Filters Section */}
      <div className="filter-section me-3">
        <h2>{category.charAt(0).toUpperCase() + category.slice(1)} - {productType.charAt(0).toUpperCase() + productType.slice(1)}</h2>

        {/* Sort Dropdown */}
        <div className="filter-item sort-filter mb-3">
          <label htmlFor="sort">Sort by Price: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange} className="form-select">
            <option value="">Select</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="filter-item price-range-filter mb-3">
          <label htmlFor="priceRange" className="form-label">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <div className="d-flex justify-content-between align-items-center">
            <span>₹0</span>
            <input
              type="range"
              id="minPrice"
              className="form-range"
              min="0"
              max="10000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handleMinPriceChange(Number(e.target.value))}
              style={{ width: '45%' }}
            />
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="d-flex justify-content-center flex-wrap">
        {filteredProducts.map((product) => (
          <div className="card" key={product.id} style={{ width: '18rem', margin: '1rem' }}>
            <Link to={`/product/${product.category}/${product.id}`}>
              <img src={product.image} className="card-img-top" alt={product.name} />
            </Link>
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductListPage;
