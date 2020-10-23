import React, { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import Error from './components/Error/Error';
import ProductDetail from './components/ProductDetail/ProductDetail';
import { createContext } from 'react';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userCart = createContext()
export const userContext = createContext()

function App() {
  const [cart, setCart] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <div>
      <userCart.Provider value={[cart, setCart]}>
        <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
          <Router>
            <Header></Header>
            <Switch>
              <Route path="/Shop">
                <Shop></Shop>
              </Route>
              <Route path="/Review">
                <Review></Review>
              </Route>
              <Route path="/Manage">
                <Manage></Manage>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/shipment">
                <Shipment></Shipment>
              </PrivateRoute>
              <Route path="/product/:productKey">
                <ProductDetail></ProductDetail>
              </Route>
              <Route exact path="/">
                <Shop></Shop>
              </Route>
              <Route path="*">
                <Error></Error>
              </Route>
            </Switch>
          </Router>
        </userContext.Provider>
      </userCart.Provider>
    </div>
  );
}

export default App;
