import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentSlideImg } from '../../actions';

import './Slider.scss';

class Arrows extends Component {
   render() {

      const { onButtonNavigate } = this.props;

      return (
         <>
            <div className="slider-navigation" onClick={onButtonNavigate}>
               <div className="navigation-btn slider-prev">&lt;</div>
               <div className="navigation-btn slider-next">&gt;</div>
            </div>
         </>
      );
   }
};

class Slider extends Component {

   onButtonNavigate = (e) => {
      const { updateCurrentSlideImg, gallery, orders, itemKey } = this.props;
      const item = orders.find(({ itemKey }) => itemKey === this.props.itemKey);
      const { currentSlideImg } = item;

      let count;

      if (e.target.classList.contains("slider-next") && currentSlideImg < gallery.length - 1) {
         count = currentSlideImg + 1;
         updateCurrentSlideImg({ count, itemKey });
      }
      if (e.target.classList.contains("slider-prev") && currentSlideImg > 0) {
         count = currentSlideImg - 1;
         updateCurrentSlideImg({ count, itemKey });
      }
   };

   render() {

      const { gallery, orders } = this.props;
      const item = orders.find(({ itemKey }) => itemKey === this.props.itemKey);

      return (
         <div className='slider'>
            <img src={gallery[item.currentSlideImg]} alt="img" />
            {gallery.length > 1 ? <Arrows onButtonNavigate={ this.onButtonNavigate} /> : null}
         </div>
      );
   }
};

const mapStateToProps = ({ cartOverlayReducer: { orders } }) => {
   return {
      orders,
   }
};
const mapDispatchToProps = {
   updateCurrentSlideImg
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);