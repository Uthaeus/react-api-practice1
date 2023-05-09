
function MeetupSideItem({meetup}) {
    let img = meetup.thumb_image ? `http://localhost:4000${meetup.thumb_image.url}` : "https://via.placeholder.com/200x150";

    return (
        <div className="meetup-side-item">
            <div className="side-item-img" style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "250px",
            }} />
            <h2 className="side-item-title text-center">{meetup.title}</h2>
            <p className="side-item-location text-center">{meetup.location}</p>
        </div>
    );
}

export default MeetupSideItem;