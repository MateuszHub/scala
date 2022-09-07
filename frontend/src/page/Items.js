import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { Button, Card, Container, Dropdown, Form } from 'react-bootstrap'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/CartContextProvider";
import useAuth from "../state/useAuth";
import { Link } from "react-router-dom";
import axios from 'axios';
import CONSTANTS from '../utils/Constants';
function Items() {

    const [allItems, setAllItems] = useState([])

    const filterTypes = ["active", "inactive"]

    const StyledCardImg = styled(Card.Img)`
        height: 15vw;
        object-fit: cover;
    `
    const [user] = useAuth();
    const cart = useContext(CartContext);

    const [filters, setFilters] = useState(["active"]);
    const [items, setItems] = useState([]);

    const setFilter = (name, value) => {
        if (value)
            setFilters([...filters.filter(e => e !== name), name])
        else
            setFilters([...filters.filter(e => e !== name)])
    }
    
    const loadItems = () => {
        axios.get(`${CONSTANTS.BACKEND_HOST}/items`,  { withCredentials: true })
            .then(function (response) {
                setAllItems([...response.data]);  
            }).catch(function (error) {
                setAllItems([]);
            });
    }
    
    useEffect(() => {
        loadItems()
    }, [])

    useEffect(() => {              
        let tmpItems = [...allItems].filter(item => item.price > 0);
        if(filters.indexOf("active") < 0)
            tmpItems = tmpItems.filter(e => e.quantity === 0)
        if(filters.indexOf("inactive") < 0)
            tmpItems = tmpItems.filter(e => e.quantity > 0)
        setItems([...tmpItems])
    }, [filters, allItems])

    const sortByName = () => {
        setItems([...items].sort((a, b) => a.name.localeCompare(b.name)))
    }
    const sortByPrice = () => {
        setItems([...items.sort((a, b) => a.price - b.price)])
    }

    return (
        <Container fluid>
            <h2>Items</h2>
            <Row>
                <Col>
                    {filterTypes.map((item, index) => (
                        <Form.Check
                            key={index}
                            type="switch"
                            label={item}
                            defaultChecked={filters.indexOf(item) >= 0}
                            onClick={(e) => { setFilter(item, e.target.checked) }}
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
                    <Col key={index}>
                        <Card>
                            <StyledCardImg src={item.img} />
                            <Card.Body>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                {(item.price / 100)}zł
                                </Card.Text>
                                {user?.isAdmin && <Link to={`/items/${item.id}/keys`}><Button variant="primary" className='mx-1'>Add keys</Button></Link>}
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