import authReducer from "./authReducer.js";
import {combineReducers} from "redux";
import userReducer from "./userReducer.js";
/*import productReducer from "./productReducer.js";
import orderReducer from "./orderReducer.js";
*/

import categoryReducer from "./categoryReducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    category: categoryReducer,
    /*
    product: productReducer,
    order: orderReducer,*/
})

export default rootReducer