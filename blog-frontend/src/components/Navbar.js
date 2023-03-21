import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }

    const authenticate = localStorage.getItem('auth');


    const username = localStorage.getItem("username");
    const parsed = JSON.parse(username);
    // console.log(parsed);


    return (
        <>

            <div className='navibar'>

                <i className="fa-brands fa-instagram"></i>

                {!username &&
                    <div>
                        <Link className='auth' to='/'>SignUp</Link>
                        <Link className='auth' to='/login'>Login</Link>

                        <Link className='guest' to='/guest'>GuestLogin</Link>
                    </div>
                }
                {username &&
                    <div>

                        <i onClick={logout} className="fa-solid fa-right-from-bracket">{parsed}</i>
                    </div>
                }

            </div>




        </>
    )
}

export default Navbar