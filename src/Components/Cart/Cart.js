import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OverlayItem from '../OverlayItem';
import { connect } from 'react-redux';

import './Cart.scss';

class Cart extends Component {

   render() {

      const { orders, total, selectedCurrency } = this.props;

      const overlayItems = orders.map((item, i) => {
         return (
            <div key={`${item.name}${i}`} className="overlay-item item">
               <OverlayItem item={item} />
            </div>
         );
      });

      const tax = (total * 0.21).toFixed(2);
      const quantity = orders.reduce((acc, curr) => acc + curr.count, 0);

      return (
         <div className="cart">
            <div className="cart-title">Cart</div>
            <div className="cart-list">
               {overlayItems}

            </div>
            <div className="cart-info">
               <div className="infoitem">
                  <div className="infoitem-titles">
                     <div className="infoitem-name">Tax21%:</div>
                     <div className="infoitem-name">Quantity:</div>
                     <div className="infoitem-name">Total:</div>
                  </div>
                  <div className="infoitem-values">
                     <div className="infoitem-value">{`${selectedCurrency.symbol}${tax}`}</div>
                     <div className="infoitem-value">{quantity}</div>
                     <div className="infoitem-value">{`${selectedCurrency.symbol}${total}`}</div>
                  </div>
               </div>
            </div>
            <button className="cart-button">order</button>
         </div>
      );

   }
}

Cart.propTypes = {
   orders: PropTypes.arrayOf(PropTypes.object),
   total: PropTypes.number,
   selectedCurrency: PropTypes.object,
};

const mapStateToProps = ({ mainReducer: { selectedCurrency }, cartOverlayReducer: { orders, total } }) => {
   return {
      orders,
      total,
      selectedCurrency
   }
};

export default connect(mapStateToProps)(Cart);