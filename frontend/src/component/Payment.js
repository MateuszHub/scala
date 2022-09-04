import { Button } from "react-bootstrap";

function Payment() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Payment</h2>
            <a href="https://localhost:9443/orders/1/pay"><Button variant="success">Pay</Button></a>
        </main>
    );
}

export default Payment;