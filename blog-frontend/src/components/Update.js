import React, { useContext, useState } from 'react'
import UserContext from '../context/UserContext'

const Update = (props) => {

    const context = useContext(UserContext)
    const {id,content , status} = props.post;
    const k = props.index;
    const { deletePost , updateDB  } = context;
    const [show, setShow] = useState(false);
    const [sat,setSat] = useState('Post');
    const [val,setVal] = useState(content);  

    const update =(e)=>{
        e.preventDefault();
        console.log(sat);
        console.log(val);
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
            setSat('Post')
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

                <div >
                    <input className='form-control' onChange={(e)=>{setVal(e.target.value)}} value={val} placeholder={`${content}`}></input><br></br>
                    {/* <input onChange={(e)=>{setSat(e.target.value)}} value={sat} placeholder={`${status}`}></input><br></br> */}
                    <div className='form-group mb-4'>
                       

                        <select  className='form-control' onChange={(e)=>{setSat(e.target.value)}}>
                            <option value='Post'>Post</option>
                            <option value='Pending'>Pending</option>
                            <option value='Archive'>Archive</option>

                        </select>
                        
                    </div>

                    {/* <i className="fa-duotone fa-check-double"></i> */}
                    <i onClick={update} className="fa-regular fa-square-check"></i>
                    <i onClick={() => setShow(false)} className="fa-solid fa-xmark"></i>


                </div>
            }


        </>
    )
}

export default Update