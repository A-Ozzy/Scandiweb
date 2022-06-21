import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
// import AllCategoryPage from '../pages/all-category-page';
// import ClothesCategoryPage from '../pages/clothes-category-page';
// import TechCategoryPage from '../pages/tech-category-page';
import CartPage from '../pages/cart-page';
// import CartOverlay from '../CartOverlay';
import ProductList from '../ProductList';

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
            </Switch>

         </div >
      );
   };
};



