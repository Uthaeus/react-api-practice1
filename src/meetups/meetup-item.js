import { Link } from "react-router-dom";

import Image from "../ui/Image";

function MeetupItem(props) {
    const { title, location, time, date, thumb_image, id } = props.meetup;

    return (
        <div>
            <Image src={thumb_image?.url} alt={title} type='thumbnail' />
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