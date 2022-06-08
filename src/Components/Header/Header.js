import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import logo from '../../images/logo.svg';
import shoppingCart from '../../images/shoppingCart.svg';
import { getCategoriesAndCurrency, changeCurrency } from '../../actions';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {

   componentDidMount() {
      fetch("http://localhost:4000/graphql", {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            query: `
               {
                  categories{
                  name
                  }
                  currencies {
                  label
                  symbol
                  }
               }
             `,
         }),
      })
         .then((res) => res.json())
         .then((result) => {

            this.props.getCategoriesAndCurrency(result.data)

         });
   };

   handleChangeSelect = (e) => {
      this.props.changeCurrency(e.target.value)
   };

   render() {

      const {
         categories,
         loading,
         currencies,
         selectedCurrency,
         selectedCategory } = this.props;
      
      console.log(selectedCategory);
      
      const categoryItem = loading ? <Spinner /> : categories.map((item) => {
         return (
            <li className="header-list-item" key={item.name}>
               <Link to={`/${item.name.toLowerCase()}`} className="header-list-link">{item.name}</Link>
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
               <ul className="header-list">
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
                  <select className="header-currency"
                     value={selectedCurrency}
                     onChange={this.handleChangeSelect}>
                     {currencyItem}
                  </select>
                  <Link to="/cart" className="header-shoppingcart">
                     <img src={shoppingCart} alt="shoppingcart" />
                  </Link>
               </div>
            </div>
         </div>
      );
   }
}


const mapStateToProps = ({ categories, loading, currencies, selectedCurrency,selectedCategory }) => {
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
   changeCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);