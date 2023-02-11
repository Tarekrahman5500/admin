import {authConstants} from "./constants.js";
import axios from "../helpers/axios.js";

export const login = (user) => {
    //console.log(user)
    return async (dispatch) => {
        try {

            dispatch({type: authConstants.LOGIN_REQUEST})
            const res = await axios.post(`/admin/signin`, {
                ...user
            })
            // if login successfully then save token and the user
            if (res.status === 200) {
                const {token, user} = res.data
                // save the user in localstorage
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: {
                        token,
                        user
                    }
                })
                // if valid to login
            } else if (res.status === 400) {
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: res.data.error
                    }
                })
            }
        } catch (err) {
            if(err.response.data.error) {
                console.log(err.response.data.error)
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: {
                        error: err.response.data.error
                    }
                })
            }
        }
        //

    }
}


// check the user is logged in or not
export const isUserLoggedIn = () => {
    return async dispatch => {
        // check the token is in the local storage or not
        const token = localStorage.getItem('token');
        if (token) {
            // if present then dispatch the user
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            dispatch({
                type: authConstants.LOGIN_FAILURE,
                payload: {error: 'Failed to login'}
            });
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        try {
           // localStorage.clear();
          //  dispatch({type: authConstants.LOGOUT_SUCCESS});

            dispatch({type: authConstants.LOGOUT_REQUEST});
            const res = await axios.post(`/admin/signout`);
           // console.log(res)
            if (res.status === 200) {
                localStorage.clear();
                dispatch({type: authConstants.LOGOUT_SUCCESS});
            } else {
             //  console.log('here')
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: {error: res.data.error}
                });
            }
        } catch (err) {
           // console.log(err + 'hi')
          //  console.log(res)
            if (err.response && err.response.data) {
                // print the exception message from axios response
                dispatch({
                    type: authConstants.LOGOUT_FAILURE,
                    payload: {error: err.response.data.error}
                });
            }


        }
    }
}