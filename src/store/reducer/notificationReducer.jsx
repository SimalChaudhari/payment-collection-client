
const initialState = {
    notification: [], // Array to hold user data  
  };
  
  function notificationReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'NOTIFICATION':
      return {
        ...state,
        notification :action.payload,
      };
  
      default:
        return state;
    }
  }
  
  export default notificationReducer;
  