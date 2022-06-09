import React, { Component } from 'react';
import { fetchProductList } from '../../actions';
import FetchingService from '../../queryService';
import { connect } from 'react-redux';
import ProductItem from '../ProductItem';
import './ProductList.scss';

class ProductList extends Component {

   fetchData = new FetchingService();

   componentDidMount() {
      const { getData } = this.fetchData;

      const query = `
            query($category: String!){
               category(input:{title: $category}){
                  products{
                     id
                     name
                     inStock
                     gallery
                     prices{
                        amount
                        currency{
                          label
                          symbol
                        }
                      }
                  }
                }
            }
        `;

      const variables = {
         category: this.props.selectedCategory,
      };

      getData(query, variables)
         .then((res) => this.props.fetchProductList(res.category.products));
   };


   render() {
      const { productList } = this.props;

      const productItem = productList.map((item) => {

         let classes = "product-item";

         if (!item.inStock) {
            classes += " out-of-stock";
         }
         
         return (
            <li key={item.id} className={classes}>
               <a href="#" className="priduct-link">
                  <ProductItem item={item} />
               </a>
            </li>   
         );
      });

      return (
         <div className="list-container">
            <div className="list-title">Category: {this.props.selectedCategory.toUpperCase()}</div>
            <div className="product-item-container">
               <ul className="product-item-list">
                  {productItem}
               </ul>
            </div>
         </div>
      );
   }
};


const mapStateToProps = ({ selectedCategory, productList }) => {
   return {
      selectedCategory,
      productList,
   }
};

const mapDispatchToProps = {
   fetchProductList
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);