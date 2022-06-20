const getCategoriesAndCurrency = (newCategryAndCurrency) => {
   return {
      type: 'FETCH_CATEGORIES_AND_CURRENCIES_REQUEST',
      payload: newCategryAndCurrency,
   };
};

const fetchProductList = (newProductList) => {
   return {
      type: 'FETCH_PRODUCT_LIST_REQUEST',
      payload: newProductList,
   }
};

const updateCurrency = (currencyList) => {

   const label = currencyList.slice(0, 3);
   const symbol = currencyList.slice(3);

   const newList = {
      label,
      symbol,
   }

   return {
      type: 'UPDATE_CURRENCY',
      payload: newList,
   }
};

const updateSelectedCategory = (newCategory) => {
   return {
      type: 'UPDATE_CATEGORY',
      payload: newCategory,
   }
};

const updateOrders = (newProduct) => {
   return {
      type: 'UPDATE_ORDERS',
      payload: newProduct,
   }
};

const updateOpenCart = (value) => {
   return {
      type: 'UPDATE_OPEN_CART',
      payload: !value,
   }
};

const updateCountInCartItem = (item) => {

   return {
      type: 'UPDATE_COUNT_IN_CART_ITEM',
      payload: item,
   }
};

const decrementCountInCartItem = (item) => {
   return {
      type: 'DECREMENT_COUNT_IN_CART_ITEM',
      payload: item,
   }
};

const updateCurrentPrice = (newPrice) => {
   return {
      type: 'UPDATE_CURRENT_PRICE',
      payload: newPrice,
   }
};

const updateAttributeInItem = (data) => {
   return {
      type: 'UPDATR_ATTRIBUTE_IN_ITEM',
      payload: data,
   }
};


export {
   getCategoriesAndCurrency,
   updateCurrency,
   fetchProductList,
   updateSelectedCategory,
   updateOrders,
   updateOpenCart,
   updateCountInCartItem,
   decrementCountInCartItem,
   updateCurrentPrice,
   updateAttributeInItem,
};


