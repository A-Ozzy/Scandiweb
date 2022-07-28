import React, { Component } from 'react';
import {  Route, Switch, Redirect } from 'react-router-dom';
import Header from '../Header';
import Cart from '../Cart';
import ProductList from '../ProductList';
import Product from '../Product';
import { connect } from 'react-redux';
import { updateDropdown } from '../../actions';

import './App.scss';


class App extends Component {

   render() {
      return (
         <div className="container" onClick={() => this.props.dropdownIsOpen && this.props.updateDropdown(false)}>
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


const mapStateToProps = ({
   mainReducer: { dropdownIsOpen }}) => {

   return {
      dropdownIsOpen,
   }
};

const mapDispatchToProps = {
   updateDropdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

