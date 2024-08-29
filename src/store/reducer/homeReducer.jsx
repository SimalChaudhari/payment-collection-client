
const initialState = {
    total: [], // Array to hold user data
    salesmanTotal: [], // Array to hold user data
    verifyCustomer:[]


  
  };
  
  function homeReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'TOTAL_COUNT':
      return {
        ...state,
        total :action.payload,
      };

      case 'COLLECTION_COUNT':
      return {
        ...state,
        salesmanTotal :action.payload,
      };
      case 'VERIFY_COUNT':
      return {
        ...state,
        verifyCustomer :action.payload,
      };


      default:
        return state;
    }
  }
  
  export default homeReducer;
  