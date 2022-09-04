import { Col, Form, Row } from "react-bootstrap"

const AddressForm = (props) => {
    const [form, setForm] = props.formControl;
        
    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="name"
                        value={form.name}
                        onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                        }} />
                </Form.Group>

                <Form.Group as={Col} controlId="surname">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname"
                        value={form.surname}
                        onChange={(e) => {
                            setForm({ ...form, surname: e.target.value });
                        }} />
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="address1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St"
                    value={form.line1}
                    onChange={(e) => {
                        setForm({ ...form, line1: e.target.value });
                    }} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control placeholder="Apartment, studio, or floor"
                    value={form.line2}
                    onChange={(e) => {
                        setForm({ ...form, line2: e.target.value });
                    }} />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        value={form.city}
                        onChange={(e) => {
                            setForm({ ...form, city: e.target.value });
                        }} />
                </Form.Group>

                <Form.Group as={Col} controlId="zip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control
                        value={form.zip}
                        onChange={(e) => {
                            setForm({ ...form, zip: e.target.value });
                        }} />
                </Form.Group>

                <Form.Group as={Col} controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        value={form.country}
                        onChange={(e) => {
                            setForm({ ...form, country: e.target.value });
                        }} />
                </Form.Group>
            </Row>
        </Form>)
}

export default AddressForm;