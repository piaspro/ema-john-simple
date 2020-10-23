import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd)=> total + prd.price * prd.quantity, 0);
    // shipping cost calculation
    let shipping = 0;
    if (total > 35) {
        shipping = 0;       
    } else if (total > 15){
        shipping = 4.99;
    }else if(total > 0){
        shipping = 12.99;
    }
    // fix to number
    const fixNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    // Tax calculation
    const tax =  fixNumber(total/10);
    // Calculate grand total
    const grandTotal = (total + shipping + tax);
    return (
        <div>
            <div>
                <h3>Order Summary</h3>
                <p>Items Ordered: <strong>{cart.length}</strong></p>
                <p>Product Price: <strong>{fixNumber(total)}</strong></p>
                <p>Shipping Cost: <strong>{shipping}</strong></p>
                <p>Tax: <strong>{tax}</strong></p>
            </div>
            <div>
                <p>Total Price: <strong>{fixNumber(grandTotal)}</strong></p>
                {props.children}
            </div>
        </div>
    );
};

export default Cart;