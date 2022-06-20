import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import logo from '../../images/logo.svg';
import shoppingCart from '../../images/shoppingCart.svg';
import { getCategoriesAndCurrency, updateCurrency, updateSelectedCategory, updateOpenCart } from '../../actions';
import FetchingService from '../../queryService';
import { NavLink } from 'react-router-dom';
import CartOverlay from '../CartOverlay';

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
      this.props.updateCurrency(e.target.value);
   };

   onCategoryChange = (e) => {
      this.props.updateSelectedCategory(e.target.textContent);
   };

   onCartClick = () => {
      this.props.updateOpenCart(this.props.isCartOpen);
   }

   render() {

      const {
         categories,
         loading,
         currencies,
         selectedCurrency,
         orders,
         isCartOpen,
      } = this.props;

      const classesOrdersCount = orders.length < 1 ?
         'header-shoppingcart-count' :
         'header-shoppingcart-count active';

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
               value={`${item.label}${item.symbol}`}
            >{item.symbol} {item.label}
            </option>
         )
      });
      const overlayClasses = isCartOpen ?
         'header-shoppingcart-overlay active' :
         'header-shoppingcart-overlay';

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
                        value={`${selectedCurrency.label}${selectedCurrency.symbol}`}
                        onChange={this.handleChangeSelect}>
                        {currencyItem}
                     </select>
                     <span className="currency-icon"></span>
                  </div>
                  <div className='header-shoppingcart'
                  onClick={this.onCartClick}>
                     <div className="cart-icon">
                        <img src={shoppingCart} alt="shoppingcart" />
                     </div>
                     <div className={classesOrdersCount}>{orders.length}</div>
                    
                     <div className={overlayClasses}>
                        <CartOverlay selectedCurrency={selectedCurrency} />
                     </div>
                  </div>
               </div>
            </div>
         </div >
      );
   }
}


const mapStateToProps = ({ mainReducer: {
   categories,
   loading,
   currencies,
   selectedCurrency,
   selectedCategory
},
cartOverlayReducer: { orders, isCartOpen } }) => {

   return {
      categories,
      loading,
      currencies,
      selectedCurrency,
      selectedCategory,
      orders,
      isCartOpen,
   }
};

const mapDispatchToProps = {
   getCategoriesAndCurrency,
   updateCurrency,
   updateSelectedCategory,
   updateOpenCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);