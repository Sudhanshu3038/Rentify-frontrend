import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import '../Components/styles/CheckoutPage.css';

function CheckoutPage() {
    const { cartItems } = useContext(CartContext);
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    
    const handleCheckout = (e) => {
        e.preventDefault();
    

        alert('Checkout successful!'); 
        
    };

    return (
        <div className="checkout-container">
            <h2 className="text-center">Checkout</h2>
            <div className="cart-summary">
                <h3>Cart Items</h3>
                {cartItems.length > 0 ? (
                    <ul className="list-group">
                        {cartItems.map((item) => (
                            <li key={item.id} className="list-group-item">
                                {item.name} - ₹{item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No items in the cart.</p>
                )}
                <h4>Total Price: ₹{totalPrice}</h4>
            </div>

            <form onSubmit={handleCheckout} className="checkout-form">
                <h3>Shipping Information</h3>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" required />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input type="text" className="form-control" id="address" required />
                </div>
                <div className="form-group">
                    <label htmlFor="city">City:</label>
                    <input type="text" className="form-control" id="city" required />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State:</label>
                    <input type="text" className="form-control" id="state" required />
                </div>
                <div className="form-group">
                    <label htmlFor="zip">Zip Code:</label>
                    <input type="text" className="form-control" id="zip" required />
                </div>

                <h3>Payment Information</h3>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input type="text" className="form-control" id="cardNumber" required />
                </div>
                <div className="form-group">
                    <label htmlFor="expiry">Expiry Date:</label>
                    <input type="text" className="form-control" id="expiry" placeholder="MM/YY" required />
                </div>
                <div className="form-group">
                    <label htmlFor="cvv">CVV:</label>
                    <input type="text" className="form-control" id="cvv" required />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Complete Purchase</button>
                </div>
            </form>
        </div>
    );
}

export default CheckoutPage;
