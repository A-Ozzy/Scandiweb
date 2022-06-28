import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import cartOverlayReducer from './cartOverlayReducer';
import productReducer from './productReduser';

const rootReducer = combineReducers({
   mainReducer,
   cartOverlayReducer,
   productReducer
});

export default rootReducer;