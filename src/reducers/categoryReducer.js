import {categoryConstants} from "../actions/constants.js";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

export default (state = initialState, action) => {
    if (action.type === categoryConstants.GET_ALL_CATEGORIES_SUCCESS) {
         state = {
             ...state,
             categories: action.payload.categories
         }
    }
    if (action.type === categoryConstants.ADD_NEW_CATEGORY_REQUEST) {
        state = {
            ...state,
            loading: true,
        }
    }
    if (action.type === categoryConstants.ADD_NEW_CATEGORY_SUCCESS) {
        state = {
            ...state,
            loading: false
        }
    }
    if (action.type === categoryConstants.ADD_NEW_CATEGORY_FAILURE) {
          state = {
              ...initialState
          }
    }
    return state
}