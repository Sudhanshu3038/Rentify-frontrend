import React, { createContext, useState, useContext } from 'react';


export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState([]);

    const addItemToWishlist = (item) => {
        setWishlistItems([...wishlistItems, item]);
    };

    const removeItemFromWishlist = (itemId) => {
        setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
    };

    return (
        <WishlistContext.Provider value={{ wishlistItems, addItemToWishlist, removeItemFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export const useWishlist = () => useContext(WishlistContext);