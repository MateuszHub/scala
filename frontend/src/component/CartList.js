import { useContext } from "react";
import { CartContext } from "../context/CartContextProvider";
import ItemCartComponent from "./ItemCartComponent";

function CartList() {
    const cart = useContext(CartContext);
    return (
        <ul>
            {cart.items.map((item, index) =>
                <ItemCartComponent key={index} item={item} />
            )}
        </ul>
    )
}

export default CartList;