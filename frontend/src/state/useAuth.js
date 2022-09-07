import { useEffect, useState } from "react";
import axios from "axios";
import CONSTANTS from "../utils/Constants";

const useAuth = () => {
    const [user, setUser] = useState({
        name: "",
    });
    useEffect(() => {
        reloadUser();
    }, [])
    const reloadUser = () => {
        axios.get(`${CONSTANTS.BACKEND_HOST}/users`,  { withCredentials: true })
            .then(function (response) {
                setUser(response.data[0]);
            }).catch(function (error) {
                // handle error
                setUser({});
            });
    }
    const logout = () => {
        console.log("logged out")
        axios.get(`${CONSTANTS.BACKEND_HOST}/logout`,  { withCredentials: true })
            .then(function (response) {
                setUser({name: ""});
            }).catch(function (error) {
                // handle error
            });
    }
    return [user, reloadUser, logout]
}

export default useAuth;