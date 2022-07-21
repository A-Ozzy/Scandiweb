import React, { Component, createRef } from 'react';
import FetchingService from '../../queryService';
import { connect } from 'react-redux';
import { Markup } from 'interweave';
import {
   updateProduct,
   updateActiveImg,
   updateOrders,
   updateAttributeInProduct,
   clearSelectedAttributesInProduct
} from '../../actions';

import './Product.scss';

class Product extends Component {

   constructor() {
      super();
      this.productAttributeRef = createRef();
   }

   fetchData = new FetchingService();

   getProduct(id) {
      const { getData } = this.fetchData;

      const query = `
            query($id: String!){
               product(id: $id){
                  id
                  inStock
                  name
                  gallery
                  description
                  attributes{
                    id
                    name
                    type
                    items{
                      displayValue
                      value
                      id
                    }
                  }
                  prices{
                    currency{
                      label
                      symbol
                    }
                    amount
                  }
                  brand
                }
            }
        `;

      const variables = {
         id,
      };

      getData(query, variables)
         .then((res) => this.props.updateProduct(res.product));
   };

   componentDidMount() {

      const { itemId } = this.props;
      this.getProduct(itemId);

   };

   componentDidUpdate(prevProps) {
      if (this.props.activeImg !== prevProps.activeImg) {
         this.renderGallery();
      }

      if (this.props.itemId !== prevProps.itemId) {
         this.getProduct(this.props.itemId);
      }
   };

   renderGallery() {

      const { gallery, } = this.props.product;

      return gallery?.map((item, i) => {
         if (item === this.props.activeImg) {
            return (
               <li key={i} className="img-list-item active"
                  onClick={(e) => console.log(e.target)}>
                  <img src={item} alt="pic" />
               </li>
            )
         }
         return (
            <li key={i} className="img-list-item"
               onClick={(e) => this.props.updateActiveImg(e.target.src)}>
               <img src={item} alt="pic" />
            </li>
         )
      });
   };

   onAttributeClick = (e) => {
     
      const targetColor = e.target.parentElement.classList.contains("attribute-value");
      const targetAttribute = e.target.classList.value.includes("attribute-value");

      if (targetColor || targetAttribute) {

         const name = e.target.getAttribute('data-name');
         const value = e.target.getAttribute('data-value');
         const id = e.target.getAttribute('data-id');

         const selectedAttributeData = {
            id,
            selectedAttribute: { name, value }
         };

         //list of all attributes in the product 
         const elemRef = [...this.productAttributeRef.current.childNodes];
         // find particular attribute
         const parent = elemRef.find(i => i.classList.value.includes(name));
         // list of values of particular attribute
         const parentList = parent.childNodes[1].childNodes;

         parentList.forEach(el => el.classList.remove('active'));
         e.target.classList.add('active');

         this.props.updateAttributeInProduct(selectedAttributeData);
      }

   }

   findAttributeClasses(itm, v) {

      let classNames = `attribute-value ${itm.name.toLowerCase()}-value ${itm.name.toLowerCase()}`;

      if (Object.keys(this.props.product).includes("selectedAttributes")) {
         const { selectedAttributes } = this.props.product;
         for (const key in selectedAttributes) {
            if (itm.name.toLowerCase() === key && v.id.toLowerCase() === selectedAttributes[key]) {
               classNames = `attribute-value ${itm.name.toLowerCase()}-value ${v.id.toLowerCase()} active`;
               break;
            }
         }
      }
      return classNames;
   };

   renderAttributes(obj) {
      if (!obj || obj.length < 1) {
         return <div className="items-attributes"></div>;
      }

      // render attributes name
      return obj.map((itm, i) => {

         const attributesValue = itm.items.map((v) => {

            const classes = this.findAttributeClasses(itm, v);

            if (itm.name.toLowerCase() === "color") {

               return (
                  <li key={v.id.toLowerCase()}
                     className={classes} >
                     <div data-name={itm.id.toLowerCase()}
                        data-value={v.id.toLowerCase()}
                        data-id={itm.id.toLowerCase()}
                        style={{ backgroundColor: `${v.value}` }}>
                     </div>
                     {v.id.toLowerCase()}
                  </li>
               );
            }
            return (
               <li key={v.id}
                  data-id={itm.id.toLowerCase()}
                  data-name={itm.id.toLowerCase()}
                  data-value={v.id.toLowerCase()}
                  className={classes}>
                  {v.value}
               </li>
            )
         });

         // ===========================================
         return (
            <div key={`${Date.now()}${i}`} className={`attribute ${itm.id.toLowerCase()}`}>
               <div className={`attribute-title ${itm.name.toLowerCase()}`}>{`${itm.name}:`}</div>
               <ul className={`attribute-list ${itm.name.toLowerCase()}-list ${itm.name.toLowerCase()}`}
                  onClick={this.onAttributeClick}>
                  {attributesValue}
               </ul>
            </div>
         );
      });
   };

   onAddToCart = () => {

      const { attributes, selectedAttributes } = this.props.product;
      const isAttrSelected = this.props.product.hasOwnProperty("selectedAttributes");

      if (isAttrSelected && attributes.length === Object.keys(selectedAttributes).length) {
         this.props.updateOrders(this.props);

         this.props.clearSelectedAttributesInProduct();

      } else {
         alert('Please select options');
      }
   };

   render() {

      const { activeImg, selectedCurrency } = this.props;
      const { name, attributes, description, prices, inStock, brand } = this.props.product;

      const imgList = this.renderGallery();
      const attributeItems = this.renderAttributes(attributes);

      let priceInfo;
      for (let i = 0; i < prices?.length; i++) {
         const { currency } = prices[i];
         if (currency.label === selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }

      return (
         <div className={`product-page ${inStock ? "" : "out-of-stosk"}`}>
            <div className="product-img-list product-page-item">
               <ul className="img-list">
                  {imgList}
               </ul>
            </div>
            <div className="product-big-img product-page-item">
               <img src={activeImg} alt="item" />
            </div>
            <div className="product-page-info product-page-item">
               <div className="product-brand">{brand}</div>
               <div className="product-title">{name}</div>
               <div ref={this.productAttributeRef} className="items-attributes attributes">
                  {attributeItems}
               </div>
               <div className="product-price-title">price:</div>
               <div className="product-price">
                  <span>{priceInfo?.currency.symbol}</span>{priceInfo?.amount}
               </div>
               <button className="product-button"
                  onClick={this.onAddToCart}>add to cart</button>
               <div className="product-description">
                  <Markup content={description} />
               </div>
            </div>
         </div>
      );
   }
};

const mapStateToProps = ({
   productReducer: { product, activeImg },
   mainReducer: { selectedCurrency } }) => {
   return {
      product,
      activeImg,
      selectedCurrency
   }
};

const mapDispatchToProps = {
   updateProduct,
   updateActiveImg,
   updateOrders,
   updateAttributeInProduct,
   clearSelectedAttributesInProduct
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);