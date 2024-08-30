
const initialState = {
    reportSummary: [], // Array to hold user data

  
  };
  
  function reportReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'REPORT_SUMMARY':
      return {
        ...state,
        reportSummary :action.payload,
      };


      default:
        return state;
    }
  }
  
  export default reportReducer;
  