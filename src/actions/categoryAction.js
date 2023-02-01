import axios from "../helpers/axios.js";
import {categoryConstants} from "./constants.js";

export const getAllCategory = () => {
    return async dispatch => {
        try {
            dispatch({type: categoryConstants.GET_ALL_CATEGORIES_REQUEST})
            const res = await axios.get(`category/getcategory`)
            //  console.log(res)
            if (res.status === 200) {
                const {categoryList} = res.data
                dispatch({
                    type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
                    payload: {categories: categoryList}
                })
            }
        } catch (err) {
            dispatch({
                type: categoryConstants.GET_ALL_CATEGORIES_FAILURE,
                payload: {error: err.response.data.error}
            })
        }
    }
}

export const addCategory = (form) => {
 // console.log(form)
    return async dispatch => {
        try {
            dispatch({type: categoryConstants.ADD_NEW_CATEGORY_REQUEST})
            const res = await axios.post(`/category/create`, form)
            // console.log(res)
            if (res.status === 200) {
                dispatch({
                    type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
                    payload: {category: res.data}
                })
                dispatch(getAllCategory());
            }
        } catch (err) {
            dispatch({
                type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
                payload: {error: err.response.data.error}
            })
        }
    }
}

export const updateCategories = (form) => {
    return async dispatch => {
        try {
           // dispatch({type: categoryConstants.UPDATE_CATEGORIES_REQUEST});
            const res = await axios.post(`category/update`, form);
            console.log(res.data)
            if (res.status === 201) {
                dispatch({type: categoryConstants.UPDATE_CATEGORIES_SUCCESS});
                dispatch(getAllCategory());
            } else {
                const {error} = res.data;
                dispatch({
                    type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                    payload: {error}
                });
            }
        } catch (err) {
               console.error(err.response.data.error)
            dispatch({
                type: categoryConstants.UPDATE_CATEGORIES_FAILURE,
                payload: {error: err.response.data.error}
            });
        }
    }
}

export const deleteCategories = (ids) => {
    return async dispatch => {
        try {
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_REQUEST });
        const res = await axios.post(`category/delete`, {
            payload: {
                ids
            }
        });
      //  console.log(res)
        if (res.status === 201) {
            dispatch(getAllCategory());
            dispatch({ type: categoryConstants.DELETE_CATEGORIES_SUCCESS });
        } else {
            const { error } = res.data;
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error }
            });
        }
        } catch (err) {
            dispatch({
                type: categoryConstants.DELETE_CATEGORIES_FAILURE,
                payload: { error: err.response.data.error }
            });
        }
    }
}

