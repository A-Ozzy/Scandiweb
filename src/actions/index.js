const getCategoriesAndCurrency = (newCategryAndCurrency) => {
   return {
      type: 'GET_CATEGORIES_&_CURRENCY',
      payload: newCategryAndCurrency,
   };
};

const changeCurrency = (value) => {
   return {
      type: 'CHANGE_CURRENCY',
      payload: value,
   }
};





export {
   getCategoriesAndCurrency,
   changeCurrency
};


