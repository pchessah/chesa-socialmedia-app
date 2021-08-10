import React from 'react'
import { userAuth } from '../libs/context/userAuthContext';
import { useRouter } from 'next/router';
import { notification } from 'antd';
import { BiLogOut } from "react-icons/bi";

function LogOut() {
    const { signOut } = userAuth()


    const router = useRouter()

    const openNotification = () => {
        const args = {
          message: 'Logged Out',
          description:
            'Goodbye! See you again',
          duration: 0,
          icon: <BiLogOut style={{ color: '#108ee9' }} />,
        };
        notification.open(args);
      };

    const logOut = () => {
        if(confirm("Are you sure you want to sign out?")){
            return signOut().then(() => {
               openNotification()
                router.push("/login")               
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
