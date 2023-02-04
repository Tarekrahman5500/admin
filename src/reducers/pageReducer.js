import {pageConstants} from "../actions/constants.js";


const initialState = {
    error: null,
    loading: false,
    page: {}
}

export default (state = initialState, action) => {

    if (action.type === pageConstants.CREATE_PAGE_REQUEST) {
        state = {
            ...state,
            loading: true
        }
    } else if (action.type === pageConstants.CREATE_PAGE_SUCCESS) {
        state = {
            ...state,
            loading: false
        }
    } else if (action.type === pageConstants.CREATE_PAGE_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error
        }
    }

    return state;
}