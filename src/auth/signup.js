import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Signup() {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();

    function submitHandler(data) {
        if (data.password !== data.password_confirmation) {
            console.log("Password and password confirmation do not match");
            return;
        }
        let dataToSend = {
            user: {
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation
            }
        };
        fetch("http://localhost:4000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Signup failed");
            }
            navigate("/");
            return response.json();
        })
        .catch(error => console.log('signup error: ', error));
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="email">Email</label>
                <input id="email" {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}

                <label htmlFor="password">Password</label>
                <input id="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}

                <label htmlFor="password_confirmation">Password Confirmation</label>
                <input id="password_confirmation" {...register("password_confirmation", { required: true })} />
                {errors.password_confirmation && <span>This field is required</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Signup;