import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css'

const Product = (props) => {
    return (
        <div className='product'>
            <div>
                <img src={props.item.img} alt=""/>
            </div>
            <div>
                <h3 className="product-name">{props.item.name}</h3>
                <p>by <strong>{props.item.seller}</strong></p>
                <h5>${props.item.price}</h5>
                <p>Only {props.item.stock} Left in Stock</p>
                <button 
                className='cart-btn'
                onClick={() => props.AddProduct(props.item)}
                > <FontAwesomeIcon icon={faShoppingCart} />Add to cart</button>
            </div>   
        </div>
    );
};

export default Product;