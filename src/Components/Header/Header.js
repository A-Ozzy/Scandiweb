import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import logo from '../../images/logo.svg';
import shoppingCart from '../../images/shoppingCart.svg';
import { getCategoriesAndCurrency, updateCurrency, updateSelectedCategory } from '../../actions';
import FetchingService from '../../queryService';
import { NavLink, Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {

   fetchData = new FetchingService();

   componentDidMount() {

      const { getData } = this.fetchData;

      const query = `
             query {
                 categories{
                 name
                 }
                 currencies {
                 label
                 symbol
                 }
              }
            `;

      getData(query)
         .then((res) => this.props.getCategoriesAndCurrency(res));
   };

   handleChangeSelect = (e) => {
      this.props.updateCurrency(e.target.value)
   };

   onCategoryChange = (e) => {
      this.props.updateSelectedCategory(e.target.textContent);
   }

   render() {

      const {
         categories,
         loading,
         currencies,
         selectedCurrency,
      } = this.props;


      const categoryItem = loading ? <Spinner /> : categories.map((item) => {
         return (
            <li className="header-list-item" key={item.name}>
               <NavLink to={`/${item.name.toLowerCase()}`} className="header-list-link">{item.name}</NavLink>
            </li>
         )
      });

      const currencyItem = currencies.map((item) => {
         return (
            <option className="header-currency-item"
               key={item.label}
               value={item.label}
            >{item.symbol} {item.label}
            </option>
         )
      });

      return (
         <div className='header'>
            <div className="header-item">
               <ul className="header-list"
                  onClick={this.onCategoryChange}>
                  {categoryItem}
               </ul>
            </div>
            <div className="header-item">
               <div className="header-icon">
                  <img src={logo} alt="icon" />
               </div>
            </div>
            <div className="header-item">
               <div className="header-service">
                  <div className="header-select">
                     <select className="header-currency"
                        value={selectedCurrency}
                        onChange={this.handleChangeSelect}>
                        {currencyItem}
                     </select>
                     <span className="currency-icon"></span>
                  </div>
                  <Link to="/cart" className="header-shoppingcart">
                     <img src={shoppingCart} alt="shoppingcart" />
                  </Link>
               </div>
            </div>
         </div >
      );
   }
}


const mapStateToProps = ({ categories, loading, currencies, selectedCurrency, selectedCategory }) => {
   return {
      categories,
      loading,
      currencies,
      selectedCurrency,
      selectedCategory,
   }
};

const mapDispatchToProps = {
   getCategoriesAndCurrency,
   updateCurrency,
   updateSelectedCategory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);