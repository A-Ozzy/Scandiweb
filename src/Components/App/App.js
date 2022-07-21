import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import Cart from '../Cart';
import ProductList from '../ProductList';
import Product from '../Product';

import './App.scss';


export default class App extends Component {
  
   render() {
      return (
         <div className="container">
            <Header />
            <Switch>
               <Redirect from="/" to="/category/all" component={ProductList} exact />
               <Route path="/category/:category" render={({ match }) => {
                  return <ProductList category={ match.params.category } />
               }} />
               <Route path="/cart" component={Cart} /> 
               <Route path="/product/:id" render={({ match }) => {
                  return <Product itemId={ match.params.id } />
               }} />
            </Switch>
         </div >
      );
   };
};



