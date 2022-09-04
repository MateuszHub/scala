import Item from "../component/Item";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Button, Card, Container, Dropdown, Form } from 'react-bootstrap'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContextProvider";
function Items() {

    const allItems = [
        { name: "1Apple iphhone 12", price: 123, genre: "action", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "2Apple iphhone 11", price: 223, genre: "rpg", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "3Apple iphhone 13", price: 323, genre: "sport", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "4Apple iphhone 12", price: 123, genre: "action", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "5Apple iphhone 11", price: 223, genre: "rpg", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "6Apple iphhone 13", price: 323, genre: "sport", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "7Apple iphhone 12", price: 123, genre: "action", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "8Apple iphhone 11", price: 223, genre: "rpg", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "9Apple iphhone 13", price: 323, genre: "sport", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "Apple iphhone 12", price: 123, genre: "action", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "Apple iphhone 11", price: 223, genre: "rpg", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
        { name: "Apple iphhone 13", price: 323, genre: "sport", quantity: 2, img: "https://m.media-amazon.com/images/I/81xdOXAODpL.jpg" },
    ]

    const genres = ["action", "rpg", "sport"]

    const StyledCardImg = styled(Card.Img)`
        height: 15vw;
        object-fit: cover;
    `

    
    const cart = useContext(CartContext);
    console.log(cart)

    const [filters, setFilters] = useState(["action"]);
    const [items, setItems] = useState([]);

    const setGenreFilter = (name, value) => {
        if (value)
            setFilters([...filters, name])
        else
            setFilters([...filters.filter(e => e !== name)])
        console.log(filters)
    }

    useEffect(() => {
        setItems(allItems.filter(e => filters.indexOf(e.genre) >= 0))
    }, [filters])

    const sortByName = () => {
        setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))
    }
    const sortByPrice = () => {
        setItems([...items].sort((a, b) => a.price - b.price))
    }

    return (
        <Container fluid>
            <h2>Items</h2>
            <Row>
                <Col>
                    {genres.map((item, index) => (
                        <Form.Check
                            key={item}
                            type="switch"
                            label={item}
                            onClick={(e) => { console.log(e.currentTarget.checked); setGenreFilter(item, e.target.checked) }}
                        />))}
                </Col>
                <Col>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic" >
                            Sorting
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={e => sortByName()}>name</Dropdown.Item>
                            <Dropdown.Item onClick={e => sortByPrice()}>price</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row xs={2} md={3} className="g-4">
                {items.map((item, index) => (
                    <Col key={item.name}>
                        <Card>
                            <StyledCardImg src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.price}zł
                                </Card.Text>
                                <Button variant="primary" onClick={e => cart.addProductToCart(item)}>Add to cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </Container>
    );
}

export default Items;