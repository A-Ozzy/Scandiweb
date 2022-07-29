import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateDropdown, updateCurrency, updateOpenCart } from '../../actions';

import "./Dropdown.scss";


class Dropdown extends Component {

   handleChangeSelect = (e) => {
      const label = e.target.innerHTML.slice(-3).trim();
      const symbol = e.target.innerHTML.slice(0, -3).trim();

      this.props.updateCurrency({ label, symbol });
      this.props.updateDropdown(false);
   };

   onDropdownClick() {
      if (this.props.isCartOpen) {
         this.props.updateOpenCart(this.props.isCartOpen);
      }
      this.props.updateDropdown(!this.props.dropdownIsOpen);
   }

   render() {

      const { dropdownIsOpen, currencies, selectedCurrency } = this.props;
      const dropdownItem = currencies.map(item => {
         return (
            <div key={item.label}
               className="dropdown-item"
               onClick={(e) => this.handleChangeSelect(e)}>
               {`${item.symbol} ${item.label}`}
            </div>
         );
      });

      return (
         <div className="dropdown">
            <div className="dropdown-btn" onClick={() => this.onDropdownClick()}>{selectedCurrency.symbol}</div>
            <div className="dropdown-content">
               {dropdownIsOpen && dropdownItem}
            </div>
         </div>
      );
   }
}

Dropdown.propTypes = {
   dropdownIsOpen: PropTypes.bool,
   currencies: PropTypes.arrayOf(PropTypes.object).isRequired,
   selectedCurrency: PropTypes.object,
   isCartOpen: PropTypes.bool,

   updateDropdown: PropTypes.func,
   updateCurrency: PropTypes.func,
   updateOpenCart: PropTypes.func,
};

const mapStateToProps = ({
   mainReducer: { dropdownIsOpen, currencies, selectedCurrency },
   cartOverlayReducer: { isCartOpen } }) => {

   return {
      dropdownIsOpen,
      currencies,
      selectedCurrency,
      isCartOpen
   }
};

const mapDispatchToProps = {
   updateDropdown,
   updateCurrency,
   updateOpenCart
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);