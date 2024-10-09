
import { useWishlist } from '../Context/WishListContext';

import '../Components/styles/WishList.css';

function WishlistPage() {
  const { wishlistItems, removeItemFromWishlist } = useWishlist();

  return (
      <div className="wishlist-page">
          <h1>Your Wishlist</h1>
          <ul className="wishlist-items">
              {wishlistItems.length > 0 ? wishlistItems.map(item => (
                  <li key={item.id} className="wishlist-item">
                      <img src={item.image} alt={item.name} className="wishlist-item-image" />
                      <div className="wishlist-item-details">
                          <strong>{item.name}</strong>
                          <div className="wishlist-item-price">₹ {item.price.toFixed(2)}</div>
                      </div>
                      <button 
                          className="remove-button" 
                          onClick={() => removeItemFromWishlist(item.id)}
                      >
                          Remove
                      </button>
                  </li>
              )) : <p className="empty-wishlist-message">Your wishlist is empty.</p>}
          </ul>
      </div>
  );
}

export default WishlistPage;