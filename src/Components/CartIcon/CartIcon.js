import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import shoppingCart from '../../images/shoppingCart.svg';

import './CartIcon.scss';


class CartIcon extends Component {
   render() {
      return (
         <Link to="/cart" className='cart'>
            <div className="cart-icon">
               <img src={shoppingCart} alt="shoppingcart" />
            </div>
            <div className="cart-icon-count">2</div>
         </Link>
      );
   }
}

export default CartIcon;