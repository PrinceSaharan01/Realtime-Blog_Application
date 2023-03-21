import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Guest = () => {

  const context = useContext(UserContext)
  const { joinSocket } = context;

  const [user, setuser] = useState("");
  const [mail, setmail] = useState('');
  const navigate = useNavigate()

  const guestLogin = (e) => {


    
    e.preventDefault();
    if (!user || !mail) {
      console.log("Enter Valid Details");
    }
    else {

      try {
        console.log(user, mail);
        joinSocket(user)
        setmail('');
        setuser('')
        localStorage.setItem("username", JSON.stringify(user));
        localStorage.setItem("email", JSON.stringify(mail));
        navigate('/posts')
      } catch (err) {
        console.log(err.message);
      }


    }
  }
  return (
    <>

      <form className='container my-3'>
        <h1>Guest Login</h1>

        <div className="form-group mb-3">
          <input value={user} onChange={(e) => { setuser(e.target.value) }} className="form-control" placeholder="Username"></input>
        </div>
        <div className="form-group mb-3">
          <input type='email' value={mail} onChange={(e) => setmail(e.target.value)} className="form-control" placeholder="Email"></input>
        </div>

        <button onClick={guestLogin} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default Guest