import { ADD_ORDER } from "../actions"
import { REMOVE_ORDER } from "../actions/remove";

const defaultState = {
    order: [],
    totalPrice: 0,
    totalCount: 0
}

export const rootReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const existingItemIndex = state.order.findIndex(
                (item) => item.title === action.payload.title
            );

            // if (existingItemIndex !== -1) {
            //     //If the item already exists, update its quantity
            //     state.order[existingItemIndex].quantity += 1;
            // } else {
            //     //If the item is new, add it to the order array
            //     state.order.push(action.payload);
            // }

            // state.totalPrice += action.payload.price;
            // state.totalCount += 1;
            // break;

            if (existingItemIndex !== -1) {
                // If the item already exists, create a new array with updated quantity
                return {
                    ...state,
                    order: state.order.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                    totalPrice: state.totalPrice + action.payload.price,
                    totalCount: state.totalCount + 1
                };
            } else {
                // If the item is new, add it to the order array
                return {
                    ...state,
                    order: [...state.order, { ...action.payload, quantity: 1 }],
                    totalPrice: state.totalPrice + action.payload.price,
                    totalCount: state.totalCount + 1
                };
            }
        case REMOVE_ORDER:
            const itemIndexToRemove = state.order.findIndex(
                (item) => item.title === action.payload.title
            );

            if (itemIndexToRemove !== -1) {
                //   If the item is found
                const removedItem = state.order[itemIndexToRemove];
                // if (removedItem.quantity > 1) {
                //     removedItem.quantity -= 1;
                //     state.totalPrice -= removedItem.price;
                //     state.totalCount -= 1;
                // } else {
                //     // If the quantity is 1, remove the item from the order array
                //     state.order.splice(itemIndexToRemove, 1);
                //     state.totalPrice -= removedItem.price;
                //     state.totalCount -= 1;
                // }
                if (removedItem.quantity > 1) {
                    // If quantity is more than 1, create a new array with updated quantity
                    return {
                        ...state,
                        order: state.order.map((item, index) =>
                            index === itemIndexToRemove
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        ),
                        totalPrice: state.totalPrice - removedItem.price,
                        totalCount: state.totalCount - 1
                    };
                } else {
                    // If the quantity is 1, remove the item from the order array
                    return {
                        ...state,
                        // this line is executed when the quantity of the item is 1 to remove from the order.
                        // the filter method ia a way to create a modified array based on certain conditions.
                        order: state.order.filter((_, index) => index !== itemIndexToRemove),
                        totalPrice: state.totalPrice - removedItem.price,
                        totalCount: state.totalCount - 1
                    };
                }
            }
            break;

        default:
            return state;
    }
    return {
        ...state
        // order: [
        //     ...state.order,
        //     {
        //         title: action.title,
        //         price: action.price
        //     }
        // ]
    };
}
