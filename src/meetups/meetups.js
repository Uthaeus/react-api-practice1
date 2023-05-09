import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import MeetupItem from "./meetup-item";
import { AuthContext } from "../store/auth-context";
import MeetupSideItem from "./meetup-side-item";

function MeetupsPage() {
    const [meetups, setMeetups] = useState([]);
    const [sidebarMeetup, setSidebarMeetup] = useState({});
    const authCtx = useContext(AuthContext);
    let animationItem = document.querySelector(".meetups-sidebar-item");
    let interval;

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

    useEffect(() => {
        let meetupsArr = [...meetups];
        let index = 0;
        const intervalId = setInterval(() => {
            console.log("interval", index, meetupsArr[index]);
            if (index >= meetups.length - 1) {
                index = 0;
            }
            setSidebarMeetup(() => meetupsArr[index]);
            animationItem?.classList.add("slide-in");
            index++;
        }, 5000);

        return () => {
            animationItem?.classList.remove("slide-in");
            animationItem?.classList.add("slide-out");
            clearInterval(intervalId);
        };
    }, [meetups]);


    let meetupsList = meetups.map((meetup) => {
        return <MeetupItem key={meetup.id} meetup={meetup} />;
    });

    return (
        <div className="meetups-container">
            <div className="meetups-wrapper">
                <h1 className="meetups-title">Meetups Page</h1>
                {authCtx.isLoggedIn && <Link to="/meetups/new" className="new-meetup-btn">Create New Meetup</Link>}

                {meetupsList}
            </div>

            <div className="meetups-sidebar">
                <h2 className="meetups-sidebar-title text-center">Upcoming Meetups</h2>

                <div className="meetups-sidebar-display">
                    {sidebarMeetup !== undefined && <MeetupSideItem meetup={sidebarMeetup} />}
                </div>
            </div>
        </div>
    );
}

export default MeetupsPage;