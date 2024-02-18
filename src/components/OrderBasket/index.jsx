import React from 'react'
import { data } from '../../store/data'
import { useDispatch, useSelector } from 'react-redux'
import { add_order } from '../../store/actions'
import { remove_order } from '../../store/actions/remove'


export const OrderBasket = () => {
    const dispatch = useDispatch();

    //Using useSelector to access the state from Redux
    const orderData = useSelector((state) => state.order);
    const totalPrice = useSelector((state) => state.totalPrice);
    const totalCount = useSelector((state) => state.totalCount);
   
    const handleRemoveItem = (title) => {
        dispatch(remove_order(title));
    };

    return (
        <div style={styles.orderContainer}>
            <div style={styles.menuContainer}>
                <h1>MENU</h1>
                <ul>
                    {data.map((el, id) => {
                        // onClick to dispatch we send to store 
                        return <li key={id} onClick={() => dispatch(add_order(el))}>
                            {el.title} <b>{el.price}</b>
                        </li>
                    })
                    }
                </ul>
            </div>
            <div style={styles.basketContainer}>                
                <h1>ORDERS</h1>
                {/* {Display total quantity & prices} */}
                <div className='total'>
                    <p>Total Quantity: {totalCount}</p>
                    <p>Total Price: {totalPrice}</p>
                </div>
                <ul>
                    {/* // we expose with key order */}
                    {orderData.map((order, id) => (
                        <li key={id}>
                            {order.title} - Quantity: {order.quantity} | Price: {order.price * order.quantity}
                            <button onClick={() => handleRemoveItem(order.title)}>Remove</button>
                        </li>
                    ))}
                </ul>                
            </div>
        </div >
    );
}

const styles = {
    orderContainer: {
        display: "flex",
        justifyContent: "space-between",
        // width: "1500px"
    },
    menuContainer: {
        width: "50%"
    },    
    basketContainer: {
        width: "50%"
    },
}
