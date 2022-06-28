import React, { Component } from 'react';
import { connect } from 'react-redux/';
import './ProductItem.scss';

class ProductItem extends Component {

   render() {
      const { gallery, name, prices, attributes, } = this.props.item;


      let price = 0;
      let swatch = null;

      for (let i = 0; i < attributes.length; i++) {

         if (Object.values(attributes[i]).includes('swatch')) {
            swatch = attributes[i].items.map((v) => {
               return (
                  <li key={v.id} className="item-attribute" >
                     <div data-name={this.props.item.id.toLowerCase()}
                        data-value={v.id.toLowerCase()}
                        data-id={this.props.item.id}
                        style={{ backgroundColor: `${v.value}` }}>
                     </div>
                     {v.id.toLowerCase()}
                  </li>
               );
            });
         }

      }

      for (let i = 0; i < prices.length; i++) {

         const { amount, currency } = prices[i];
         if (currency.label === this.props.selectedCurrency.label) {
            price = amount;
            break;
         }
      }


      return (
         <div className='item-container'>
            <div className="item-img">
               <img src={gallery ? gallery[0] : ""} alt="product" />
            </div>
            <div className="item-name">{name}</div>
            <ul className='attribute-list'>
               {swatch}
            </ul>
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
