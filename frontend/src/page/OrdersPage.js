import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import useAuth from "../state/useAuth";
import axios from "axios";



function OrdersPage() {
    const [orders, setOrders] = useState([]);

    const [user] = useAuth();

    const loadOrders = () => {
        axios.get(`https://localhost:9443/orders`, { withCredentials: true })
            .then(function (response) {
                console.log(response.data)
                setOrders(response.data);
            }).catch(function (error) {
                // handle error
                setOrders([]);
            });
    }
    useEffect(() => {
        loadOrders();
    }, [user])

    const ordersList = orders.map((order) => <li className="mb-5">
        <Card.Body>
            <Card.Title>Date: {order.when}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Total: {order.total}</Card.Subtitle>
            {order.paid > 0 && <Card.Text>
                This order is paid
            </Card.Text>}
            {(order.paid == null || order.paid == 0) && 
            <Card.Link href={`https://localhost:9443/orders/${order.id}/pay`}>Pay</Card.Link>}
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