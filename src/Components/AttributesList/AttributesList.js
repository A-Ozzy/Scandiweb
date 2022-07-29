import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateAttributeInItem, updateAttributeInProduct } from '../../actions';


import './AttributesList.scss';


class AttributesList extends Component {

   constructor() {
      super();
      this.attributeRef = createRef();
   }

   onSelectAttribute = (e) => {
      const name = e.target.getAttribute('data-name');
      const value = e.target.getAttribute('data-value');
      const id = e.target.getAttribute('data-id');

      const selectedAttributeData = {
         id,
         selectedAttribute: { name, value }
      };

      this.props.updateAttributeInItem(selectedAttributeData);
   };

   findClasses(itm, v, newItemKey) {


      const productItem = this.props.orders.find(({ itemKey }) => itemKey === newItemKey);

      let classNames = `attribute-value ${itm.name.toLowerCase()}-value ${itm.name.toLowerCase()}`;

      if (productItem?.selectedAttributes) {
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

   onRenderAttributes(itm, itemId, itemKey) {

      return itm.items.map((v) => {

         const classes = this.findClasses(itm, v, itemKey);

         if (itm.name.toLowerCase() === "color") {
            return (
               <li key={v.id}
                  className={classes} >
                  <div data-name={itm.id.toLowerCase()}
                     data-value={v.id.toLowerCase()}
                     data-id={itemKey}
                     style={{ backgroundColor: `${v.value}` }}>
                  </div>
                  {v.id.toLowerCase()}
               </li>
            );
         }
         return (
            <li key={v.id}
               data-id={itemKey}
               data-name={itm.id.toLowerCase()}
               data-value={v.id.toLowerCase()}
               className={classes}>
               {v.value}
            </li>
         )
      });
   };

   render() {
      const { itm, itemId, itemKey } = this.props;

      const itmValue = this.onRenderAttributes(itm, itemId, itemKey);

      return (
         <div className="items-attributes attributes">
            <div className="attribute">
               <div className={`attribute-title ${itm.name.toLowerCase()}`}>{`${itm.name}:`}</div>
               <ul ref={this.attributeRef} className={`attribute-list ${itm.name}-list ${itm.name}`}
                  onClick={this.onSelectAttribute}>
                  {itmValue}
               </ul>
            </div>
         </div>
      );
   }
};

AttributesList.ppropTypes = {
   orders: PropTypes.arrayOf(PropTypes.object),
   product: PropTypes.object,
   updateAttributeInItem: PropTypes.func,
   updateAttributeInProduct: PropTypes.func,
};

const mapStateToProps = ({
   cartOverlayReducer: { orders },
   productReducer: { product } }) => {
   return {
      orders,
      product
   }
};

const mapDispatchToProps = {
   updateAttributeInItem,
   updateAttributeInProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AttributesList);