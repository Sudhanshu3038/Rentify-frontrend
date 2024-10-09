import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';

function CartPage() {
    const { cartItems, removeItemFromCart } = useContext(CartContext);

    
    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}> 
            <h1 style={{ marginBottom: '20px' }}>Your Cart</h1>
            
            {/* Cart Items List */}
            <ul style={{ padding: 0, listStyle: 'none' }}>
                {cartItems.length > 0 ? cartItems.map(item => (
                    <li 
                        key={item.id} 
                        style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            marginBottom: '20px',
                            padding: '10px', 
                            border: '1px solid #ddd', 
                            borderRadius: '10px',
                            backgroundColor: '#f9f9f9'
                        }}>
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ 
                                width: '150px', 
                                height: '150px', 
                                objectFit: 'cover', 
                                borderRadius: '10px'
                            }} 
                        />

                        {/* Item Details */}
                        <div style={{ flexGrow: 1, marginLeft: '20px', textAlign: 'left' }}>  
                            <strong style={{ fontSize: '1.2rem' }}>{item.name}</strong><br />
                            <span>Price: ₹ {item.price.toFixed(2)}</span><br />
                            <span>Quantity: {item.quantity}</span>
                        </div>

                        {/* Remove Button */}
                        <button 
                            className="remove-button" 
                            style={{
                                backgroundColor: '#ff4d4d', 
                                color: 'white', 
                                border: 'none', 
                                padding: '10px 20px', 
                                borderRadius: '5px', 
                                cursor: 'pointer'
                            }} 
                            onClick={() => removeItemFromCart(item.id)}>
                            Remove
                        </button>
                    </li>
                )) : (
                    <p style={{ fontSize: '1.2rem', color: '#555' }}>Your cart is empty.</p>
                )}
            </ul>

            {/* Total Price Section */}
            {cartItems.length > 0 && (
                <div style={{ marginTop: '20px', textAlign: 'right' }}> 
                    <h2>Total Price: ₹ {totalPrice.toFixed(2)}</h2>
                </div>
            )}
        </div>
    );
}

export default CartPage;