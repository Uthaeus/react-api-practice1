import { useEffect } from "react";
import { useNavigate } from "react-router";

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:4000/logout", {
            method: "DELETE"
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Logout failed");
            }
            navigate("/");
            return response.json();
        })
        .catch(error => console.log('logout error: ', error));
    }, [navigate]);
}

export default Logout;