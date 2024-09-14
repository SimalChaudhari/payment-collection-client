
const initialState = {
    address: [], // Array to hold user data
};

function addressReducer(state = initialState, action) {
    const { type } = action;
    switch (type) {

        case 'ADDRESS_LIST':
            return {
                ...state,
                address: action.payload,
            };

        default:
            return state;
    }
}

export default addressReducer;
