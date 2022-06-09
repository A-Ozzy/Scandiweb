import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import AllCategoryPage from '../pages/all-category-page';
import ClothesCategoryPage from '../pages/clothes-category-page';
import TechCategoryPage from '../pages/tech-category-page';
import CartCategoryPage from '../pages/cart-page';

import './App.scss';


export default class App extends Component {
  
   render() {
      return (
         <div className="container">
            <Header />
            <Switch>
               <Redirect from="/" to="/all" component={AllCategoryPage} exact />
               <Route path="/all" component={AllCategoryPage} />
               <Route path="/clothes" component={ClothesCategoryPage} />
               <Route path="/tech" component={TechCategoryPage} />
               <Route path="/cart" component={CartCategoryPage} />
            </Switch>

         </div >
      );
   };
};



