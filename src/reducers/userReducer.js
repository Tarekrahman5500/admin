import {userConstants } from "../actions/constants.js";

const initialState = {
    error: null,
    message: '',
    loading: false
}

export default (state = initialState, action) => {
    if (action.type === userConstants.USER_REGISTER_REQUEST) {
        state = {
            ...state,
            loading: true
        }
    } else if (action.type === userConstants.USER_REGISTER_SUCCESS) {
       state = {
            ...initialState
        }
    } else if (action.type === userConstants.USER_REGISTER_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error
        }
    }

    return state;
}