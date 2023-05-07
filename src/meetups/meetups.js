import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import MeetupItem from "./meetup-item";
import { AuthContext } from "../store/auth-context";

function MeetupsPage() {
    const [meetups, setMeetups] = useState([]);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        fetch("http://localhost:4000/meetups")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMeetups(data);
            })
            .catch((error) => {
                console.log('meetups index error', error);
            });
    }, []);

    let meetupsList = meetups.map((meetup) => {
        return <MeetupItem key={meetup.id} meetup={meetup} />;
    });

    return (
        <div>
            <h1>Meetups Page</h1>
            {authCtx.isLoggedIn && <Link to="/meetups/new">Create New Meetup</Link>}

            {meetupsList}
        </div>
    );
}

export default MeetupsPage;