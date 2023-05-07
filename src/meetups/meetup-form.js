import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function MeetupForm({ meetup = {}}) {
    const navigate = useNavigate();
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

    function buildForm(data) {
        const formData = new FormData();

        formData.append("meetup[title]", data.title);
        formData.append("meetup[location]", data.location);
        formData.append("meetup[time]", data.time);
        formData.append("meetup[date]", data.date);
        formData.append("meetup[description]", data.description);
        formData.append("meetup[main_image]", data.main_image[0]);
        formData.append("meetup[thumbnail_image]", data.thumbnail_image[0]);

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
                <label htmlFor="thumbnail_image">Thumbnail Image</label>
                <input className="form-control" type="file" name="thumbnail_image" id="thumbnail_image" {...register("thumbnail_image")} />
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