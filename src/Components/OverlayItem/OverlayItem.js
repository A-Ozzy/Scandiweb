import React, { Component } from 'react';
import { connect } from 'react-redux';
import AttributesList from '../AttributesList';
import Slider from '../Slider/Slider';
import ExtraOptions from '../ExtraOptions/ExtraOptions';
import { Link, withRouter } from 'react-router-dom';
import {
   updateCountInCartItem,
   decrementCountInCartItem,
   updateCurrentPrice,
} from '../../actions';

import './OverlayItem.scss';

class OverlayItem extends Component {

   onRenderAttributes(obj, itemId) {

      if (!obj || obj.length < 1) {
         return <div className="items-atributes"></div>;
      }

      // render attributes
      return obj.map((itm, i) => {

         return (
            <div key={`${Date.now()}${itm.name}`} className="items-atributes">
               <AttributesList itm={itm} itemId={itemId} />
            </div>
         );

      });
   };

   updateCountInItem = (itemid, action) => (e) => {
      e.stopPropagation();
      const { orders } = this.props;

      const item = orders[orders.findIndex(({ id }) => id === itemid)];

      if (action === +1) {
         this.props.updateCountInCartItem(item);
      } else {
         this.props.decrementCountInCartItem(item);
      }
   };

   getCurrentPrice() {
      const { prices, id } = this.props.item;

      let priceInfo;

      for (let i = 0; i < prices.length; i++) {
         const { currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }
      this.props.updateCurrentPrice({ ...priceInfo, id });
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

      const { id, name, attributes, gallery, prices, count } = this.props.item;

      let priceInfo;

      for (let i = 0; i < prices.length; i++) {
         const { currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }

      const renderedAttributes = this.onRenderAttributes(attributes, id);
      const extraOptions = count > 1 ? <ExtraOptions item={ this.props.item } /> : null      
      return (
         <>
            <div className="item-params">
               <Link to={`/product/${id}`} className="item-name-o">{name}</Link>
               <div className="item-price">
                  <span>{priceInfo.currency.symbol}</span>{priceInfo.amount}
               </div>
               {renderedAttributes}
               {extraOptions}
            </div>
            <div className="item-info">
               <div className="item-info-quantity">
                  <button className="btns btn-inc" onClick={this.updateCountInItem(id, +1)}>+</button>
                  <div className="item-info-count">{count}</div>
                  <button className="btns btn-dec" onClick={this.updateCountInItem(id, -1)}>-</button>
               </div>
               <div className="item-info-img">
                  <Slider gallery={gallery} id={id}/>
               </div>
            </div>
         </>
      );
   }
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