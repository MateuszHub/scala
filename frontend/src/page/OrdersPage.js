import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import useAuth from "../state/useAuth";
import axios from "axios";
import CONSTANTS from "../utils/Constants";



function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [keys, setKeys] = useState({})
    const [user] = useAuth();

    const loadOrders = () => {
        axios.get(`${CONSTANTS.BACKEND_HOST}/orders`, { withCredentials: true })
            .then(function (response) {
                console.log(response.data)
                setOrders(response.data);
            }).catch(function (error) {
                // handle error
                setOrders([]);
            });
    }

    const loadKeys = (id) => {
        axios.get(`${CONSTANTS.BACKEND_HOST}/orders/${id}/keys`, { withCredentials: true })
            .then(function (response) {
                console.log(response.data)
                let newKeys = {...keys};
                newKeys[id]=response.data 
                setKeys(newKeys);
            })
    }

    useEffect(() => {
        loadOrders();
    }, [user])

    const ordersList = orders.map((order) => <li className="mb-5">
        <Card.Body>
            <Card.Title>Date: {order.when}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Total: {order.total}</Card.Subtitle>
            {order.paid > 0 &&
                <Card.Text>
                    {!keys[order.id] && <Button onClick={() => loadKeys(order.id)}>Show keys</Button>}
                    {keys[order.id] && <ul>
                        {keys[order.id] && keys[order.id].map((key, index) =>
                            <li key={index}>{key.key}</li>
                        )}
                    </ul>}
                </Card.Text>}
            {(order.paid == null || order.paid === 0) &&
                <Card.Link href={`${CONSTANTS.BACKEND_HOST}/orders/${order.id}/pay`}>Pay</Card.Link>}
        </Card.Body>
    </li>);
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Orders:</h2>
            <ul>{ordersList}</ul>
        </main>
    );
}

export default OrdersPage;