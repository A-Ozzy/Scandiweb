import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateDropdown, updateCurrency } from '../../actions';

import "./Dropdown.scss";


class Dropdown extends Component {

   handleChangeSelect = (e) => {
      const label = e.target.innerHTML.slice(-3).trim();
      const symbol = e.target.innerHTML.slice(0, -3).trim();

      this.props.updateCurrency({label, symbol});
      this.props.updateDropdown(false);
   };

   render() {

      const { dropdomnIsOpen, updateDropdown, currencies, selectedCurrency } = this.props;
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
            <div className="dropdown-btn" onClick={() => updateDropdown(!dropdomnIsOpen)}>{selectedCurrency.symbol}</div>
            <div className="dropdown-content">
               {dropdomnIsOpen && dropdownItem}
            </div>


         </div>
      );
   }
}

const mapStateToProps = ({ mainReducer: { dropdomnIsOpen, currencies, selectedCurrency } }) => {

   return {
      dropdomnIsOpen,
      currencies,
      selectedCurrency
   }
};

const mapDispatchToProps = {
   updateDropdown,
   updateCurrency
};

export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);