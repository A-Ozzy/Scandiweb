import React, { Component } from 'react';
import { connect } from 'react-redux';
import OverlayItem from '../OverlayItem';

import './CartOverlay.scss';

class CartOverlay extends Component {

   render() {
      const { orders, selectedCurrency, total } = this.props;

         const overlayItems = orders.map((item) => {
         
         return (
            <div key={ item.id } className="overlay-item item">
               <OverlayItem item={item} />
            </div>
            
         )

      });
      
      if (orders.length < 1) {

         return (
            <div className='overlay'>
               <div style={{ textAlign: "center" }}>Сart is empty</div>
            </div>
         )
      }

      return (
         <div className='overlay' onClick={e=> e.stopPropagation()}>
            <div className="overlay-title">My Bag: <span>{orders.length} items</span></div>
            <div className="overlay-list">
               {overlayItems}

            </div>
            <div className="overlay-info">
               <div className="overlay-total">Total</div>
               <div className="overlay-price">{`${selectedCurrency.symbol}${total}`}</div>
            </div>
            <div className="overlay-buttons buttons">
               <button className="buttons-view btn" >view bag</button>
               <button className="buttons-check btn">check out</button>
            </div>
         </div>
      )
   }
}

const mapStateToProps = ({ cartOverlayReducer: { orders, total } }) => {
   return {
      orders,
      total
   }
};

export default connect(mapStateToProps)(CartOverlay);