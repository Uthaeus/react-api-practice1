import MeetupForm from "./meetup-form";

function NewMeetup() {
    return (
        <div className="new-edit-container">
            <h1 className="new-edit-title">Create New Meetup</h1>

            <MeetupForm />
        </div>
    );
}

export default NewMeetup;