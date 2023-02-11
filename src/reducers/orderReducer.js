import { orderConstants } from "../actions/constants";

const initState = {
  orders: [],
};

export default (state = initState, action) => {
  if (action.type === orderConstants.GET_CUSTOMER_ORDER_SUCCESS) {
      state = {
        ...state,
        orders: action.payload.orders,
      };
  }

  return state;
};
