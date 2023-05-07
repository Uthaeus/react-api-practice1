import { useEffect } from "react";
import { useForm } from "react-hook-form";

function MeetupForm({ meetup = {}}) {
    const { register, handleSubmit, errors, reset } = useForm({
        defaultValues: {
            title: meetup.title || "",
            location: meetup.location || "",
            time: meetup.time || "",
            date: meetup.date || "",
            desciption: meetup.desciption || "",
            main_image: meetup.main_image || "",
            thumbnail_image: meetup.thumbnail_image || ""
        }
    });


    function onSubmit(data) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" name="title" id="title" {...register({ required: true })} />
                {errors.title && <span>Title is required</span>}
            </div>

            <div className="form-group mb-2">
                <label htmlFor="location">Location</label>
                <input className="form-control" type="text" name="location" id="location" {...register({ required: true })} />
                {errors.location && <span>Location is required</span>}
            </div>

            <div className="form-group mb-2">
                <label htmlFor="time">Time</label>
                <input className="form-control" type="time" name="time" id="time" {...register({ required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="date">Date</label>
                <input className="form-control" type="date" name="date" id="date" {...register({ required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="main_image">Main Image</label>
                <input className="form-control" type="file" name="main_image" id="main_image" {...register({ required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="thumbnail_image">Thumbnail Image</label>
                <input className="form-control" type="file" name="thumbnail_image" id="thumbnail_image" {...register({ required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" {...register({ required: true })} />
                {errors.description && <span>Description is required</span>}
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary">Create Meetup</button>
            </div>
        </form>
    );
}

export default MeetupForm;