
const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("userData")) || null,
  otp: ""

};

function authReducer(state = initialState, action) {
  const { type } = action;

  switch (type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case "OTP":
      return {
        ...state,
        otp: action.payload,
      };
    case "LOGOUT":
      return {
        isAuthenticated: false,
        user: null,
      };


    default:
      return state;
  }
}
export default authReducer;
