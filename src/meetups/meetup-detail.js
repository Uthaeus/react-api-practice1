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
        console.log("meetup show error", error);
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
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        comment: {
          content: comment,
          meetup_id: meetupId,
        },
      }),
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
      method: "DELETE",
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

  console.log('comments', comments);

  let meetupUser = meetup.user ? meetup.user.username : "anonymous";
  let imageUrl = meetup.main_image ? `http://localhost:4000${meetup.main_image.url}` : "https://via.placeholder.com/600x300";

  return (
    <div className="meetup-detail-container">
      <div className="detail-col-left">

        <div className="detail-header">
            <div className="detail-title-wrapper">
                <h1 className="detail-title">{meetup.title}</h1>
                <p className="detail-user">posted by {meetupUser}</p>
            </div>

            <div className="details-wrapper">
                <p className="detail-item">{meetup.location}</p>
                <p className="detail-item">{meetup.date}</p>
                <p className="detail-item">{meetup.time}</p>
            </div>
        </div>

        <div className="detail-image" style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "300px",
        }} />

        <p className="detail-description">{meetup.description}</p>

        <div className="detail-actions">
          <button onClick={deleteHandler} className="detail-btn detail-delete">Delete</button>
          <Link to={`/meetups/${meetupId}/edit`} className="detail-btn detail-edit">Edit</Link>
          <Link to="/meetups" className="detail-btn detail-back">Back to Meetups</Link>
        </div>
      </div>

      <div className="detail-col-right">
        <div>
          {isLoggedIn === true && (
            <>
              <textarea
                className="comment-input"
                placeholder="Add a comment"
                onChange={commentChangeHandler}
                value={comment}
                rows={5}
              />
              <button className="comment-btn" onClick={commentSubmitHandler}>Submit</button>
            </>
          )}
          {comments?.map((comment) => {
            return (
              <div className="comment-wrapper" key={comment.id}>
                <p className="comment-content">{comment.content}</p>
                <p className="comment-user">
                  - comment by {comment.user?.username}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MeetupDetail;
