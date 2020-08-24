import React, { useState } from 'react';
import fakeData from '../../fakeData';
import './Shop.css'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const FirstTen = fakeData.slice(0,10);
    const [Products, setProducts] = useState(FirstTen);
    const [cart, setCart] = useState([]);
    const HandleAddProduct = (Product) => {
        console.log("clicked", Product);
        const newCart = [...cart, Product];
        setCart(newCart);
    }
    return (
        <div className= "shop-container">
           <div className="product-container">
                {
                    Products.map(product => <Product 
                        item={product}
                        AddProduct={HandleAddProduct}
                        ></Product>)
                }
           </div>
           <div className="cart-container">
               <Cart cart= {cart}></Cart>
           </div>
        </div>
    );
};

export default Shop;