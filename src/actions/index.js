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
   return {
      type: 'UPDATE_CURRENCY',
      payload: currencyList,
   }
};

const updateSelectedCategory = (newCategory) => {
   return {
      type: 'UPDATE_CATEGORY',
      payload: newCategory,
   }
}



export {
   getCategoriesAndCurrency,
   updateCurrency,
   fetchProductList,
   updateSelectedCategory,
};


