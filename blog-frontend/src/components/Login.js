import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = localStorage.getItem('auth');
        // const user = localStorage.getItem('username')
        if (authenticate) {
            navigate('/home')

        }
    })

    const login = async (e) => {
        e.preventDefault();

        if (!email || !password) {

            alert("Fill The Empty Values");
        }
        else {
            // console.log(email, password);
            try {
                let result = await fetch('http://localhost:7878/user/login', {
                    method: 'post',
                    body: JSON.stringify({ email, password }),
                    headers: {
                        "content-type": "application/json"
                    }
                })
                let data = await result.json();
                // console.log(data);

                if (data.auth) {
                    localStorage.setItem('auth', JSON.stringify(data.auth));
                    localStorage.setItem('username', JSON.stringify(data.username));
                    localStorage.setItem('id', JSON.stringify(data.id));
                    setemail('');
                    setpassword('');
                    navigate('/home')


                } else {
                    alert("Please Check The Login Details")
                }

                // ref.current.reset();


            } catch (err) {
                alert(err.message)

            }
        }


    }


    return (

        <>
            <div className='container'>
                <h1>Login Page</h1>
                <form className='mb-3'>

                    <div className="form-group mb-3">
                        <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                    </div>
                    <div className="form-group mb-3">
                        <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"></input>
                    </div>

                    <button onClick={login} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Login;