import { useEffect, useState } from "react";
import AddressForm from "../component/AddressForm";
import useAuth from "../state/useAuth";
import axios from "axios";



function AccountPage() {
    const [address, setAddress] = useState({
        name: '',
        surname: '',
        city: '',
        zip: '',
        country: '',
        line1: '',
        line2: ''
    });
    const [user] = useAuth();
    const loadAddress = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_HOST}/address`,  { withCredentials: true })
            .then(function (response) {
                console.log(response.data)
                setAddress(response.data[0]);
            }).catch(function (error) {
                setAddress({});
            });
    }
    
    useEffect(() => {
        loadAddress();
    }, [user])

   
    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>Account</h2>
            <p>{user.name}</p>
            <AddressForm formControl={[{...user, ...address}, (form) => {setAddress(form)}]}></AddressForm>

        </main>
    );
}

export default AccountPage;