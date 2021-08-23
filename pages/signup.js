import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { MdAssignmentInd } from 'react-icons/md';
import { useRouter } from "next/router"
import { userAuth } from '../libs/context/userAuthContext';
import { Alert } from "reactstrap"
import Firebase from '../libs/firebase/firebase';


function Signup() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [passwordOne, setPasswordOne] = useState("")
    const [passwordTwo, setPasswordTwo] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter()

    const { createUserWithEmailAndPassword } = userAuth()

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleSecondNameChange = (event) => {
        setSecondName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordOneChange = (event) => {
        setPasswordOne(event.target.value)
    }

    const handlePasswordTwoChange = (event) => {
        setPasswordTwo(event.target.value)
    }




    const onSignUp = (event) => {
        event.preventDefault()
        setError(null)
        if (passwordOne === passwordTwo) {
            createUserWithEmailAndPassword(email, passwordOne).then((authUser) => {
                let user = Firebase.auth().currentUser
                let userName =  `${firstName} ${secondName}`

                userName.charAt(0).toUpperCase() + userName.slice(1)
                user.updateProfile({                  
                    displayName: userName
                })
            }).then(()=>{
                window.alert("User Created, now log in")
                router.push("/login")
            }).catch((error) => {
                setError(error.message)
            })
        } else {
            setError("Passwords do not match")
        }
    }


    return (
        <>
            <div className={styles.signUpForm}>
                <form onSubmit={onSignUp} >
                    {error && <Alert color="danger">{error}</Alert>}
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center col">
                            <MdAssignmentInd />
                            <h4>Sign Up</h4>
                        </div>
                    </div>
                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-6">
                            <input
                                className={styles.signUpFormInput}
                                type="text"
                                placeholder="Enter First Name"
                                value={firstName}
                                onChange={handleFirstNameChange} />
                        </div>
                        <div className="col-6">
                            <input
                                className={styles.signUpFormInput}
                                type="text"
                                placeholder="Enter Second Name"
                                value={secondName}
                                onChange={handleSecondNameChange} />
                        </div>
                    </div>
                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input
                                className={styles.signUpFormInput}
                                type="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange={handleEmailChange} />                                
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input
                                className={styles.signUpFormInput}
                                type="password"
                                placeholder="Enter Password"
                                value={passwordOne}
                                onChange={handlePasswordOneChange} />
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input
                                className={styles.signUpFormInput}
                                type="password"
                                placeholder="Confirm Password"
                                value={passwordTwo}
                                onChange={handlePasswordTwoChange} />
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <button className={`${styles["signUpFormBtn"]} btn btn-success`} type="submit"> Sign Up </button>
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} ${styles["bottomLinks"]} row`}>
                        <div className="col-6">
                            <Link href="/login"><a>Already have an account? Sign In Here</a></Link>
                        </div>
                        <div className="col-6">
                            <Link href="/forgotPassword"><a>Forgot Password?</a></Link>
                        </div>
                    </div>
                </form>
            </div>
        </>

    )
}

export default Signup
