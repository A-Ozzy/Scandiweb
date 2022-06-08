const initialState = {
   categories: [],
   loading: true,
   currencies: [],
   selectedCurrency: '',
   selectedCategory: '',
}


const reducer = (state = initialState, action) => {

   switch (action.type) {
      case 'GET_CATEGORIES_&_CURRENCY':
         return {
            categories: action.payload.categories,
            currencies: action.payload.currencies,
            selectedCurrency: action.payload.currencies[0].label,
            selectedCategory: action.payload.categories[0],
            loading: false,
         }
      case 'CHANGE_CURRENCY':
         return {
               ...state,
               selectedCurrency: action.payload
            }
      default:
         return state;
   }
}

export default reducer;