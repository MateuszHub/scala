import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";

function ItemCartComponent({item}) {
    console.log(item)
    const cart = useContext(CartContext);

    return (
        <li>
            <ul>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.quantity}</li>
            </ul>
            <button onClick={() => cart.removeProductFromCart(item)}>Remove</button>
        </li>
    )
}

export default ItemCartComponent;