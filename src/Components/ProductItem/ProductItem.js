import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProductItem.scss';

class ProductItem extends Component {

   render() {
      const { gallery, name, prices } = this.props.item;
      
      let price = 0;
      let symbol = '';

      for (let i = 0; i < prices.length; i++) {

         const { amount, currency } = prices[i];

         if (currency.label === this.props.selectedCurrency) {
            price = amount;
            symbol = currency.symbol;
            break;
            
         }
      }


      return (
         <div className='item-container'>
            <div className="item-img">
               <img src={gallery? gallery[0] : ""} alt="product image" />
            </div>
            <div className="item-name">{name}</div>
            <div className="item-price"><span>{symbol}</span>{price}</div>
         </div>
      );
   }
}


const mapStateToProps = ({ selectedCurrency }) => {
   return {
      selectedCurrency,
   }
};

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);