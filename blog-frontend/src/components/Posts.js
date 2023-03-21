import React, { useContext, useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import ScrollToBottom from 'react-scroll-to-bottom';
import UserContext from '../context/UserContext'
import Comments from './Comments';
import Spinner from '../spinner/Spinner.gif'


const Posts = () => {
  const context = useContext(UserContext);
  const { userComment, comments, posts, userData } = context;
  const [items, setItems] = useState(5);
  const [loading, setLoading] = useState(false);





  useEffect(() => {
    userData();
    userComment();
    setLoading(true)

    // return()=>{

    //   userData();
    //   userComment();
    // }
  }, [])


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
        console.log(items);
      }, 1000);
    }

  }


  return (
    <>


      <div className='container'>
        <h1>Posts</h1>
        <div className='container'>

          <InfiniteScroll

            dataLength={items}
            next={fetchMore}
            hasMore={loading}
            loader={<img style={{ height: '80px' }} src={Spinner}></img>}
          >



            {
              posts.filter((post) => post.status === 'Post').slice(0, items).map((p) => {

                const cumm = comments.filter((c) => {
                  return p.id === c.post_id && p.status === c.status

                })
                return {
                  ...p, comments: cumm
                }
              }).map((post, k = 0) => {
                return (
                  <div key={k} className='mx-4'>
                    <div className="card mx-3 my-3" >
                      <div className="card-body">
                        <h5 className="card-title">Title:-{post.title}</h5>
                        <h6>Tag:-{post.tag}</h6>
                        <p className="card-text">Content:-{post.content}</p>
                      </div>


                      <ScrollToBottom className='message-container' >

                        {
                          post.comments.length > 0 ?  // this also do the same thing

                            post?.comments?.map((cm, i) => {  //??refers to the assumption or a possibility to have an array to perform map   
                              return (

                                <p id={cm.status === 'Post' ? "verified" : "pending"} key={i}><b>{cm.author}:</b><i>{cm.content}</i></p>
                              )
                            })
                            : <p>No comments...... </p>
                        }

                      </ScrollToBottom>

                      <Comments id={post.id} ></Comments>


                    </div>

                  </div>

                )
              })


            }

          </InfiniteScroll>
        </div>


      </div>
    </>

  )
}

export default Posts;