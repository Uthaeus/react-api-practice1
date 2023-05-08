import { useState, useEffect } from "react";
import { useParams } from "react-router";

import MeetupForm from "./meetup-form";

function EditMeetup() {
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
        <div className="new-edit-container">
            <h1 className="new-edit-title">Edit Meetup</h1>

            <MeetupForm meetup={meetup} />
        </div>
    );
}

export default EditMeetup;