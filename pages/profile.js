import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { userAuth } from "../libs/context/userAuthContext"
import NotLoggedIn from '../components/notLoggedIn'
import styles from "../styles/Profile.module.css"
import Image from "next/image"
import Firebase from '../libs/firebase/firebase'






function Profile() {

    const { authUser, loading } = userAuth()
    const [profilePic, setProfilePic] = useState("/../public/avatar.jpg")
    const [editorMode, setEditorMode] = useState(false)
    const [progress, setProgress] = useState(0)
    const [imageUploaded, setImageUploaded] = useState(null)

    const router = useRouter()

    useEffect(() => {
        if (!loading && !authUser) {
            window.alert("You are not logged in!")
            router.push("/")
        } else {
            (authUser.photoURL ? setProfilePic(authUser.photoURL) : setProfilePic("/../public/avatar.jpg"))
        }
    }, [])

    const openChangeProfilePicForm = (event) => {
        setEditorMode(true)
    }

    const handleProfilePicChange = (event) => {
        if (event.target.files[0]) {
            console.log(event.target.files[0]);
            setImageUploaded(event.target.files[0])
            let file = imageUploaded
            var storage = Firebase.storage()
            var storageRef = storage.ref()
            var uploadTask = storageRef.child("profilePictures/" + file.name).put(file)

            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
                setProgress(progress)
            }, (error) => {
                window.alert(error)
                throw error
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setProfilePic(url)
                    
                   
                })
            })
        }
    }


    const changeProfilePic = (event) => {
        event.preventDefault()
        if (confirm("Change Profile Pic?")) {
            // const user = Firebase.auth().currentUser().displayName
            authUser.updateProfile({
                photoURL: profilePic
            })
        
            window.alert("Profile Pic changed")
            setEditorMode(false)
        }
    }


    const CurrentUserProfile = () => {
        return (
            <>
                <div className="m-2 p-2">
                    <div className={styles.profilePicCard}>
                        <Image
                            src={profilePic}
                            alt="Profile-pic"
                            width={100}
                            height={100} />
                        <div>
                            <p>Name: <em>{authUser.displayName}</em></p>
                            <p>Email: <em>{authUser.email}</em></p>
                            <button onClick={openChangeProfilePicForm} className="btn btn-outline-primary btn-sm">Change Profile Picture</button>
                            {editorMode ? <form onSubmit={changeProfilePic}>
                                <input type="file" onChange={handleProfilePicChange} placeholder="choose pic" className="p-1 m-1" />
                                <button type="submit" className="btn btn-sm btn-outline-success">Submit</button>
                                {progress}
                            </form> : null}
                        </div>
                    </div>

                </div>
            </>
        )
    }

    return (
        <>
            {authUser ? <CurrentUserProfile /> : <NotLoggedIn />}
        </>
    )

}


export default Profile
