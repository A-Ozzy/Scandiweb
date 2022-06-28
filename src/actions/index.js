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
      type: 'UPDATE_ATTRIBUTE_IN_ITEM',
      payload: data,
   }
};

const updateProduct = (data) => {
   return {
      type: 'UPDATE_PRODUCT',
      payload: data,
   }
};

const updateActiveImg = (item) => {
   return {
      type: 'UPDATE_ACTIVE_IMG',
      payload: item,
   }
};

const updateAttributeInProduct = (newAttr) => {
   return {
      type: 'UPDATE_ATTRIBUTE_IN_PRODUCT',
      payload: newAttr,
   }
};

const updateCurrentSlideImg = (num) => {
   return {
      type: 'UPDATE_CURRENT_SLIDE_IMG',
      payload: num,
   }
};

const updateExtraOptionsVisible = (value) => {
   return {
      type: 'UPDATE_EXTRA_OPTIONS_VISIBLE',
      payload: value,
   }
}

const updateExtraOptionsText = (text) => {
   return {
      type: 'UPDATE_EXTRA_OPTIONS_TEXT',
      payload: text,
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
   updateProduct,
   updateActiveImg,
   updateAttributeInProduct,
   updateCurrentSlideImg,
   updateExtraOptionsVisible,
   updateExtraOptionsText
};


