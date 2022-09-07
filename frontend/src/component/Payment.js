import axios from "axios";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../context/CartContextProvider";
import CONSTANTS from "../utils/Constants";

function Payment() {
    const cart = useContext(CartContext);
    const addOrder = () => {
        let ids = [...cart.items.map(item => item.id)]
        axios.post(`${CONSTANTS.BACKEND_HOST}/orders`, ids,  { withCredentials: true }).then(resp => {
            return resp.data
        }).then(id => {
           return axios.get(`${CONSTANTS.BACKEND_HOST}/orders/${id}/pay`, { withCredentials: true })
        }).then(resp => {
            console.log(resp)
            document.location = resp.data
        });
    }
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Payment</h2>
           <Button variant="success" onClick={() => addOrder()}>Pay</Button>
        </main>
    );
}

export default Payment;