import { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import CONSTANTS from "../utils/Constants";

function ItemAdd() {
    const [item, setItem] = useState({
        id: 0,
        name: "",
        price: null,
        desc: "",
        img: ""
    })

    const addItem = () => {
        axios.post(`${CONSTANTS.BACKEND_HOST}/items`, {...item}, {useCredentials: true});
    }

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="name"
                        value={item.name}
                        onChange={(e) => {
                            setItem({ ...item, name: e.target.value });
                        }} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control placeholder="price"
                        value={item.price}
                        onChange={(e) => {
                            setItem({ ...item, price: Number.parseInt(e.target.value) });
                        }} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="desc">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="desc"
                        value={item.desc}
                        onChange={(e) => {
                            setItem({ ...item, desc: e.target.value });
                        }} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="img">
                    <Form.Label>Image url</Form.Label>
                    <Form.Control placeholder="img"
                        value={item.img}
                        onChange={(e) => {
                            setItem({ ...item, img: e.target.value });
                        }} />
                </Form.Group>
            </Row>
            <Button variant="success" onClick={() => { addItem() }}>Add</Button>
        </Form>

    )
}

export default ItemAdd;