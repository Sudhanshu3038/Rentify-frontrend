import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "../Components/styles/HomePage.css";
import { CartContext } from '../Context/CartContext';  
import { WishlistContext } from '../Context/WishListContext';  
import { Modal, Button } from "react-bootstrap";
import sliderClothe1 from "../../src/assests/slider/slidercloths01.avif";
import sliderClothe2 from "../../src/assests/slider/slidercloths02.avif";
import sliderClothe3 from "../../src/assests/slider/slidercloths03.jpg";
import Carousel from "react-bootstrap/Carousel";
import { products } from '../productsApi/productsItem';

function HomePage() {
  const { addItemToCart } = useContext(CartContext);
  const { addItemToWishlist } = useContext(WishlistContext);
  const [categories, setCategories] = useState([]); 
  const [subCategories, setSubCategories] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [visibleCategory, setVisibleCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);  
  const [modalMessage, setModalMessage] = useState('');
  const [hover, setHover] = useState(false);

  const handleClose = () => setShowModal(false); 
  const handleShow = (message) => {
    setModalMessage(message); 
    setShowModal(true); 
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7112/api/Category/GetAllCategory'); 
        setCategories(response.data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get('https://localhost:7112/api/SubCategory/GetAllSubCategory'); 
        setSubCategories(response.data); 
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };
    fetchSubCategories();
  }, []);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const sortProducts = (productsList) => {
    if (sortOrder === 'highToLow') {
      return [...productsList].sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'lowToHigh') {
      return [...productsList].sort((a, b) => a.price - b.price);
    }
    return productsList;
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  const toggleCategory = (category) => {
    setVisibleCategory((prevCategory) => prevCategory === category ? null : category);
  };

  const filterProductsByCategory = (category) => {
    return products.filter((product) => product.category === category);
  };

  const handleAddToCart = (product) => {
    addItemToCart(product);
    handleShow(`${product.name} has been added to your cart!`);
  };

  const handleAddToWishlist = (product) => {
    addItemToWishlist(product);
    handleShow(`${product.name} has been added to your wishlist!`);
  };

  return (
    <div>
      {/* Dropdown Menu for Categories */}
      <div className="product-section">
        {categories.map((cat) => (
          <div className="category" key={cat.categoryId}>
            <h3 onClick={() => toggleCategory(cat.categoryName)}>
              {cat.categoryName.charAt(0).toUpperCase() + cat.categoryName.slice(1)}
            </h3>
            {visibleCategory === cat.categoryName && (
              <ul>
                {/* Display corresponding subcategories for the selected category */}
                {subCategories
                  .filter(subCat => subCat.categoryId === cat.categoryId) 
                  .map((subCat) => (
                    <li key={subCat.subCategoryId}>
                      <Link to={`/products/${cat.categoryName}/${subCat.subCategoryName}`}>
                        {subCat.subCategoryName.charAt(0).toUpperCase() + subCat.subCategoryName.slice(1)}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}

        {/* Sort Dropdown */}
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="sorting-item">
          <h3>Sort</h3>
          <ul className="sorting-item1" style={{ display: hover ? 'block' : 'none' }}>
            <div>
              <button onClick={() => handleSort('highToLow')}>High to Low</button>
            </div>
            <button onClick={() => handleSort('lowToHigh')}>Low to High</button>
          </ul>
        </div>
      </div>

      {/* Carousel */}
      <Carousel className="home-carousel">
        {[sliderClothe1, sliderClothe2, sliderClothe3].map((img, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={img} alt={`Slide ${idx + 1}`} />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Featured Products */}
      <h2 className="mt-5 text-center">Featured Products</h2>

      {/* Display Products by SubCategory */}
      {["watches", "shoes", "clothes"].map((cat) => (
        <div key={cat}>
          <h3 className="text-center mt-4">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h3>
          <div className="d-flex justify-content-center flex-wrap">
            {sortProducts(filterProductsByCategory(cat)).map((product) => (
              <div className="card" key={product.id} style={{ width: '18rem', margin: '1rem' }}>
                <Link to={`/product/${product.category}/${product.id}`}>
                  <img src={product.image} className="card-img-top" alt={product.name} />
                </Link>
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">₹{product.price}</p>
                  <div className="d-flex justify-content-between">
                    {/* Add to Cart */}
                    <button 
                      className="btn btn-primary" 
                      onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>

                    {/* Add to Wishlist */}
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleAddToWishlist(product)}>
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Modal for Confirmation */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h4>About Rentify</h4>
            <h5>Rentify is your go-to platform for top-notch fashion products.</h5>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul>
              <li>Email: contact@rentify.com</li>
              <li>Phone: +91 6201555896</li>
              <li>Address: Near Shiv Mandir, Bhaniyawala</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <ul className="social-media">
              <li><a href="https://www.facebook.com/">Facebook</a></li>
              <li><a href="https://www.instagram.com/">Instagram</a></li>
              <li><a href="http://www.twitter.com/">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <h5>&copy; 2024 Rentify. All rights reserved.</h5>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
