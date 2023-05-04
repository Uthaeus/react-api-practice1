import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

function Login() {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();

    function submitHandler(data) {
        let dataToSend = {
            user: {
                email: data.email,
                password: data.password
            }
        };
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            navigate("/");
            return response.json();
        })
        .catch(error => console.log('login error: ', error));
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="email">Email</label>
                <input id="email" {...register("email", { required: true })} />
                {errors.email && <span>This field is required</span>}

                <label htmlFor="password">Password</label>
                <input id="password" {...register("password", { required: true })} />
                {errors.password && <span>This field is required</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;