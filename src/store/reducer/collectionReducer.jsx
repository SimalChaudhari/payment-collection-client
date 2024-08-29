
const initialState = {
  collectionList: [], // Array to hold user data

};

function collectionReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {

    case 'COLLECTION_LIST':
    return {
      ...state,
      collectionList :action.payload,
    };
  
    default:
      return state;
  }
}

export default collectionReducer;
