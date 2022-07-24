
const initialState = {
   categories: [],
   loading: true,
   isLoadingProductList: true,
   currencies: [],
   selectedCurrency: [],
   selectedCategory: '',
   productList: [],
   dropdomnIsOpen: false,
   hasError: false,
}


const mainReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'FETCH_CATEGORIES_AND_CURRENCIES_REQUEST':
         return {
            ...state,
            categories: action.payload.categories,
            currencies: action.payload.currencies,
            selectedCurrency: action.payload.currencies[0],
            selectedCategory: action.payload.categories[0].name,
            loading: false,
         }
      case 'UPDATE_CURRENCY':
         return {
            ...state,
            selectedCurrency: action.payload
         }
      case 'UPDATE_DROPDOWN':
         return {
            ...state,
            dropdomnIsOpen: action.payload
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
      case 'UPDATE_LOADING_PRODUCT_LIST':
         return {
            ...state,
            isLoadingProductList: action.payload
         }
      case 'UPDATE_HAS_ERROR':
         return {
            ...state,
            hasError: action.payload
         }
      
      default:
         return state;
   }
}

export default mainReducer;