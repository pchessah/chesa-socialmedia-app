import React, {useEffect} from 'react'
import { useRouter } from "next/router"
import { userAuth } from "./libs/context/userAuthContext"

const LoggedIn = () => {
    const { authUser, loading } = userAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!loading && !authUser){
            window.alert("You are not logged in!")
            router.push("/")
        }
       
    }, [authUser, loading])
}

function Profile() {
    return (
        <>
        Profile
        </>
    )
}

export default Profile
