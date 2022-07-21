import React, { Component } from 'react';
// import {  } from '../../actions';
import FetchingService from '../../queryService';
import { updateOrders, fetchProductList } from '../../actions';
import { connect } from 'react-redux';
import ProductItem from '../ProductItem';
import cartWhite from '../../images/shoppingCart-white.svg';
import { Link, withRouter } from 'react-router-dom';

import './ProductList.scss';


class ProductList extends Component {

   fetchData = new FetchingService();

   componentDidMount() {
      if (this.props.category !== this.props.selectedCategory) {
         this.fetchProductData();
      }
      
   };

   componentDidUpdate(prevProps) {
      if (this.props.category !== prevProps.category) {
         this.fetchProductData();
      }
   };

   fetchProductData() {
      const { getData } = this.fetchData;

      const query = `
            query($category: String!){
               category(input:{title: $category}){
                  products {
                     id
                     name
                     inStock
                     gallery
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
                     prices {
                       amount
                       currency {
                         label
                         symbol
                       }
                     }
                   }
                }
            }
        `;

      const variables = {
         category: this.props.category,
      };

      getData(query, variables)
         .then((res) => this.props.fetchProductList(res.category.products));
   };

   onAddToCart = (e) => {
      e.stopPropagation();
      const id = e.target.closest('.product-item').id;

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
         id
      };

      getData(query, variables)
         .then((res) => this.props.updateOrders(res));
   }

   render() {
      
      const { productList } = this.props;

      const productItem = productList.map((item) => {
         return (
            <li key={item.id} className={`product-item ${!item.inStock ? "out-of-stock" : ""}`} id={item.id}>
               <Link to={`/product/${item.id}`} className="product-link">
                  <ProductItem item={item} />
               </Link>
               <div className="product-item-cart"
                  onClick={this.onAddToCart}>
                  <img src={cartWhite} alt="cart" />
               </div>
            </li>
         );
      });

      return (
         <div className="list-container">
            <div className="list-title">Category: {this.props.category.toUpperCase()}</div>
            <div className="product-item-container">
               <ul className="product-item-list">
                  {productItem}
               </ul>
            </div>
         </div>
      );
   }
};


const mapStateToProps = ({ mainReducer: { selectedCategory, productList, selectedCurrency } }) => {
   return {
      selectedCategory,
      productList,
      selectedCurrency,
   }
};

const mapDispatchToProps = {
   fetchProductList,
   updateOrders,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));