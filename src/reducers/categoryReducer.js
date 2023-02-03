import {categoryConstants} from "../actions/constants.js";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = []
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type: category.type,
                children: [],
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: []
            };
            myCategories.push({
                ...cat,
                children: cat.children > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            })
        }
    }
    return myCategories
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
        const category = action.payload.category
        const updatedCategories = buildNewCategories(category.parentId, state.categories, category)
        //console.log(updatedCategories)
        state = {
            ...state,
            loading: false,
            categories: updatedCategories
        }
    }
    if (action.type === categoryConstants.ADD_NEW_CATEGORY_FAILURE) {
        state = {
            ...initialState
        }
    }

    if (action.type === categoryConstants.UPDATE_CATEGORIES_REQUEST) {
        state = {
            ...state,
            loading: true
        }
    }
    if (action.type === categoryConstants.UPDATE_CATEGORIES_SUCCESS) {
        state = {
            ...state,
            loading: false
        }
    }
    if (action.type === categoryConstants.UPDATE_CATEGORIES_FAILURE) {
        state = {
            ...state,
            error: action.payload.error,
            loading: false
        }
    }
    if (action.type === categoryConstants.DELETE_CATEGORIES_REQUEST) {
        state = {
            ...state,
            loading: true
        }
    }
    if (action.type === categoryConstants.DELETE_CATEGORIES_SUCCESS) {
        state = {
            ...state,
            loading: false
        }
    }
    if (action.type === categoryConstants.DELETE_CATEGORIES_FAILURE) {
        state = {
            ...state,
            loading: false,
            error: action.payload.error
        }
    }

    return state
}
