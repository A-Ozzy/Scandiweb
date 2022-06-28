import React, { Component } from 'react';
import { updateExtraOptionsVisible, updateExtraOptionsText } from '../../actions';
import { connect } from 'react-redux';

import './ExtraOptions.scss';


class ExtraOptions extends Component {

   onAddExtraOptions = (e) => {
      e.stopPropagation();
      const { id, } = this.props.item;
      const text = e.target.value;
      // console.log({ id, text });

      this.props.updateExtraOptionsText({ id, text });
   };

   onExtraLabelClick() {
      const { id, extraOptions } = this.props.item;
      const val =  !extraOptions.visible;
            
      this.props.updateExtraOptionsVisible({ id, val });
   };
  
   render() {

      const { extraOptions } = this.props.item;
      const display = extraOptions.visible ? 'block' : 'none';

      return (
         <div className="item-info-count-extra">
            <label htmlFor="extra-options"
               className="item-info-count-extra-label"
               onClick={()=> this.onExtraLabelClick()}
            >Extra options <span>+</span> 
            </label>
            <textarea className="item-info-count-extra-textarea"
               style={{display: `${display}`}}
               id="extra-options"
               name="extra-options"
               rows="3" cols="25"
               defaultValue={extraOptions.text}
               placeholder="add extra options"
               onInput={ this.onAddExtraOptions } />
         </div>
      );
   }
};

const mapStateToProps = ({ cartOverlayReducer: { orders } } ) => {
   return {
      orders
   }
};

const mapDispatchToProps = {
   updateExtraOptionsVisible,
   updateExtraOptionsText
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraOptions);