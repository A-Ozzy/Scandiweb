
// default state
const initialState = {
   orders: [],
   isCartOpen: false,
   total: 0,

};

const findItem = (state, newId) => {
   return state.orders.find(({ id }) => id === newId);
};

const findIndex = (state, data) => {
   return state.orders.findIndex(({ id }) => id === data);
};

const updateOrdersItem = (state, item, idx) => {

   if (item.count === 0) {

      return {
         ...state,
         orders: [
            ...state.orders.slice(0, idx),
            ...state.orders.slice(idx + 1)
         ]
      }
   }

   if (idx === -1) {
      return {
         ...state,
         orders: [
            ...state.orders, item,
         ]
      };
   }
   else {
      return {
         ...state,
         orders: [
            ...state.orders.slice(0, idx),
            item,
            ...state.orders.slice(idx + 1),
         ],
      };

   }
};

const updateCartItem = (product, item, quantity, newPrice) => {

   // update currency in order item
   if (item && newPrice) {
      return {
         ...product,
         currentPriceInfo: newPrice,
         totalProductPrice: (item.count + quantity) * newPrice.amount,
         currentSlideImg: 0,
         extraOptions: { text: "", visible: false },
      }
   }

   //update count in order item
   if (item && !newPrice) {
      return {
         ...item,
         count: item.count + quantity,
         totalProductPrice: (item.count + quantity) * item.currentPriceInfo.amount,

      }
   }

   // add new item to orders with initial count=1
   if (!item && !newPrice) {
      return {
         ...product,
         count: quantity
      }
   }

};

const updateOrders = (state, product = {}, quantity, newPrice, attributes) => {


   // if item exist -> find index
   const itemIndex = state.orders.findIndex(({ id }) => id === product.id);

   // get item of that index
   const item = state.orders[itemIndex];


   // const newItem = updateCartItem(product, item, quantity);
   let newItem;
   if (attributes) {
      newItem = updateSelectedAttributes(item, attributes);
   }
   if (newPrice) {
      newItem = updateCartItem(product, item, 0, newPrice);
   }
   if (!attributes && !newPrice) {
      newItem = updateCartItem(product, item, quantity);
   }

   // get updated state
   const updatedState = updateOrdersItem(state, newItem, itemIndex);

   // get total price
   const calcTotal = updatedState.orders.reduce((acc, curr) => {
      return acc + curr.totalProductPrice;
   }, 0);


   return {
      ...updatedState,
      total: calcTotal.toFixed(2),
   };

};

const updateSelectedAttributes = (item, attributes) => {

   const { selectedAttributes } = item;

   if (!selectedAttributes) {
      return {
         ...item,
         selectedAttributes: {
            [attributes.name]: attributes.value
         }
      }
   }
   else {
      const isProperty = Object.keys(selectedAttributes).hasOwnProperty(attributes.name);

      if (isProperty) {
         return {
            ...item,
            selectedAttributes: {
               [attributes.name]: attributes.value
            }
         }
      } else {
         return {
            ...item,
            selectedAttributes: {
               ...item.selectedAttributes,
               [attributes.name]: attributes.value
            }
         }
      }

   }

};

const updateCurrentSlideImage = (state, data) => {

   const { count } = data;

   const item = state.orders.find(({ id }) => id === data.id);
   const itemIndex = state.orders.findIndex(({ id }) => id === data.id);

   const newItem = { ...item, currentSlideImg: count };

   return {
      ...state,
      orders: [
         ...state.orders.slice(0, itemIndex),
         newItem,
         ...state.orders.slice(itemIndex + 1),
      ],
   }
};

const updateExtraOptions = (state, itemId, val, text = "") => {

   const orderItem = findItem(state, itemId);
   const itemIdx = findIndex(state, itemId);

   let newItem;
   if (val) {
      newItem = { ...orderItem, extraOptions: { ...orderItem.extraOptions, visible: val } };
   }
   if (text) {
      newItem = { ...orderItem, extraOptions: { ...orderItem.extraOptions, text } };
   }
   if (!val && !text) {
      newItem = { ...orderItem, extraOptions: { ...orderItem.extraOptions, text: "" } };
   }
   return {
      ...state,
      orders: [
         ...state.orders.slice(0, itemIdx),
         newItem,
         ...state.orders.slice(itemIdx + 1),
      ],
   }
};

// reduser
const cartOverlayReducer = (state = initialState, action) => {

   switch (action.type) {
      case 'UPDATE_ORDERS':
         return updateOrders(state, action.payload.product, 1);

      case 'UPDATE_OPEN_CART':
         return {
            ...state,
            isCartOpen: action.payload
         }
      case 'UPDATE_CURRENT_SLIDE_IMG':
         return updateCurrentSlideImage(state, action.payload);

      case 'UPDATE_COUNT_IN_CART_ITEM':
         return updateOrders(state, action.payload, 1);

      case 'DECREMENT_COUNT_IN_CART_ITEM':
         return updateOrders(state, action.payload, -1);

      case 'UPDATE_CURRENT_PRICE':
         const { amount, currency } = action.payload;
         const item = findItem(state, action.payload.id);
         return updateOrders(state, item, 0, { ...currency, amount });

      case 'UPDATE_ATTRIBUTE_IN_ITEM':
         const { selectedAttribute } = action.payload;
         const productItem = findItem(state, action.payload.id);
         return updateOrders(state, productItem, 0, null, selectedAttribute);

      case 'UPDATE_EXTRA_OPTIONS_VISIBLE':
         const { id, val } = action.payload;
         return updateExtraOptions(state, id, val, undefined);
      
      case 'UPDATE_EXTRA_OPTIONS_TEXT':
         const { text } = action.payload;
         return updateExtraOptions(state, action.payload.id, undefined, text);

      default:
         return state;
   }
};

export default cartOverlayReducer;