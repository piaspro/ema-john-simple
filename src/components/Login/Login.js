import React, { useContext } from 'react';
import { userContext } from '../../App';
import firebaseConfig from './FirebaseConfig'
import * as firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router-dom';
import google from '../../images/google.png'
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        console.log("clicked")
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider)
            .then((result) => {
                const { displayName, email, photoURL } = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signedInUser);
                storeAuthToken()
                history.replace(from);
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorMessage = error.message;
                console.log(errorMessage)

            });
    }
    // Use of token for authentication
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then((idToken) => {
                sessionStorage.setItem('token', idToken)
            }).catch((error) => {
                // Handle error
                console.log(error)
            });
    }
    return (
        <div className="logIn">
            <h2>Log In</h2>
            <button onClick={googleSignIn} className="signIn"> <img className="icon mr-5" src={google} alt='' /> Sign In With google </button>
        </div>
    );
};

export default Login;