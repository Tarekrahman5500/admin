import {categoryConstants} from "../actions/constants.js";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = (parentId, categories, category) => {
    let myCategories = []
    for (let cat of categories) {
        if (cat._id == parentId) {
            myCategories.push({
                ...cat,
                children: cat.children &&
                cat.children.length > 0 ?
                    buildNewCategories(parentId, [...cat.children, {
                        _id: category._id,
                        name: category.name,
                        slug: category.slug,
                        parentId: category.parentId,
                        children: category.children,

                    }], category) : []
            })
        } else {
            myCategories.push({
                ...cat,
                children: cat.children &&
                cat.children.length > 0 ?
                    buildNewCategories(parentId, cat.children, category) : []
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
        console.log(updatedCategories)
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
    return state
}
