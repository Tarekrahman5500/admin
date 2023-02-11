import {categoryConstants, initialDataConstants, orderConstants, productConstants} from "./constants.js";
import axios from "../helpers/axios.js";


export const getInitialData = () => {
    return async dispatch => {
        const res = await axios.post(`/initialdata`);
       // console.log(res)
        try {
            if (res.status === 200) {
            const {categories, products, orders} = res.data;
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                payload: {categories},
            });
            dispatch({
                type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
                payload: {products},
            });
            dispatch({
                type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
                payload: {orders},
            });
        }
        } catch (err) {
            console.log(err.response.data.error)
        }
    }
}