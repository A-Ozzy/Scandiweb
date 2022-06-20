import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
   updateCountInCartItem,
   decrementCountInCartItem,
   updateCurrentPrice,
   updateAttributeInItem,
} from '../../actions';

import './OverlayItem.scss';

class OverlayItem extends Component {

   onSelectAttribute = (e) => {

      const name = e.target.getAttribute('data-name');
      const value = e.target.getAttribute('data-value');
      const id = e.target.getAttribute('data-id');

      const selectedAttributeData = {
         id,
         selectedAttribute: { name, value }
      }

      this.props.updateAttributeInItem(selectedAttributeData);
   };

   // Jesus Christ find class names for attributes value :)  (active / not active)
   findClasses(itm, v, productId) {

      const productItem = this.props.orders.find(({ id }) => id === productId);

      let classNames = `attribute-value ${itm.name.toLowerCase()}-value ${itm.name.toLowerCase()}`;
      
      if (productItem.selectedAttributes) {
         const attributes = productItem.selectedAttributes;
         for (const key in attributes) {
            if (itm.name.toLowerCase() === key && v.id.toLowerCase() === attributes[key]) {
               classNames = `attribute-value ${itm.name.toLowerCase()}-value ${v.id.toLowerCase()} active`;
               break;
            }
         }
      }

      return classNames;
   };

   onRenderAttributes(obj, itemId) {

      if (!obj || obj.length < 1) {
         return <div className="items-atributes"></div>;
      }

      // render attributes
      return obj.map((itm, i) => {

         //render values of each attribute
         const itmValue = itm.items.map((v) => {

            const classes = this.findClasses(itm, v, itemId);

            if (itm.name.toLowerCase() === "color") {
               return (
                  <li key={v.id}
                     className={classes} >
                     <div data-name={itm.id.toLowerCase()}
                        data-value={v.id.toLowerCase()}
                        data-id={itemId}
                        style={{ backgroundColor: `${v.value}` }}>
                     </div>
                     {v.id.toLowerCase()}
                  </li>
               );
            }
            return (
               <li key={v.id}
                  data-id={itemId}
                  data-name={itm.id.toLowerCase()}
                  data-value={v.id.toLowerCase()}
                  className={classes}>
                  {v.id.toLowerCase()}
               </li>
            )
         });

         return (
            <div key={`${Date.now()}${i}`} className="items-atributes attributes">
               <div className="attribute">
                  <div className={`attribute-title ${itm.name.toLowerCase()}`}>{`${itm.name}:`}</div>
                  <ul className={`attribute-list ${itm.name}-list ${itm.name}`}
                     onClick={this.onSelectAttribute}>
                     {itmValue}
                  </ul>
               </div>
            </div>
         )

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

      return (
         <>
            <div className="item-params">
               <div className="item-name-o">{name}</div>
               <div className="item-price"><span>{priceInfo.currency.symbol}</span>{priceInfo.amount}
               </div>
               {renderedAttributes}
            </div>
            <div className="item-info">
               <div className="item-info-quantity">
                  <button className="btns btn-inc" onClick={this.updateCountInItem(id, +1)}>+</button>
                  <div className="item-info-count">{count}</div>
                  <button className="btns btn-dec" onClick={this.updateCountInItem(id, -1)}>-</button>
               </div>
               <div className="item-info-img">
                  <img src={gallery[0]} alt="img" />
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
   updateAttributeInItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(OverlayItem);