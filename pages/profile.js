import React, { useEffect, useState } from 'react'
import { userAuth } from "../libs/context/userAuthContext"
import NotLoggedIn from '../components/notLoggedIn'
import Image from "next/image"
import Firebase from '../libs/firebase/firebase'
import Loading from '../components/loading'
import { RiFolderUploadLine } from "react-icons/ri";

function Profile() {

    const { authUser, } = userAuth()
    const [profilePic, setProfilePic] = useState("/images/avatar.jpg")
    const [editorMode, setEditorMode] = useState(false)
    const [imageUploaded, setImageUploaded] = useState(null)
    const [fileSelected, setFileSelected] = useState("")
    const [loadingAction, setLoadingAction] = useState(true)
    const [loggedIn, setLoggedIn] = useState(true)



    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoadingAction(false)
                setLoggedIn(true)
                user.photoURL ? setProfilePic(user.photoURL) : setProfilePic("/images/avatar.jpg")
            } 
        });
    }, [])



    const openChangeProfilePicForm = () => {
        setEditorMode(true)
    }

    const handleProfilePicChange = (event) => {
        if (event.target.files[0]) {
            setLoadingAction(true)
            setImageUploaded(event.target.files[0])
            setFileSelected(event.target.files[0].name)
            setLoadingAction(false)
        }
    }


    const changeProfilePic = (event) => {
        event.preventDefault()
        if (confirm("Change Profile Pic?")) {
            setLoadingAction(true)
            let file = imageUploaded
            var storage = Firebase.storage()
            var storageRef = storage.ref()
            var uploadTask = storageRef.child("profilePictures/" + file.name).put(file)

            uploadTask.on(Firebase.storage.TaskEvent.STATE_CHANGED, (snapshot) => {
                var progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100
                console.log(progress);
            }, (error) => {
                window.alert(error)
                throw error
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setProfilePic(url)
                    authUser.updateProfile({
                        photoURL: url
                    }).then(() => {
                        window.alert("Profile Pic changed")
                        setImageUploaded(null)
                        setFileSelected("")
                        setLoadingAction(false)

                    })
                })
            })
            setEditorMode(false)
        }
    }


    const CurrentUserProfile = () => {

        return (
            <>
                <div className="m-2 p-2">
                    <div className="card" className="d-flex flex-column justify-content-center align-items-center">
                        {loadingAction ? <Loading /> : <>
                            <Image
                                src={profilePic}
                                alt="Profile-pic"
                                width={100}
                                height={100} />
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <p>Name: <em>{authUser.displayName}</em></p>
                                <p>Email: <em>{authUser.email}</em></p>
                                <button onClick={openChangeProfilePicForm} className="btn btn-outline-primary btn-sm">Change Profile Picture</button>
                                {editorMode ?
                                    <div >
                                        <form onSubmit={changeProfilePic}>
                                            <hr></hr>
                                            <label className="m-1" for="profile-pic">Click Here to upload {" "} <RiFolderUploadLine /></label>
                                            <input
                                                type="file"
                                                onChange={handleProfilePicChange}
                                                className="d-none"
                                                id="profile-pic" />
                                            <div>
                                                {fileSelected}
                                            </div>
                                            <button type="submit" className="btn btn-sm btn-outline-success">Submit</button>


                                        </form>
                                    </div> : null}
                            </div>
                        </>}

                    </div>

                </div>
            </>
        )
    }

    return (
        <>
            {authUser ? <CurrentUserProfile /> : loggedIn ? <Loading /> : <NotLoggedIn />}
        </>
    )

}


export default Profile
