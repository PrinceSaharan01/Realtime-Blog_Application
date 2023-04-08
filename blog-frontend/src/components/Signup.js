import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUpSchema } from '../schema';



function Signup() {
    const navigate = useNavigate();
    useEffect(() => {
        const authenticate = localStorage.getItem('auth')
        const uname = localStorage.getItem('username')
        const mail = localStorage.getItem('email')
        if (authenticate && uname) {
            navigate('/home')
        }
        else if(uname&&mail){
            navigate('/posts')
        }
    })

    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: ""
    }

    const { values, errors, handleChange, touched, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values) => {
            // console.log(values);
            signin(values);

        }
    })

    const signin = async (values) => {
        const { name, username, email, password } = values;
        // console.log(name, username, email, password);

        if (!name || !username || !email || !password) {

            alert("Fill The Empty Values");
        }
        else {
            try {

                const result = await fetch('http://localhost:7878/user/signup', {
                    method: "post",
                    body: JSON.stringify({ name, username, email, password }),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                const data = await result.json();
                if (data.auth) {
                    // navigate('/home')
                    // localStorage.setItem("username", JSON.stringify(username))
                    localStorage.setItem("auth", JSON.stringify(data.auth));
                    localStorage.setItem('username',JSON.stringify(data.username))
                    localStorage.setItem('id',JSON.stringify(data.id));
                } else {
                    alert("Credentials not FulFillled")
                }


            } catch (err) {
                console.log(err.messge);
                navigate('/')

            }

        }
    }


    return (

        <>
            <div className='container'>
                <h1>SignUp Page</h1>
                <form onSubmit={handleSubmit} className='mb-3'>
                    <div className="form-group mb-3">
                        <input value={values.name} name="name" onChange={handleChange} className="form-control" placeholder="Name"></input>{errors.name && touched ? <p>{errors.name}</p> : null}

                    </div>
                    <div className="form-group mb-3">
                        <input value={values.email} name="email" onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>{errors.email && touched ? <p>{errors.email}</p> : null}
                    </div>
                    <div className="form-group mb-3">
                        <input value={values.username} name="username" onChange={handleChange} className="form-control" placeholder="Username"></input>{errors.username && touched ? <p>{errors.username}</p> : null}
                    </div>
                    <div className="form-group mb-3">
                        <input value={values.password} name="password" onChange={handleChange} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>{errors.password && touched ? <p>{errors.password}</p> : null}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Signup;