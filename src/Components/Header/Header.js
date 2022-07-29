import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import logo from '../../images/logo.svg';
import shoppingCart from '../../images/shoppingCart.svg';
import { getCategoriesAndCurrency, updateCurrency, updateSelectedCategory, updateOpenCart, updateDropdown } from '../../actions';
import FetchingService from '../../queryService';
import { withRouter, NavLink } from 'react-router-dom';
import CartOverlay from '../CartOverlay';
import Dropdown from '../Dropdown';

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


   onCategoryChange = (e) => {
      this.props.updateSelectedCategory(e.target.textContent);
   };

   componentDidUpdate(prevProps) {
      if (this.props.isCartOpen !== prevProps.isCartOpen) {
         document.body.classList.toggle("lock");
      }
   };

   onCartClick() {
      if (this.props.dropdownIsOpen) {
         this.props.updateDropdown(false);
      }
      this.props.updateOpenCart(this.props.isCartOpen)
   };

   render() {

      const {
         categories,
         loading,
         selectedCurrency,
         orders,
         isCartOpen,
      } = this.props;

      const categoryItem = loading ? <Spinner /> : categories.map((item) => {
         return (
            <li className="header-list-item" key={item.name}>
               <NavLink to={`/category/${item.name.toLowerCase()}`} className="header-list-link">{item.name}</NavLink>
            </li>
         )
      });
      const quantity = orders.reduce((acc, curr) => acc + curr.count, 0);

      return (
         <div className={`header ${isCartOpen ? 'active' : ''}`}>
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
                     <Dropdown />
                  </div>
                  <div className='header-shoppingcart'
                     onClick={() => this.onCartClick()}>
                     <div className="cart-icon">
                        <img src={shoppingCart} alt="shoppingcart" />
                     </div>
                     <div className={`header-shoppingcart-count ${orders.length < 1 ? "" : "active"}`}>{quantity}</div>
                     <div className={`header-shoppingcart-overlay ${isCartOpen ? "active" : ""}`}>
                        <CartOverlay selectedCurrency={selectedCurrency} />
                     </div>
                  </div>
               </div>
            </div>
         </div >
      );
   }
}

Header.propTypes = {
   categories: PropTypes.arrayOf(PropTypes.object).isRequired,
   loading: PropTypes.bool,
   selectedCurrency: PropTypes.object,
   orders: PropTypes.arrayOf(PropTypes.object),
   isCartOpen: PropTypes.bool,
   currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
   selectedCategory: PropTypes.string,
   dropdownIsOpen: PropTypes.bool,

   getCategoriesAndCurrency: PropTypes.func,
   updateCurrency: PropTypes.func,
   updateSelectedCategory: PropTypes.func,
   updateOpenCart: PropTypes.func,
   updateDropdown: PropTypes.func,
}


const mapStateToProps = ({ mainReducer: {
   categories,
   loading,
   currencies,
   selectedCurrency,
   selectedCategory,
   dropdownIsOpen
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
      dropdownIsOpen,
   }
};

const mapDispatchToProps = {
   getCategoriesAndCurrency,
   updateCurrency,
   updateSelectedCategory,
   updateOpenCart,
   updateDropdown,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));