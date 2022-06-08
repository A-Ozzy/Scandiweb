import React, { Component } from 'react';
import {  Route, Switch} from 'react-router-dom';
import Header from '../Header';
import AllCategoryPage from '../pages/all-category-page';
import ClothesCategoryPage from '../pages/clothes-category-page';
import TechCategoryPage from '../pages/tech-category-page';
import CartCategoryPage from '../pages/cart-page';

import './App.css';


export default class App extends Component {
  
   render() {

      return (
         <div className="container">
            <Header />
            <Switch>
               <Route path="/all" component={AllCategoryPage} exact/>
               <Route path="/clothes" component={ClothesCategoryPage} exact/>
               <Route path="/tech" component={TechCategoryPage} exact/>
               <Route path="/cart" component={CartCategoryPage} exact/>
            </Switch>
         </div >
      );
   };
};



