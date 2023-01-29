import {productConstants} from "../actions/constants.js";

const initialState = {
    products: []
};
export default (state = initialState, action) => {
    if (action.type === productConstants.GET_ALL_PRODUCTS_SUCCESS) {
        state = {
            ...state,
            products: action.payload.products
        }
    }

    return state;
}