import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';  
import '../Components/styles/ProfilePage.css';
import { CartContext } from '../Context/CartContext'; 
import { useWishlist } from '../Context/WishListContext';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 

function ProfilePage() {
    const { cartItems } = useContext(CartContext);
    const { wishlistItems } = useWishlist();
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [isEditable, setIsEditable] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found, redirecting to login...');
            navigate('/login'); 
        } else {
            console.log('Token found, fetching profile data...');
            const decodedToken = jwtDecode(token);
            fetchProfileData(token, decodedToken); 
        }
    }, [navigate]);

    const fetchProfileData = async (token, decodedToken) => {
        try {
           
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

            const response = await axios.get(`https://localhost:7112/api/Auth/GetById/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });

            console.log('Profile data fetched successfully:', response.data);
            setProfileData({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
            });
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEdit = () => {
        setIsEditable(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decodedToken = jwtDecode(token);
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    
            await axios.put(`https://localhost:7112/api/Auth/UpdateUser/${userId}`, profileData, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            alert('Profile data updated successfully!');
            setIsEditable(false);
        } catch (error) {
            console.error('Error updating profile data:', error);
        }
    };
    

    return (
        <div className="profile-container">
            <h2 className="text-center">Profile</h2>
            <form onSubmit={handleSubmit} className="profile-form">
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName" 
                        value={profileData.firstName} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditable} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName" 
                        value={profileData.lastName} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditable} 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email" 
                        value={profileData.email} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditable} 
                    />
                </div>
                <button type="button" onClick={handleEdit} className="edit-btn">Edit</button>
                {isEditable && <button type="submit" className="submit-btn">Save</button>}
            </form>
             {/* Flexbox for Cart and Wishlist */}
             <div className="details-container">
                {/* Cart Details Section */}
                <div className="cart-details">
                    <h3>Cart Items ({cartItems.length})</h3>
                    {/* Render cart items here */}
                </div>

                {/* Wishlist Details Section */}
                <div className="wishlist-details">
                    <h3>Wishlist Items ({wishlistItems.length})</h3>
                    {/* Render wishlist items here */}
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
