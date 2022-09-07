import { useContext } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { CartContext } from "../context/CartContextProvider";

function ItemCartComponent({item}) {
    console.log(item)
    const cart = useContext(CartContext);

    return (
        <li className="mt-3">
            <Card style={{ width: '18rem' }}>
                <Card.Header>{item.name}</Card.Header>
                <ListGroup variant="flush">
                <ListGroup.Item>{(item.price / 100)}zł</ListGroup.Item>
                <ListGroup.Item><Button variant="danger" onClick={() => cart.removeProductFromCart(item)}>Remove</Button></ListGroup.Item>
                </ListGroup>
            </Card>
        </li>
    )
}

export default ItemCartComponent;