import React, { Component } from 'react';
import { connect } from 'react-redux/';
import './ProductItem.scss';

class ProductItem extends Component {

   render() {
      const { gallery, name, prices } = this.props.item;


      let price = 0;
      // let symbol = '';

      for (let i = 0; i < prices.length; i++) {

         const { amount, currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            price = amount;
            break;
         }
      }
      // console.log(price);


      return (
         <div className='item-container'>
            <div className="item-img">
               <img src={gallery ? gallery[0] : ""} alt="product" />
            </div>
            <div className="item-name">{name}</div>
            <div className="item-price"><span>{this.props.selectedCurrency.symbol}</span>{price}</div>
         </div>
      );
   }
}

const mapStateToProps = ({ mainReducer: { selectedCurrency } }) => {
   return {
      selectedCurrency,
   }
};

const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem); 
