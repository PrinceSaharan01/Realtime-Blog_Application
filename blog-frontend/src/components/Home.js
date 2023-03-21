import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import Update from './Update';
import ScrollToBottom from 'react-scroll-to-bottom';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from '../spinner/Spinner.gif' 

const Home = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext)

    const { deleteComment, userComment, verifyComment, posts, sendPost, comments, userData } = context;
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [tag, setTag] = useState('')
    const [status, setStatus] = useState('')
    const [items, setItems] = useState(5);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const authenticate = localStorage.getItem('auth');
        if (!authenticate) {
            navigate('/')
        }
        userData();
        userComment();
        setLoading(true);
    }, [])





    const postSend = (e) => {
        e.preventDefault();
        if (!content || !title || !tag || !status) {
            alert('Fill The Empty Strings')
        }

        else {

            const id = localStorage.getItem('id')

            const data = {
                content: content,
                title: title,
                tag: tag,
                status: status,
                author_id: id
            }

            sendPost(data);

            setContent('');
            setStatus('');
            setTag('');
            setTitle('')
        }
    }

    const fetchMore = () => {

        if (items > posts.length) {
            // setItems((pre)=>pre+10)
            // setItems(items+10);
            // console.log(items);
            setLoading(false)
            

        }
        else {
            setTimeout(() => {
                
                setItems((pre) => pre + 1);
                setLoading(true)
            }, 1000);
        }

    }

    return (

        <>
            <h1>This Is The Home Page</h1>
            <div className='container '>

                <form className='mb-3 '>

                    <div className="form-group mb-3">
                        <input value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="Title"></input>
                    </div>
                    <div className="form-group mb-3">
                        <input value={content} onChange={(e) => setContent(e.target.value)} className="form-control" placeholder="Content"></input>
                    </div>
                    <div className="form-group mb-3">
                        <input value={tag} onChange={(e) => setTag(e.target.value)} className="form-control" placeholder="Tags"></input>
                    </div>
                    <div className="form-group mb-3">
                        <input value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" placeholder="Status:--Pending/Post"></input>
                    </div>

                    <button onClick={postSend} type="submit" className="btn btn-primary">Post</button>
                </form>
            </div>
            <div className='container'>

                <InfiniteScroll
                    dataLength={items}
                    next={fetchMore}
                    hasMore={loading}
                    loader={<img style={{height:'80px'}} src={Spinner}></img>}
                
                >



                    {

                        posts.slice(0, items).map((p) => {

                            const cumm = comments.filter((c) => {
                                return p.id === c.post_id

                            })
                            return {
                                ...p, comments: cumm
                            }
                        })
                            .map((post, k) => {
                                return (

                                    <div key={k} className=' mx-4'>
                                        <div className="card mx-3 my-3" >
                                            <div className="card-body">
                                                <h5 className="card-title">Title:-{post.title}</h5>
                                                <h6>Tag:-{post.tag}</h6>
                                                <p className="card-text">Content:-{post.content}</p>
                                                <p className='card-text'>Status:-{post.status}</p>
                                                <ScrollToBottom className='message-container' >
                                                    {
                                                        post.comments.length > 0 ?

                                                            post?.comments?.map((cm, i) => {
                                                                return (
                                                                    <div className='message' key={i}>
                                                                        <p><b>{cm.author}:</b><i id={cm.status === 'Post' ? "verified" : "pending"}>{cm.content}</i></p> {cm.status === "Post" ? <i onClick={() => deleteComment(cm.id)} className="fa-solid fa-trash"></i> : <div><i onClick={() => verifyComment({ id: cm.id, index: i })} style={{ color: "green" }} className="fa-solid fa-thumbs-up"></i><i onClick={() => deleteComment(cm.id)} className="fa-solid fa-thumbs-down"></i> </div>}
                                                                    </div>

                                                                )
                                                            })
                                                            : <p>No comments...... </p>
                                                    }
                                                </ScrollToBottom>

                                                <Update index={k} post={post}></Update>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }

                </InfiniteScroll>

            </div>
        </>
    )
}

export default Home;