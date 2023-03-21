import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { io } from 'socket.io-client';

function UserState(props) {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  const socket = io.connect('http://localhost:7878')

  useEffect(() => {

    const callback = (data) => {

      setPosts((posts) => [data, ...posts]);

    };
    socket.on("fetch", callback);

    socket.on('deleted', (id) => {
      setPosts((posts) => posts.filter((post) => post.id !== id));
      console.log(`${id} deleted`);
    });

    socket.on('updated', (data) => {
      setPosts((p) => p.map((post) => { return data.id === post.idx ? data : post }))

    })


    socket.on('verified_comment', (data) => {
      setComments((p) => p.map((comment) =>  {return data.id === comment.id ? data : comment} ))
    })
    socket.on('delete_confirmed', (id) => {
      setComments((comments) => comments.filter((coment) => coment.id !== id))
    })

    const callback2 = (data) => {
      setComments((comments) => [...comments, data])
    }

    socket.on('verify', callback2);



    return () => {
      socket.off("fetch", callback);
      socket.off('verify', callback2);
      socket.off('verified_comment');
      socket.off('updated')
    };


  }, [])


  const userData = async () => {

    const data = await fetch('http://localhost:7878/data/posts');
    const result = await data.json();
    setPosts(result)

    // socket.on('user', (data) => {
    //   setPosts(data);
    // })


  }
  const userComment = async () => {

    const data = await fetch('http://localhost:7878/data/comments');
    const result = await data.json();
    setComments(result);
    // socket.on('comments', (data) => {
    //   setComments(data);
    // })

  }

  const commentData = () => {
    socket.on('comments', (data) => {
      setPosts(data);
      console.log(data);
    })
  }

  const joinSocket = (name) => {
    // socket.emit('join_room', name);
  }

  const sendPost = (data) => {
    socket.emit('post', data);
  }
  const deletePost = (id) => {
    socket.emit('delete', id);

  }

  const updateDB = (data) => {
    socket.emit('update', data);

  }


  const emitComment = (data) => {
    socket.emit('on_comment', data)

  }

  const verifyComment = (id) => {
    socket.emit('verify_comment', id)
    // console.log(id);
  }

  const deleteComment = (id) => {
    socket.emit('delete_comment', id)
    // console.log(id);

  }

  return (
    <UserContext.Provider value={{userComment, verifyComment, deleteComment, commentData, emitComment, updateDB, deletePost, userData, posts, comments, joinSocket, sendPost }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;