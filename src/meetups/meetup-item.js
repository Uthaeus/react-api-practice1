import { Link } from "react-router-dom";

function MeetupItem(props) {
  const { title, location, time, date, thumb_image, id, user } = props.meetup;

  let backgroundImg = thumb_image ? `http://localhost:4000${thumb_image.url}` : "https://via.placeholder.com/600x400";

  let userItem = user ? `posted by ${user.username}` : `posted by anonymous`;

  return (
    <Link to={`/meetups/${id}`} className="meetup-item-container">
      <div
        className="meetup-item-img"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "250px",
        }}
      />
      <h3 className="meetup-item-title">
        {title}
        <span className="meetup-item-user">{userItem}</span>
        </h3>
      <div className="meetup-item-details">
        <p className="meetup-item-detail">{location}</p>
        <p className="meetup-item-detail">{time}</p>
        <p className="meetup-item-detail">{date}</p>
      </div>
    </Link>
  );
}

export default MeetupItem;
