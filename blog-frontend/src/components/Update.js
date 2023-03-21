import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

const Update = (props) => {

    const context = useContext(UserContext)
    const {id,content , status} = props.post;
    const k = props.index;
    const { deletePost , updateDB  } = context;
    const [show, setShow] = useState(false);
    const [sat,setSat] = useState('');
    const [val,setVal] = useState('');  

    const update =(e)=>{
        e.preventDefault();
        if(!sat||!val){
            alert('Check Empty Fields')
        }
        else{
            const data = {
                index:k,
                id:id,
                satt:sat,
                vall:val
            }
            setShow(false);
            setSat('');
            setVal('');
            updateDB(data);

        }

    }
    
    return (
        <>
            {!show &&
                <div>
                    <i onClick={() => { deletePost(id) }} className="fa-solid fa-trash"></i>
                    <i onClick={() => setShow(true)} className="fa-solid fa-pen-to-square"></i>
                </div>
            }
            {
                show &&

                <div>
                    <input onChange={(e)=>{setVal(e.target.value)}} value={val} placeholder={`${content}`}></input><br></br>
                    <input onChange={(e)=>{setSat(e.target.value)}} value={sat} placeholder={`${status}`}></input><br></br>

                    {/* <i className="fa-duotone fa-check-double"></i> */}
                    <i onClick={update} className="fa-regular fa-square-check"></i>
                    <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>


                </div>
            }


        </>
    )
}

export default Update