import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/logout", {
            method: "DELETE"
        })
        .then(() => navigate("/"))
        .catch(error => console.log('logout error: ', error));
    }, []);
}

export default Logout;