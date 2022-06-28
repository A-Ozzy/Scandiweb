import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCurrentSlideImg } from '../../actions';

import './Slider.scss';

class Slider extends Component {

   onButtonNavigate = (e) => {
      const { updateCurrentSlideImg, gallery, id, orders } = this.props;

      const item = orders.find(({ id }) => id === this.props.id);

      const { currentSlideImg } = item;
      let count;

      if (e.target.classList.contains("slider-next") && currentSlideImg < gallery.length - 1) {
         // console.log(`NEXT текущее ${id}, ${currentSlideImg}`);
         count = currentSlideImg + 1;
         updateCurrentSlideImg({ count, id });
         // updateCurrentSlideImg(currentSlideImg + 1, id);
      }
      if (e.target.classList.contains("slider-prev") && currentSlideImg > 0) {
         // console.log(`PREV текущее ${id}, ${currentSlideImg}`);
         
         count = currentSlideImg - 1;

         updateCurrentSlideImg({ count, id });
         // updateCurrentSlideImg(currentSlideImg - 1, id);
      }
   };

   render() {

      const { gallery, orders} = this.props;
      const item = orders.find(({ id }) => id === this.props.id);
      // console.log(item.currentSlideImg);
// currentSlideImg

      return (
         <div className='slider'>
            <img src={gallery[item.currentSlideImg]} alt="img" />
            <div className="slider-navigation" onClick={this.onButtonNavigate}>
               <div className="navigation-btn slider-prev">&lt;</div>
               <div className="navigation-btn slider-next">&gt;</div>
            </div>
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