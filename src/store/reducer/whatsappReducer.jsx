
const initialState = {
    setting: [], // Array to hold user data
  
  };
  
  function whatsappReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {
  
      case 'WHATSAPP':
      return {
        ...state,
        setting :action.payload,
      };

      default:
        return state;
    }
  }
  
  export default whatsappReducer;
  