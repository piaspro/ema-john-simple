import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product
    return (
        <div>
            <h2>{name}</h2>
            <h4>Quantity: {quantity}</h4>
            <p>Price: <strong>{price}</strong></p>
            <button className='cart-btn'
            onClick={() => props.removeProduct(key)}
            >remove</button>
        </div>
    );
};

export default ReviewItem;