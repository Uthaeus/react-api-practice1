import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";

import { AuthContext } from "../store/auth-context";

function Login() {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    function submitHandler(data) {
        fetch("http://localhost:4000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Login failed");
            }
            //navigate("/");
            return response.json();
        })
        .then(data => {
            console.log(data);
            authCtx.initUser(data);
            navigate("/");
        })
        .catch(error => console.log('login error: ', error.message));
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="email">Email</label>
                <input type='text' id="email" {...register("email", { required: true })} />
                {errors?.email && <span>This field is required</span>}

                <label htmlFor="password">Password</label>
                <input type='password' id="password" {...register("password", { required: true })} />
                {errors?.password && <span>This field is required</span>}

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;