import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import Image from "../ui/Image";

function MeetupDetail() {
    const [meetup, setMeetup] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { meetupId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsLoggedIn(true);
        }

        fetch(`http://localhost:4000/meetups/${meetupId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setMeetup(data);
                setComments(data.comments);
            })
            .catch((error) => {
                console.log('meetup show error', error);
            });
    }, [meetupId]);

    function commentChangeHandler(event) {
        setComment(event.target.value);
    }

    function commentSubmitHandler(e) {
        e.preventDefault();

        fetch("http://localhost:4000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify({
                comment: {
                    content: comment,
                    meetup_id: meetupId
                }
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((data) => {
                setComments([data, ...comments]);
                setComment("");
            })
            .catch((error) => {
                console.log("comment create error", error);
            });
    }

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

                <div>
                    {isLoggedIn === true && (
                        <div>
                            <textarea placeholder="Add a comment" onChange={commentChangeHandler} value={comment} rows={5} />
                            <button onClick={commentSubmitHandler}>Submit</button>
                        </div>
                    )}
                    {comments?.map((comment) => {
                        return (
                            <div key={comment.id}>
                                <p>{comment.content}</p>
                                <p>User info: {comment.user_id} | {comment.user?.username}</p>
                            </div>
                        );
                    })}
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