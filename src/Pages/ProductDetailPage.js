import React, { useState, useContext } from "react"; 
import { useParams, useNavigate } from "react-router-dom"; 
import { CartContext } from '../Context/CartContext'; 
import { useWishlist } from '../Context/WishListContext';
import { Modal, Button } from 'react-bootstrap';
import { products } from '../productsApi/productsItem';
import "../Components/styles/ProductDetailPage.css";

function ProductDetailPage() {
  const { category, id } = useParams();
  const navigate = useNavigate(); 
  const { addItemToCart } = useContext(CartContext); 
  const { addItemToWishlist } = useWishlist(); 
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [quantity, setQuantity] = useState(1); 

  const product = products.find((p) => p.id === parseInt(id) && p.category === category);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addItemToCart({ ...product, quantity }); 
    setModalMessage(`${product.name} has been added to the cart!`);
    setShowModal(true);
  };

  const handleAddToWishlist = () => {
    addItemToWishlist(product); 
    setModalMessage(`${product.name} has been added to the wishlist!`);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleBuyNow = () => {
    addItemToCart({ ...product, quantity }); 
    navigate('/checkout'); 
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>Category: {product.category}</p>
          <p>Price: ₹{product.price}</p>
          <p>Model: {product.Model}</p>
          <p>Size: {product.Size}</p>
          <p>Material: {product.Material}</p>
          <p>Description: {product.Description}</p>
          <div className="quantity-input">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              max="5" 
              onChange={(e) => setQuantity(Number(e.target.value))}
              style={{ width: '60px' }}
            />
          </div>
        </div>
      </div>
      <div className="product-buttons">
        <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
        <button className="btn btn-secondary" onClick={handleAddToWishlist}>Add to Wishlist</button>
        <button className="btn btn-success" onClick={handleBuyNow}>Buy Now</button> 
      </div>

      {/* Modal for confirmation */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductDetailPage;
