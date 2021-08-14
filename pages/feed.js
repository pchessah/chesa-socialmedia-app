import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Loading from '../components/loading'
import { userAuth } from '../libs/context/userAuthContext'
import Firebase from '../libs/firebase/firebase'
import Image from "next/image"
import LogOut from '../components/logOut'
import CreatePost from '../components/createPost'

function Feed() {

    const router = useRouter()
    const { authUser } = userAuth()
    const [loggedIn, setLoggedIn] = useState()
    const [loading, setLoading] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState(authUser)

    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
                setLoading(false)
                setLoggedInUser(user)
            } else {
                window.alert("Not Logged In")
                setLoggedIn(false)
                router.push("/")
            }
        })
    }, [])

    useEffect(() => {
       return ()=>{
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
                setLoading(false)
                setLoggedInUser(user)
            } else {
                window.alert("Not Logged In")
                setLoggedIn(false)
                router.push("/")
            }
        })

       } 
    }, [loggedIn])


    return (
        <>
            {loading ? <Loading /> :
                <>
                    <div className="p-2 d-flex flex-row row-wrap justify-content-between">
                        <Link  href="/profile">
                        <div className="p-2 m-2">
                            <Image
                                src={authUser.photoURL}
                                alt="Profile-pic"
                                width={50}
                                height={50} />
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p>Name: <em>{authUser.displayName}</em></p>
                            </div>
                        </div>
                        </Link>

                        <div className="card m-2 p-2 d-flex flex-fill flex-wrap row justify-content-center align-items-center">
                            <div className="m-1 col-12">
                                <CreatePost/>
                            </div>
                            <div className="m-1 col-12">
                                Post
                            </div>
                            <div className="m-1 col-12">
                                Post
                            </div>
                            <div className="m-1 col-12">
                                Post
                            </div>
                        </div>

                        <div className="m-2 p-2">
                            <LogOut/>
                        </div>
                       
                    </div>
                </>}
        </>

    )
}

export default Feed
