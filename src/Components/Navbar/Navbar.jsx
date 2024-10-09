import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import { useWishlist } from '../../Context/WishListContext'; 
import './Navbar.css';
import loginImage from '../../assests/login.png';
import WishListImage from '../../assests/wishlist.png';
import ShoppingCartImage from '../../assests/shopping-cart.png';
import HomeImage from '../../assests/home.png';

function Navbar() {
    const [searchTerm, setSearchTerm] = useState('');
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useWishlist(); 
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`); 
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(prev => !prev);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <h2>Rentify</h2>
            </div>
        
            <form onSubmit={handleSearch} className="search-box">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
        
            <ul className="navbar-links">
                <li>
                    <NavLink to="/">
                        <img className='home-img' src={HomeImage} alt="Home" />
                    </NavLink>
                </li>
                <li className="cart-icon">
                    <NavLink to="/cart">
                        <img className='shopping-img' src={ShoppingCartImage} alt="Shopping Cart" />
                        {cartItems.length > 0 && (
                            <span className="cart-count">{cartItems.length}</span>
                        )}
                    </NavLink>
                </li>
                <li className="wishlist-icon">
                    <NavLink to="/wishlist">
                        <img className='wishlist-img' src={WishListImage} alt="Wishlist" />
                        {wishlistItems.length > 0 && (
                            <span className="wishlist-count">{wishlistItems.length}</span>
                        )}
                    </NavLink>
                </li>

                {/* Account Dropdown */}
                <li className="account-dropdown" onClick={toggleDropdown}>
                    <div className="dropdown-toggle">
                        <img className='login-img' src={loginImage} alt="Account" />
                    </div>

                    <ul className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}> 
                        <li>
                            <NavLink to="/login" onClick={() => { closeDropdown(); }}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile" onClick={() => { closeDropdown(); }}>
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/logout" onClick={() => { closeDropdown(); }}>
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
