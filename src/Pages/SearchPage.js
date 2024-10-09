import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { products } from "../productsApi/productsItem";
import '../Components/styles/SearchPage.css';
function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const location = useLocation();

 
  useEffect(() => {
    const query = new URLSearchParams(location.search).get("query") || "";
    setSearchQuery(query);
    filterProducts(query);
  }, [location]);

  const filterProducts = (query) => {
    const filtered = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredProducts(filtered);
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterProducts(query);
  };

  return (
    <div className="search-page">
      {/* Search Input */}
      <div className="search-box">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search for clothes, shoes, watches..."
          className="search-input"
        />
      </div>

      {/* Display Filtered Products */}
      <div className="product-results">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="card" key={product.id} style={{ width: "18rem", margin: "1rem" }}>
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">₹{product.price}</p>
                <button className="btn btn-primary">Add to Cart</button>
                <button className="btn btn-secondary">Wishlist</button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
