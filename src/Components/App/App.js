import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import CartPage from '../pages/cart-page';
import ProductList from '../ProductList';
import Product from '../Product';

import './App.scss';


export default class App extends Component {
  
   render() {
      return (
         <div className="container">
            <Header />
            <Switch>
               <Redirect from="/" to="/all" component={ProductList} exact />
               <Route path="/all" component={ProductList} />
               <Route path="/clothes" component={ProductList} />
               <Route path="/tech" component={ProductList} />
               <Route path="/cart" component={CartPage} />
               <Route path="/product/:id" render={({ match }) => {
                  return <Product itemId={ match.params.id } />
               }} />
            </Switch>

         </div >
      );
   };
};



