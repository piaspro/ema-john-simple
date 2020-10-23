import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userCart, userContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';
import * as firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
    const [cart, setCart] = useContext(userCart);
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    const signOut = () => {
        console.log("Out")
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: ''
                };
                setLoggedInUser(signedOutUser);

            }).catch((error) => {
                console.log(error)
            });
    }

    return (
        <div className="Header">
            <img src={logo} alt="" />
            <nav className="header-info">
                <a href="/Shop">Shop</a>
                <a href="/Review">Review</a>
                <a href="/Manage">Manage</a>
                {
                    loggedInUser.name &&
                    <p className="cart-icon">Welcome: {loggedInUser.name}</p>
                }
                {
                    loggedInUser.photo &&
                    <img src={loggedInUser.photo} alt="..." className="user-img" ></img>
                }
                <span className="cart-icon"><FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />{cart.length}</span>
                {
                    loggedInUser.email ? <button className="cart-btn" onClick={signOut}>Sign Out</button>
                        : <Link to="/login"><button className="cart-btn" >Sign In</button></Link>
                }
            </nav>
        </div>
    );
};

export default Header;