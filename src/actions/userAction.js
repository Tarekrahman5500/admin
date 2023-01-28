import {userConstants} from "./constants.js";
import axios from "../helpers/axios.js";
import {toast} from 'react-toastify'

export const signup = (user, token) => {

    // console.log(user)


    // const {token} = auth
    // console.log(token)
    return async (dispatch) => {
        try {
            dispatch({type: userConstants.USER_REGISTER_REQUEST});
            const res = await axios.post(`/admin/signup`, {
                ...user
            }, {
                headers: {authorization: "Bearer " + token}
            });

            if (res.status === 200) {
                console.log(res.data.message);
                dispatch({
                    type: userConstants.USER_REGISTER_SUCCESS,
                });
            } else if (res.status === 400) {
                console.log(res.data.error)
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {error: res.data.error}
                });
            }

            console.log(res)


        } catch (ex) {

            /*  if (ex && ex.toString) {
                  // print the general exception
                  console.log(ex.toString() + 'here');
              }*/
            if (ex.response && ex.response.data) {
                // print the exception message from axios response
                dispatch({
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: {error: ex.response.data.error}
                });
                console.log(ex.response.data.error);
                toast(ex.response.data.error)
            }
        }
    }
}