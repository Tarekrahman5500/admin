import {authConstants} from "../actions/constants.js";

const initialState = {
    token: null,
    user: {
        firstName: '',
        lastName: '',
        email: '',
        picture: ''
    },
    authenticate: false,
    authenticating: false,
    loading: false,
    error: null,
    message: ''
}
export default (state = initialState, action) => {
    // console.log(action)
    if (action.type === authConstants.LOGIN_REQUEST) {
        state = {
            ...state,
            authenticating: true,
        }
    }
    if (action.type === authConstants.LOGIN_SUCCESS) {
        state = {
            ...state,
            user: action.payload.user,
            token: action.payload.token,
            authenticate: true,
            authenticating: false,
        }
    }
    return state
}