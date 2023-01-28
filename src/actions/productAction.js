import axios from "../helpers/axios.js";
import {productConstants} from "./constants.js";


export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConstants.ADD_PRODUCT_REQUEST });
      const res = await axios.post(`/product/create`, form);
      console.log(res)
      if (res.status === 201) {
        dispatch({ type: productConstants.ADD_PRODUCT_SUCCESS });
       // dispatch(getProducts());
      } else {

      }
    } catch (error) {
        //err.response.data.error
       dispatch({ type: productConstants.ADD_PRODUCT_FAILURE });
    }
  };
};