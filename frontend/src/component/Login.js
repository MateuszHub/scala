import axios from "axios";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import useAuth from "../state/useAuth";

const Login = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [reloadUser] = useAuth();
    const loginSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/login`, { email: email, password: password })
            .then(() => {
                reloadUser();
            })
    }

    return (
        <Row>
            <Col>
                <form id="loginform" onSubmit={loginSubmit} >
                    <div className="form-group mt-5">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="EmailInput"
                            name="EmailInput"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">
                        Login
                    </button>
                </form>
            </Col>
            <Col>
                <div className="mt-5">
                    <a href="https://localhost:9443/login/google">
                        <button type="submit" className="btn btn-secondary py-2 px-5 mt-4" >
                            Login with google
                        </button>
                    </a>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-secondary  py-2 px-5" >
                        Login with facebook
                    </button>
                </div>
                <div className="mt-3">
                    <button type="submit" className="btn btn-secondary py-2  px-5" >
                        Login with github
                    </button>
                </div>
            </Col>
        </Row>

    )
}

export default Login;