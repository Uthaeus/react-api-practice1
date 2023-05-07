import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Image from "../ui/Image";

function MeetupDetail() {
    const [meetup, setMeetup] = useState({});
    const { meetupId } = useParams();
    const navigate = useNavigate();

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

    function deleteHandler() {
        fetch(`http://localhost:4000/meetups/${meetupId}`, {
            method: "DELETE"
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/meetups");
                    return response.json();
                }
            })
            .catch((error) => {
                console.log("meetup delete error", error);
            });
    }

    return (
        <div>
            <div>
                <div>
                    <h1>{meetup.title}</h1>
                    {meetup.id}
                    <p>{meetup.description}</p>
                    <p>User info: {meetup.user_id} | {meetup.user?.username}</p>
                </div> 

                <div>
                    <Image src={meetup.main_image?.url} alt={meetup.title} type='main' />
                </div>
            </div>

            <div>
                <button onClick={deleteHandler}>Delete</button>
                <Link to={`/meetups/${meetupId}/edit`}>Edit</Link>
                <Link to="/meetups">Back to Meetups</Link>
            </div>
        </div>
    );
}

export default MeetupDetail;