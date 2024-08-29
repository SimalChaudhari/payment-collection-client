
const initialState = {
    customer: [], // Array to hold user data
    customerIdData:[]
  
  };
  
  function customerReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'CUSTOMER_LIST':
      return {
        ...state,
        customer :action.payload,
      };

      default:
        return state;
    }
  }
  
  export default customerReducer;
  