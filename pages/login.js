import React from 'react'
import styles from '../styles/Home.module.css'
import Link from "next/link"
import { GoSignIn } from 'react-icons/go';

function Login() {
    return (
        <>
            <div className={styles.signUpForm}>
                <form>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center col">
                            <GoSignIn />
                            <h4>Log In</h4>
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input className={styles.signUpFormInput} type="email" placeholder="Enter Email" />
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input className={styles.signUpFormInput} type="password" placeholder="Enter Password" />
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
