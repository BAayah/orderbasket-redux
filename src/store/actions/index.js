export const ADD_ORDER = "ADD_ORDER"

// export const add_order = () => {
//     return{
//         type:ADD_ORDER
//     }
// }

export const add_order = (item) => ({
    type: ADD_ORDER,
    payload: {
        title: item.title,
        price: item.price,
        quantity: 1,
    }
})

// `payload` is an onject that carries information about the item being added to 
//the order.