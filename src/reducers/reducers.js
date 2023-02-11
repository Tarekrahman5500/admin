import authReducer from "./authReducer.js";
import {combineReducers} from "redux";
import userReducer from "./userReducer.js";
import productReducer from "./productReducer.js";
import pageReducer from "./pageReducer.js";
import categoryReducer from "./categoryReducer.js";
import orderReducer from "./orderReducer.js";



const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    product: productReducer,
    page: pageReducer,
    order: orderReducer,
})

export default rootReducer