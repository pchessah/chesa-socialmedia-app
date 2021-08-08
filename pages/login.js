import React, { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { GoSignIn } from 'react-icons/go';
import { useRouter } from "next/router"
import { userAuth } from "./libs/context/userAuthContext"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const router = useRouter()
    const {signInWithEmailAndPassword} = userAuth()

    const onLogIn = (event) => {
        event.preventDefault()
        setError(null)
        signInWithEmailAndPassword(email, password).then((authUser) => {
            router.push("/profile")
        }).catch((error) => {
            setError(error.message)
        })
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    return (
        <>
            <div className={styles.signUpForm}>
                <form onSubmit={onLogIn}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center col">
                            <GoSignIn />
                            <h4>Log In</h4>
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
                                value={password}
                                onChange={handlePasswordChange} />
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <button className={`${styles["signUpFormBtn"]} btn btn-success`} type="submit"> Log In </button>
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} ${styles["bottomLinks"]} row`}>
                        <div className="col-6">
                            <Link href="/signup"><a>Don't have an account? Sign Up Here</a></Link>
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

export default Login
