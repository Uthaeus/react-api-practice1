import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function MeetupDetail() {
    const [meetup, setMeetup] = useState({});
    const { meetupId } = useParams();

    useEffect(() => {
        fetch(`http://localhost:4000/meetups/${meetupId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMeetup(data);
            })
            .catch((error) => {
                console.log('meetup show error', error);
            });
    }, [meetupId]);

    return (
        <div>
            <h1>{meetup.title}</h1>

            <p>{meetup.description}</p>

            <div>
                <Link to={`/meetups/${meetupId}/edit`}>Edit</Link>
            </div>
        </div>
    );
}

export default MeetupDetail;