import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateLoadingProductList } from '../../actions';
import FetchingService from '../../queryService';
import { updateOrders, fetchProductList, updateHasErrorProductList } from '../../actions';
import { connect } from 'react-redux';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator/error-indicator';
import ProductItem from '../ProductItem';
import cartWhite from '../../images/shoppingCart-white.svg';
import { Link, withRouter } from 'react-router-dom';

import './ProductList.scss';


class ProductList extends Component {

   fetchData = new FetchingService();

   componentDidMount() {
      // console.log('fetch');

      // if (this.props.category !== this.props.selectedCategory) {
      //    this.fetchProductData();
      // }
      this.fetchProductData();
   };

   componentDidUpdate(prevProps) {

      if (this.props.category !== prevProps.category) {
         this.fetchProductData();
      }
   };

   fetchProductData() {
      this.props.updateLoadingProductList(true);
      this.props.updateHasErrorProductList(false);
      const { getData } = this.fetchData;

      const query = `
            query($category: String!){
               category(input:{title: $category}){
                  products {
                     id
                     brand
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
         .then((res) => {
            this.props.fetchProductList(res.category.products);
            this.props.updateLoadingProductList(false);
         })
         .catch(_ => {
            this.props.updateLoadingProductList(false);
            this.props.updateHasErrorProductList(true);
         });
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

      const { productList, isLoadingProductList, category } = this.props;

      const productItem = isLoadingProductList ? <Spinner /> : productList.map((item) => {
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

      if (this.props.hasError) {
         return <ErrorIndicator />
      }
      return (
         <div className="list-container">
            <div className="list-title">{`${category[0].toUpperCase()}${category.slice(1)}`}</div>
            <div className="product-item-container">
               <ul className="product-item-list">
                  {productItem}
               </ul>
            </div>
         </div>
      );
   }
};

ProductList.propTypes = {
   selectedCategory: PropTypes.string,
   productList: PropTypes.arrayOf(PropTypes.object),
   selectedCurrency: PropTypes.object,
   isLoadingProductList: PropTypes.bool,
   hasError: PropTypes.bool,

   fetchProductList: PropTypes.func,
   updateOrders: PropTypes.func,
   updateLoadingProductList: PropTypes.func,
   updateHasErrorProductList: PropTypes.func,
};

const mapStateToProps = ({ mainReducer: { selectedCategory, productList, selectedCurrency, isLoadingProductList, hasError } }) => {
   return {
      selectedCategory,
      productList,
      selectedCurrency,
      isLoadingProductList,
      hasError,
   }
};

const mapDispatchToProps = {
   fetchProductList,
   updateOrders,
   updateLoadingProductList,
   updateHasErrorProductList,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductList));