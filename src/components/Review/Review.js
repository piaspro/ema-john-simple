import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import { Link, useHistory } from 'react-router-dom';
import { userCart } from '../../App';

const Review = () => {
    const [cart, setCart] = useContext(userCart);
    const history = useHistory()

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey); 
    }
    
    const placeOrder = () => {
        history.push('/shipment');
    }

    return (
        <div className="shop-container">
            <div  className="product-container">
                {
                    cart.map(pd => <ReviewItem 
                        removeProduct = {removeProduct}
                        key ={pd.key}
                        product = {pd}></ReviewItem> )
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}>
                    <button onClick={placeOrder} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;