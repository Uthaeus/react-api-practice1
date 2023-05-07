import { Link } from "react-router-dom";

function MeetupItem(props) {
    const { title, location, time, date, description, main_image, thumbnail_image, id } = props.meetup;

    return (
        <div>
            <Link to={`/meetups/${id}`}><h3>{title}</h3></Link>
            <div>
                <p>{location}</p>
                <p>{time}</p>
                <p>{date}</p>
            </div>
        </div>
    );
}

export default MeetupItem;