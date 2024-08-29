import { createStore, applyMiddleware, combineReducers } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducer/authReducer';
import collectionReducer from './reducer/collectionReducer';
import customerReducer from './reducer/customerReducer';
import salesmanReducer from './reducer/salesmanReducer';
import paymentReducer from './reducer/paymentReducer';
import homeReducer from './reducer/homeReducer';


const rootReducer = combineReducers({
    homeReducer,
    authReducer,
    customerReducer,
    salesmanReducer,
    paymentReducer,
    collectionReducer
})

const middleware = [thunk];

const Store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;