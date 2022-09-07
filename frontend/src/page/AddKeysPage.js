import axios from "axios";
import { useState } from "react";
import { Button, Col, Form, Row} from "react-bootstrap";
import { useParams } from "react-router-dom";
import CONSTANTS from "../utils/Constants";

function AddKeysPage() {
    const { id } = useParams(); 
    const [keys, setKeys] = useState("")

    const addKey = () => {
        axios.post(`${CONSTANTS.BACKEND_HOST}/items/${id}/keys`, keys.split(","),  { withCredentials: true });
    }

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="name">
                    <Form.Label>Keys</Form.Label>
                    <Form.Control placeholder="name"
                        value={keys}
                        onChange={(e) => {
                            setKeys(e.target.value);
                        }} />
                </Form.Group>
            </Row>

            <Button variant="success" onClick={() => { addKey() }}>Add</Button>
        </Form>

    )
}

export default AddKeysPage;