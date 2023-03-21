import React, { useContext, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom';
import UserContext from '../context/UserContext';

const Comments = (props) => {

    const context = useContext(UserContext);
    const { emitComment } = context;
    const id = props.id;
    const author = JSON.parse(localStorage.getItem('username'));
    const email = JSON.parse(localStorage.getItem('email'));
    const [comment, SetComment] = useState('');


    const sendComment = () => {
        if (!comment) {
            return false
        }
        else {
            
            const data = {
                post_id: id,
                author: author,
                email: email,
                comment: comment
            }
            emitComment(data)
            SetComment('')
            alert('Comment Post Success!!! Your Comment Will Be Displayed Shortly')
      
        }

    }


    return (
        <>
            

            <div>
                <input onKeyDown={(e)=>{e.key ==='Enter' && sendComment()}}  onChange={(e) => { SetComment(e.target.value) }} value={comment} placeholder='Comment...'></input><i  onClick={sendComment} className="fa-solid fa-paper-plane"></i>

            </div>




        </>
    )
}

export default Comments;