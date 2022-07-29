import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AttributesList from '../AttributesList';
import Slider from '../Slider/Slider';
import { Link, withRouter } from 'react-router-dom';
import {
   updateCountInCartItem,
   decrementCountInCartItem,
   updateCurrentPrice,
} from '../../actions';

import './OverlayItem.scss';

class OverlayItem extends Component {

   onRenderAttributes(obj, itemKey) {

      if (!obj || obj.length < 1) {
         return <div className="items-atributes"></div>;
      }

      // render attributes
      return obj.map((itm) => {
         
         return (
            <div key={`${Date.now()}${itm.name}`} className="items-atributes">
               <AttributesList itm={itm} itemKey={itemKey} />
            </div>
         );

      });
   };

   updateCountInItem = (newItemKey, action) => (e) => {
      e.stopPropagation();
      const { orders } = this.props;

      const item = orders[orders.findIndex(({ itemKey }) => itemKey === newItemKey)];

      if (action === +1) {
         this.props.updateCountInCartItem(item);
      } else {
         this.props.decrementCountInCartItem(item);
      }
   };

   getCurrentPrice() {
     
      const { item } = this.props;
      const { prices } = this.props.item;

      let priceInfo;

      for (let i = 0; i < prices.length; i++) {
         const { currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }
      this.props.updateCurrentPrice({ ...priceInfo, item });
   };

   componentDidMount() {
      this.getCurrentPrice();
   };

   componentDidUpdate(prevProps) {
      if (this.props.selectedCurrency !== prevProps.selectedCurrency) {
         this.getCurrentPrice();
      }
   };

   render() {
      
      const { id, name, attributes, gallery, prices, count, brand, itemKey } = this.props.item;

      let priceInfo;

      for (let i = 0; i < prices.length; i++) {
         const { currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }

      const renderedAttributes = this.onRenderAttributes(attributes, itemKey);
      
      return (
         <>
            <div className="item-params">
               <div className="item-brand">{ brand }</div>
               <Link to={`/product/${id}`} className="item-name-o">{name}</Link>
               <div className="item-price">
                  <span>{priceInfo.currency.symbol}</span>{priceInfo.amount}
               </div>
               {renderedAttributes}
            </div>
            <div className="item-info">
               <div className="item-info-quantity">
                  <button className="btns btn-inc" onClick={this.updateCountInItem(itemKey, +1)}>+</button>
                  <div className="item-info-count">{count}</div>
                  <button className="btns btn-dec" onClick={this.updateCountInItem(itemKey, -1)}>-</button>
               </div>
               <div className="item-info-img">
                  <Slider gallery={gallery} itemKey={itemKey}/>
               </div>
            </div>
         </>
      );
   }
};

OverlayItem.propTypes = {
   selectedCurrency: PropTypes.object,
   orders: PropTypes.arrayOf(PropTypes.object),
      
   updateCountInCartItem: PropTypes.func,
   decrementCountInCartItem: PropTypes.func,
   updateCurrentPrice: PropTypes.func,
};

const mapStateToProps = ({ mainReducer: { selectedCurrency }, cartOverlayReducer: { orders } }) => {
   return {
      selectedCurrency,
      orders
   }
};

const mapDispatchToProps = {
   updateCountInCartItem,
   decrementCountInCartItem,
   updateCurrentPrice,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverlayItem));