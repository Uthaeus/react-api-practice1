import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useContext } from "react";

import { AuthContext } from "../store/auth-context";

function Signup() {
    const { register, handleSubmit, errors } = useForm();
    const navigate = useNavigate();
    const authCtx = useContext(AuthContext);

    function submitHander(data) {
        console.log(data);
        if (data.password !== data.confirmPassword) {
            return;
        }

        let dataToSend = {
            user: {
                username: data.username,
                email: data.email,
                password: data.password
            }
        };

        fetch('http://localhost:4000/users', {
            method: 'POST',
            body: JSON.stringify(dataToSend),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.ok) {
                    console.log('res:', res);
                    return res.json();
                }
            })
            .then(data => {
                authCtx.initUser(data);
                navigate('/');
            })
            .catch(err => {
                console.log('signup error:', err);
            });

    }

    return (
        <div>
            <h1>Signup</h1>
            
            <form onSubmit={handleSubmit(submitHander)}>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='text' className='form-control' {...register('username', { required: true })} />
                    {errors?.username && <span className='text-danger'>This field is required</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' className='form-control' {...register('email', { required: true })} />
                    {errors?.email && <span className='text-danger'>This field is required</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' className='form-control' {...register('password', { required: true })} />
                    {errors?.password && <span className='text-danger'>This field is required</span>}
                </div>

                <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type='password' className='form-control' {...register('confirmPassword', { required: true })} />
                    {errors?.confirmPassword && <span className='text-danger'>This field is required</span>}
                </div>

                <div className='form-group'>
                    <button type='submit' className='btn btn-primary'>Signup</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;