import {  Tab, Tabs } from "react-bootstrap";
import Login from "../component/Login";
import Register from "../component/Register";

function AuthPage() {
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Authentication</h2>
            <Tabs
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="login" title="Login">
                    <Login />
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Register />
                </Tab>
            </Tabs>
        </main>
    );
}

export default AuthPage;