
const initialState = {
    salesman: [], // Array to hold user data
   };
  
  function salesmanReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'SALESMAN_LIST':
      return {
        ...state,
        salesman :action.payload,
      };

      default:
        return state;
    }
  }
  
  export default salesmanReducer;
  