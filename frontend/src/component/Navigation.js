import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../state/useAuth';
const Navigation = (props) => {
    const isUserLogged = () => {
        return user?.name?.length > 0;
    }
    const [user, _, logout] = useAuth()

    return (<Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Game Shop</Navbar.Brand>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Games</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    {!isUserLogged() && <Nav.Link href="/auth">Login/Register</Nav.Link>}
                    {isUserLogged() && <Nav.Link href="/orders">Orders</Nav.Link>}
                    {isUserLogged() && <Nav.Link href="/account">Account</Nav.Link>}
                    {isUserLogged() && user.isAdmin && <Nav.Link href="/items/add">Add item</Nav.Link>}
                    {isUserLogged() &&<button className='btn' onClick={(e) => {logout()}}>Logout</button>}
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>)
}

export default Navigation;