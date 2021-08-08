import React, { useEffect } from 'react'
import { useRouter } from "next/router"
import { userAuth } from "./libs/context/userAuthContext"
import NotLoggedIn from '../components/notLoggedIn'




function Profile() {
    const { authUser, loading } = userAuth()
    const router = useRouter()


    useEffect(() => {
        if (!loading && !authUser) {
            console.log(authUser);
            window.alert("You are not logged in!")
            router.push("/")
        }

    }, [])

    return (
        <>
            {authUser ? <div>Profile</div> : <NotLoggedIn />}
        </>
    )

}


export default Profile
