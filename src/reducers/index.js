import { combineReducers } from 'redux';
import mainReducer from './mainReducer';
import cartOverlayReducer from './cartOverlayReducer';

const rootReducer = combineReducers({
   mainReducer,
   cartOverlayReducer
});

export default rootReducer;