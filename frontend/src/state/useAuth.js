import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
    const [user, setUser] = useState({
        name: "",
    });
    useEffect(() => {
        reloadUser();
    }, [])
    const reloadUser = () => {
        axios.get(`https://localhost:9443/users`,  { withCredentials: true })
            .then(function (response) {
                setUser(response.data[0]);
            }).catch(function (error) {
                // handle error
                setUser({});
            });
    }
    const logout = () => {
        axios.get(`https://localhost:9443/logout`,  { withCredentials: true })
            .then(function (response) {
                setUser({name: ""});
            }).catch(function (error) {
                // handle error
            });
    }
    return [user, reloadUser, logout]
}

export default useAuth;