import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAttributeInItem, updateAttributeInProduct } from '../../actions';


import './AttributesList.scss';


class AttributesList extends Component {

   onSelectAttribute = (e) => {

      const name = e.target.getAttribute('data-name');
      const value = e.target.getAttribute('data-value');
      const id = e.target.getAttribute('data-id');

      const selectedAttributeData = {
         id,
         selectedAttribute: { name, value }
      }

      if (e.target.closest('.product-page-item') && this.props.orders.length < 1) {

         const parent = document.querySelectorAll("[data-name]");
         parent.forEach(el => el.classList.remove('active'));
         e.target.classList.add('active');

         this.props.updateAttributeInProduct(selectedAttributeData);
      } else {
         this.props.updateAttributeInItem(selectedAttributeData);

      }



   };

   findClasses(itm, v, productId) {


      const productItem = this.props.orders.find(({ id }) => id === productId);

      let classNames = `attribute-value ${itm.name.toLowerCase()}-value ${itm.name.toLowerCase()}`;

      // classes in product page
      if (!productItem) {

         const { selectedAttributes } = this.props.product;
         if (selectedAttributes) {
            for (const key in selectedAttributes) {
               if (itm.name.toLowerCase() === key && v.id.toLowerCase() === selectedAttributes[key]) {
                  classNames = `attribute-value ${itm.name.toLowerCase()}-value ${v.id.toLowerCase()} active`;
                  break;
               }
            }
         }

      }

      // classes in cart page & overlay-cart
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

   onRenderAttributes(itm, itemId) {

      return itm.items.map((v) => {

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
               {v.value}
            </li>
         )
      });
   };

   render() {
      const { itm, itemId } = this.props;

      const itmValue = this.onRenderAttributes(itm, itemId);

      return (
         <div className="items-atributes attributes">
            <div className="attribute">
               <div className={`attribute-title ${itm.name.toLowerCase()}`}>{`${itm.name}:`}</div>
               <ul className={`attribute-list ${itm.name}-list ${itm.name}`}
                  onClick={this.onSelectAttribute}>
                  {itmValue}
               </ul>
            </div>
         </div>
      );
   }
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