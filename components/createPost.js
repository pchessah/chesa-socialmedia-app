import React, { useState, useEffect } from 'react'
import styles from "../styles/Home.module.css"
import Firebase from '../libs/firebase/firebase'
import postService from '../libs/services/posts'

function CreatePost() {
    const [post, setPost] = useState()
    const [currentUser, setCurrentUser] = useState()

    const getCurrentTime = () => {
     let currentTime = new Date().toLocaleString()
     return currentTime
    }

    const handleChange = (event) => {
        const postContent = event.target.value
        const tempPost = {
            user: currentUser.displayName,
            post: postContent,
            time: getCurrentTime(),
        }

        setPost(tempPost) 
        console.log(post);
    }

    const sendPost = (post, event) => {
        event.preventDefault();
        return postService.addPost(post)
        
    }

    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) setCurrentUser(user)
        })
    }, [])
    return (
        <>
            <form onSubmit={sendPost} className="d-flex flex-column justify-content-center align-items-center">
                <textarea onChange={handleChange} className={styles.addClass} placeholder="Add new post"></textarea>
                <button type="submit" class="btn m-1 btn-sm btn-outline-success">Add post</button>
            </form>
            <hr></hr>

        </>

    )
}

export default CreatePost
