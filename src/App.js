import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Item from "./Components/Items/Items";
import { CartItemsContextProvider } from "./Components/context/cartContext";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Products from "./Components/Products/Products";
import SignIn from "./Components/Login/Signin";
import Items from "./Components/Items/Items";


function App() {
  return (
    <CartItemsContextProvider>
      <div className="App">
        
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route  exact path="/cart" component={Items} />
            <Route  exact path="/products" component={Products} />
            <Route  exact path="/login" component={SignIn} />

          </Switch>
        </Router>
      </div>
    </CartItemsContextProvider>
  );
}

export default App;
