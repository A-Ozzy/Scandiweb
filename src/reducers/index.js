const initialState = {
   categories: [],
   loading: true,
   currencies: [],
   selectedCurrency: '',
   selectedCategory: '',
   productList: [],
}


const reducer = (state = initialState, action) => {

   switch (action.type) {
      case 'FETCH_CATEGORIES_AND_CURRENCIES_REQUEST':
         return {
            ...state,
            categories: action.payload.categories,
            currencies: action.payload.currencies,
            selectedCurrency: action.payload.currencies[0].label,
            selectedCategory: action.payload.categories[0].name,
            loading: false,
         }
      case 'UPDATE_CURRENCY':
         return {
               ...state,
               selectedCurrency: action.payload
         }
      case 'UPDATE_CATEGORY':
         return {
            ...state,
            selectedCategory: action.payload
         }
      case 'FETCH_PRODUCT_LIST_REQUEST':
         return {
               ...state,
               productList: action.payload
            }
      default:
         return state;
   }
}

export default reducer;