import { useEffect, useState } from "react";

function UserPage() {
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        fetch("http://localhost:4000/current_user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Not logged in");
            }
            setIsUser(true);
            return response.json();
        })
        .catch(error => console.log('user error: ', error));
    }, []);

    return (
        <div>
            <h1>User Page</h1>
            {isUser ? <p>You are logged in</p> : <p>You are not logged in</p>}
        </div>
    );
}

export default UserPage;