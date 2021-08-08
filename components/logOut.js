import React, { useState } from 'react'
import { userAuth } from '../pages/libs/context/userAuthContext';
import { useRouter } from 'next/router';
import { Alert } from "reactstrap"


function LogOut() {
    const { signOut, authUser } = userAuth()
    const[alert, setAlert] = useState(false)

    const router = useRouter()

    const logOut = () => {
        if(confirm("Are you sure you want to sign out?")){
            return signOut().then((result) => {
                window.alert("Signed Out")
                router.push("/")
                
            }).catch((err) => {
                window.alert(err)                
            });

        }
       
    }
    return (
        <>
        <button onClick={logOut} className="btn btn-sm btn-outline-danger">
            Log Out
        </button>
        </>
        
    )
}

export default LogOut
