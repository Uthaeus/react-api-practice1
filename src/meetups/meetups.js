import { useEffect, useState } from "react";

function MeetupsPage() {
    const [meetups, setMeetups] = useState([]);

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
        return (
            <li key={meetup.id}>
                {meetup.title}
            </li>
        );
    });

    return (
        <div>
            <h1>Meetups Page</h1>

            <ul>
                {meetupsList}
            </ul>
        </div>
    );
}

export default MeetupsPage;