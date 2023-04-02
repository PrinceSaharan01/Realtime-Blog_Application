import React, { useEffect, useState } from 'react'
import UserContext from './UserContext'
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { deletePost as deleteAction, createPost, fetchPost, updatePost } from '../redux/posts/postActions';
import { deleteComment as deleteCmnt ,createComment,fetchComment ,approveComment } from '../redux/comments/commentsActions';

function UserState(props) {
  const dispatch = useDispatch();

  const socket = io.connect('http://localhost:7878')

  useEffect(() => {

    const callback = (data) => {

      // setPosts((posts) => [data, ...posts]);
      dispatch(createPost(data))

    };
    socket.on("fetch", callback);

    socket.on('deleted', (id) => {
      //  console.log(deletePost()); 
      dispatch(deleteAction(id));
      // setPosts((posts) => posts.filter((post) => post.id !== id));

    });

    socket.on('updated', (data) => {
      // setPosts((p) => p.map((post) => { return data.id === post.id ? data : post }))
      dispatch(updatePost(data))

    })
    socket.on('verified_comment', (data) => {
      dispatch(approveComment(data))
    })
    socket.on('delete_confirmed', (id) => {
      dispatch(deleteCmnt(id))
    })

    const callback2 = (data) => {
      dispatch(createComment(data))
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
    dispatch(fetchPost(result))



  }
  const userComment = async () => {

    const data = await fetch('http://localhost:7878/data/comments');
    const result = await data.json();
    console.log(result);
    dispatch(fetchComment(result))
    console.log(result);
    // socket.on('comments', (data) => {
    //   setComments(data);
    // })

  }

  const commentData = () => {
    socket.on('comments', (data) => {
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
    <UserContext.Provider value={{ userComment, verifyComment, deleteComment, commentData, emitComment, updateDB, deletePost, userData, joinSocket, sendPost }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState;

//getcomments/1?limint=100&page=2

//1000

//(limint , page )
// list = [....1000] / 10 = 1000 = 0-100 , 100-200