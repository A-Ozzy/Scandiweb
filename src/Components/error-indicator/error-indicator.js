import React, { Component } from "react";
import './error-indicator.scss';


class ErrorIndicator extends Component {
   render() {

      return (
         <div className="error">
            <div className="error-message">Oops, something went wrong</div>
         </div>

      );
   };
};

export default ErrorIndicator;