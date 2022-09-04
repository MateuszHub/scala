import axios from "axios";
import { useState } from "react";

const Register = () => {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const loginSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8080/reg`, {email: email, password: password})
    }
    return (
        <form id="regform" onSubmit={loginSubmit}>
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
                Register
            </button>
        </form>
    )
}

export default Register;