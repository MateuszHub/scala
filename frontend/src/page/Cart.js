import { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import AddressForm from "../component/AddressForm";
import Payment from "../component/Payment";
import CartList from "../component/CartList";
import axios from "axios";
import CONSTANTS from "../utils/Constants";

function Cart() {

    const [key, setKey] = useState('cart');
    const [address, setAddress] = useState({
        name: '',
        surname: '',
        city: '',
        zip: '',
        country: '',
        line1: '',
        line2: ''
    });

    useEffect(() => {
        axios.get(`${CONSTANTS.BACKEND_HOST}/address`,  { withCredentials: true })
            .then(function (response) {
                if(response?.data?.length > 0)
                    setAddress(response.data[0]);
            }).catch(function (error) {
                setAddress({});
            });
    }, []);

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Cart</h2>
            <Tabs
                activeKey={key}
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="cart" title="Cart" disabled>
                    <CartList />
                    <Button variant="success" onClick={() => setKey("address")}>Checkout</Button>
                </Tab>
                <Tab eventKey="address" title="Address" disabled>
                    <AddressForm formControl={[address, setAddress]} ></AddressForm>
                    <Button variant="success" onClick={() => setKey("payment")}>Buy</Button>
                </Tab>
                <Tab eventKey="payment" title="Payment" disabled>
                    <Payment />
                </Tab>
            </Tabs>

        </main>
    );
}

export default Cart;