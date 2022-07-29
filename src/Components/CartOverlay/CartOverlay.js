import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import OverlayItem from '../OverlayItem';
import { Link } from 'react-router-dom';
import { updateOpenCart } from '../../actions';

import './CartOverlay.scss';

class CartOverlay extends Component {

   render() {

      const { orders, selectedCurrency, total, isCartOpen } = this.props;

      const overlayItems = orders.map((item, i) => {

         return (
            <div key={`${item.id}${i}`} className="overlay-item item">
               <OverlayItem item={item} />
            </div>

         );

      });

      if (orders.length < 1) {

         return (
            <div className='overlay'>
               <div className='overlay-empty'>Сart is empty</div>
            </div>
         )
      }

      return (
         <div className='overlay' onClick={e => e.stopPropagation()}>
            <div className="overlay-title">My Bag: <span>{orders.length} items</span></div>
            <div className="overlay-list">
               {overlayItems}

            </div>
            <div className="overlay-info">
               <div className="overlay-total">Total</div>
               <div className="overlay-price">{`${selectedCurrency.symbol}${total}`}</div>
            </div>
            <div className="overlay-buttons buttons">
               <Link to="/cart" className="buttons-view btn"
                  onClick={() => this.props.updateOpenCart(isCartOpen)}>view bag</Link>
               <button className="buttons-check btn"
                  onClick={() => this.props.updateOpenCart(isCartOpen)}>check out</button>
            </div>
         </div>
      )
   }
}

CartOverlay.propTypes = {
   orders: PropTypes.arrayOf(PropTypes.object),
   total: PropTypes.number,
   isCartOpen: PropTypes.bool,

   updateOpenCart: PropTypes.func,
};

const mapStateToProps = ({ cartOverlayReducer: { orders, total, isCartOpen } }) => {
   return {
      orders,
      total,
      isCartOpen
   }
};
const mapDispatchToProps = {
   updateOpenCart
};

export default connect(mapStateToProps, mapDispatchToProps)(CartOverlay);