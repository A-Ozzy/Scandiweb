const initialState = {
   product: {},
   activeImg: "",
   isLoadingProduct: true,
   hasError: false,
   
};

const updateAttributeInProduct = (state, data) => {
   
   const { selectedAttribute } = data;
   
   if (state.product.selectedAttributes) {
      
      const isProperty = Object.keys(state.product.selectedAttributes).hasOwnProperty(selectedAttribute.name);

      if (isProperty) {
         return {
            ...state,
            product: {
               ...state.product,
               selectedAttributes: {
                  [selectedAttribute.name]: selectedAttribute.value
               }
            }
            
         }
      } else {
         return {
            ...state,
            product: {
               ...state.product,
               selectedAttributes: {
                  ...state.product.selectedAttributes,
                  [selectedAttribute.name]: selectedAttribute.value
               }
            }
            
         }
      }
      
   }
   return {
      ...state,
      product: {
         ...state.product,
         selectedAttributes: {
            [selectedAttribute.name]: selectedAttribute.value
         }
      }
      
   }
};

const clearAttributes = (state) => {
   const newItem = {
      ...state.product,
      selectedAttributes: {},
}
   return {
      ...state,
      product: newItem,
      
   }
};

const productReducer = (state = initialState, action) => {

   switch (action.type) {

      case 'UPDATE_PRODUCT':
         return { 
            ...state,
            product: { ...action.payload },
            activeImg: action.payload.gallery[0],
         }
      case 'UPDATE_ACTIVE_IMG':
         return { 
            ...state,
            activeImg: action.payload,
         }
      case 'UPDATE_ATTRIBUTE_IN_PRODUCT':
         return updateAttributeInProduct(state, action.payload);
      
      case 'CLEAR_SELECTED_ATTRIBUTES_IN_PRODUCT':
         return clearAttributes(state);
      
      case 'UPDATE_LOADING_PRODUCT':
         return {
            ...state,
            isLoadingProduct: action.payload,
         }
      case 'UPDATE_HAS_ERROR_PRODUCT':
         return {
            ...state,
            hasError: action.payload,
         }
      
      default:
         return state;
   }
}

export default productReducer;