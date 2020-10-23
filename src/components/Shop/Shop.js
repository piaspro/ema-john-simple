import React, { useContext, useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userCart } from '../../App';

const Shop = () => {
    const FirstTen = fakeData.slice(0, 15);
    const [Products, setProducts] = useState(FirstTen);
    const [cart, setCart] = useContext(userCart);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    const HandleAddProduct = (Product) => {
        const toBeAdded = Product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAdded);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAdded)
            newCart = [...others, sameProduct];
        } else {
            Product.quantity = 1;
            newCart = [...cart, Product];
        }
        setCart(newCart);

        addToDatabaseCart(Product.key, count);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    Products.map(product => <Product
                        showAddToCart={true}
                        key={product.key}
                        item={product}
                        AddProduct={HandleAddProduct}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/Review"><button className="cart-btn">Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;