import React from 'react'
import styles from '../styles/Home.module.css'
import Link from "next/link"

function ForgotPassword() {
    return (
        <>
        <div className={styles.signUpForm}>
                <form>
                    <div className="row">
                        <h4>Forgot Password</h4>
                    </div>

                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <input className={styles.signUpFormInput} type="email" placeholder="Enter Email" />
                        </div>
                    </div>
                    <div className={`${styles["inputRow"]} row`}>
                        <div className="col-12">
                            <button className={`${styles["signUpFormBtn"]} btn btn-success`} type="submit"> Reset Password </button>
                        </div>
                    </div>

                    <div className={`${styles["inputRow"]} ${styles["bottomLinks"]} row`}>
                        <div className="col-6">
                        <Link href="/login"><a>Already reset password? Sign In Here</a></Link>
                        </div>
                        <div className="col-6">
                        <Link href="/signup"><a>Don't have an account? Sign Up Here</a></Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
        
    )
}

export default ForgotPassword
