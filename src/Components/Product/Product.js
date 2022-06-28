import React, { Component } from 'react';
import FetchingService from '../../queryService';
import { connect } from 'react-redux';
import { updateProduct, updateActiveImg, updateOrders } from '../../actions';
import AttributesList from '../AttributesList';

import './Product.scss';

class Product extends Component {

   fetchData = new FetchingService();

   getProduct(id) {
      const { getData } = this.fetchData;

      const query = `
            query($id: String!){
               product(id: $id){
                  id
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
      if (this.props.activeImg !== prevProps.activeImg ) {         
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

   renderAttributes(obj, itemId) {
      if (!obj || obj.length < 1) {
         return <div className="items-atributes"></div>;
      }

      // render attributes
      return obj.map((itm, i) => {

         return (
            <div key={`${Date.now()}${i}`} className="items-atributes">
               <AttributesList itm={itm} itemId={itemId} />
            </div>

         );
      });
   };

   onAddToCart = (e) => {
      if (e.target.closest('button')) {
         this.props.updateOrders(this.props)
      }
   };

   render() {
      
      const { activeImg, itemId, selectedCurrency } = this.props;
      const { name, attributes, description, prices } = this.props.product;

      const imgList = this.renderGallery();
      const attributeItem = this.renderAttributes(attributes, itemId);

      let priceInfo;
      for (let i = 0; i < prices?.length; i++) {
         const { currency } = prices[i];
         if (currency.label === selectedCurrency.label) {
            priceInfo = prices[i];
            break;
         }
      }

      return (
         <div className='product-page'>
            <div className="product-img-list product-page-item">
               <ul className="img-list">
                  {imgList}
               </ul>
            </div>
            <div className="product-big-img product-page-item">
               <img src={activeImg} alt="item" />
            </div>
            <div className="product-page-info product-page-item">
               <div className="product-title">{name}</div>
               {attributeItem}
               <div className="product-price-title">price:</div>
               <div className="product-price">
                  <span>{priceInfo?.currency.symbol}</span>{priceInfo?.amount}
               </div>
               <button className="product-button"
                  onClick={this.onAddToCart}>add to cart</button>
               <div className="product-description" dangerouslySetInnerHTML={{ __html: description }}>
               </div>
            </div>

         </div>
      );
   }
};

const mapStateToProps = ({
   productReducer: { product, activeImg },
   mainReducer: { selectedCurrency }} ) => {
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);