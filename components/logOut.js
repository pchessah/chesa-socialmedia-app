import React from 'react'
import { userAuth } from '../pages/libs/context/userAuthContext';
import { useRouter } from 'next/router';


function LogOut() {
    const { signOut } = userAuth()

    const router = useRouter()

    const logOut = () => {
        return signOut().then((result) => {
            window.alert("Signed Out")
            router.push("/")
            
        }).catch((err) => {
            window.alert(err)
            
        });
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
