import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

import { AuthContext } from "../store/auth-context";

function MeetupForm({ meetup }) {
    const navigate = useNavigate();
    const { register, handleSubmit, errors, reset } = useForm();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (meetup) {
            reset({
                title: meetup.title,
                location: meetup.location,
                time: meetup.time,
                date: meetup.date,
                description: meetup.description,
                main_image: meetup.main_image,
                thumb_image: meetup.thumb_image
            });
        }
    }, [meetup, reset]);

    function buildForm(data) {
        const formData = new FormData();

        authCtx.isLoggedIn && formData.append("meetup[user_id]", authCtx.user.id);
        formData.append("meetup[title]", data.title);
        formData.append("meetup[location]", data.location);
        formData.append("meetup[time]", data.time);
        formData.append("meetup[date]", data.date);
        formData.append("meetup[description]", data.description);
        formData.append("meetup[main_image]", data.main_image[0]);
        formData.append("meetup[thumb_image]", data.thumb_image[0]);

        return formData;
    }


    function submitHandler(data) {
        console.log(data);


        fetch("http://localhost:4000/meetups", {
            method: "POST",
            body: buildForm(data)
        })
            .then((response) => {
                if (response.ok) {
                    navigate("/meetups");
                    return response.json();
                }
            })
            .catch((error) => {
                console.log("meetup create error", error);
            });
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-group mb-2">
                <label htmlFor="title">Title</label>
                <input className="form-control" type="text" name="title" id="title" {...register("title", { required: true })} />
                {errors?.title && <span>Title is required</span>}
            </div>

            <div className="form-group mb-2">
                <label htmlFor="location">Location</label>
                <input className="form-control" type="text" name="location" id="location" {...register("location", { required: true })} />
                {errors?.location && <span>Location is required</span>}
            </div>

            <div className="form-group mb-2">
                <label htmlFor="time">Time</label>
                <input className="form-control" type="time" name="time" id="time" {...register("time", { required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="date">Date</label>
                <input className="form-control" type="date" name="date" id="date" {...register("date", { required: true })} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="main_image">Main Image</label>
                <input className="form-control" type="file" name="main_image" id="main_image" {...register("main_image")} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="thumb_image">Thumbnail Image</label>
                <input className="form-control" type="file" name="thumb_image" id="thumb_image" {...register("thumb_image")} />
            </div>

            <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" name="description" id="description" {...register("description", { required: true })} />
                {errors?.description && <span>Description is required</span>}
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-primary">Create Meetup</button>
            </div>
        </form>
    );
}

export default MeetupForm;