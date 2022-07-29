
// default state
const initialState = {
   orders: [],
   isCartOpen: false,
   total: 0,

};


const handlingItem = (state, product) => {

   if (!product.hasOwnProperty("selectedAttributes")) {
      let attributesObj;

      for (let i = 0; i < product.attributes.length; i++) {

         attributesObj = {
            ...attributesObj,
            [product.attributes[i].id.toLowerCase()]: product.attributes[i].items[0].id.toLowerCase()
         }
      }
      product = {
         ...product,
         selectedAttributes: attributesObj,
      }
   }


   const ordersArray = state.orders.filter(({ id }) => id === product.id);

   let itemIndex = -1;
   let item = state.orders[itemIndex];

   if (ordersArray.length > 0) {

      for (let i = 0; i < ordersArray.length; i++) {
         let isIqual;
         if (product.hasOwnProperty("selectedAttributes")) {

            for (const key in product.selectedAttributes) {

               if (Object.keys(ordersArray[i].selectedAttributes).includes(key)) {
                  if (ordersArray[i].selectedAttributes[key] === product.selectedAttributes[key]) {
                     isIqual = true;
                  } else {
                     isIqual = false;
                     break;
                  }
               }

            }
         }

         if (isIqual) {

            const hendeledKey = ordersArray[i].itemKey;
            itemIndex = state.orders.findIndex(({ itemKey }) => itemKey === hendeledKey);
            item = state.orders[itemIndex];
         }
         if (isIqual === undefined && ordersArray.length === 1) {
            const hendeledKey = ordersArray[0].itemKey;
            itemIndex = state.orders.findIndex(({ itemKey }) => itemKey === hendeledKey);
            item = state.orders[itemIndex];
         }

      }

   }

   return { item, itemIndex };

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
      // console.log('new item');

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
         ...item,
         currentPriceInfo: newPrice,
         totalProductPrice: (item.count + quantity) * newPrice.amount,
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

      let attributesObj;

      if (product.hasOwnProperty("selectedAttributes")) {
         attributesObj = product.selectedAttributes;
      }
      if (product.attributes.length > 0 && !product.hasOwnProperty("selectedAttributes")) {
         for (let i = 0; i < product.attributes.length; i++) {

            attributesObj = {
               ...attributesObj,
               [product.attributes[i].id.toLowerCase()]: product.attributes[i].items[0].id.toLowerCase()
            }
         }
      }

      return {
         ...product,
         itemKey: product.id + Date.now(),
         count: quantity,
         currentSlideImg: 0,
         selectedAttributes: attributesObj
      }
   }

};

const updateOrders = (state, product = {}, quantity, newPrice, newAttributes) => {

   // if item exist -> find index
   let itemIndex = state.orders.findIndex(({ id }) => id === product.id);

   // get item of that index
   let item = state.orders[itemIndex];

   let newItem;

   if (newAttributes) {

      itemIndex = state.orders.findIndex(({ itemKey }) => itemKey === product);
      item = state.orders[itemIndex];

      newItem = updateSelectedAttributes(item, newAttributes);
   }
   if (newPrice) {

      itemIndex = state.orders.findIndex(({ itemKey }) => itemKey === product.itemKey);
      const itemOfOrder = state.orders[itemIndex];

      newItem = updateCartItem(product, itemOfOrder, 0, newPrice);
   }
   if (product && !newAttributes && !newPrice) {

      const handledData = handlingItem(state, product);
      itemIndex = handledData.itemIndex;
      newItem = updateCartItem(product, handledData.item, quantity);

   }

   // get updated state
   const updatedState = updateOrdersItem(state, newItem, itemIndex);

   // get total price
   const calcTotal = updatedState.orders.reduce((acc, curr) => {
      return acc + curr.totalProductPrice;
   }, 0);


   return {
      ...updatedState,
      total: Number(calcTotal.toFixed(2)),
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

   const item = state.orders.find(({ itemKey }) => itemKey === data.itemKey);
   const itemIndex = state.orders.findIndex(({ itemKey }) => itemKey === data.itemKey);

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
         const { amount, currency, item } = action.payload;
         return updateOrders(state, item, 0, { ...currency, amount });

      case 'UPDATE_ATTRIBUTE_IN_ITEM':
         const { selectedAttribute } = action.payload;
         return updateOrders(state, action.payload.id, 0, null, selectedAttribute);

      default:
         return state;
   }
};

export default cartOverlayReducer;