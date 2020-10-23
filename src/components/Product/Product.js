import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, stock, price, seller, key} = props.item;
    return (
        <div className='product'>
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-detail">
                <h3><Link to={"/product/"+ key}  className="product-name">{name}</Link></h3>
                <p>by <strong>{seller}</strong></p>
                <h5>${price}</h5>
                <p>Only {stock} Left in Stock</p>
                {props.showAddToCart && <button 
                className='cart-btn'
                onClick={() => props.AddProduct(props.item)}
                > <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>}
            </div>   
        </div>
    );
};

export default Product;