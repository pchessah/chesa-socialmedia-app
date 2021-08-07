import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from "next/link"
import { MdAssignmentInd } from 'react-icons/md';


function HomePage() {
    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.gif}>
                    <Image
                        src="/../public/social.gif"
                        alt="Home Page"
                        width={500}
                        height={500}
                    />

                </div>

                <div className={styles.signUpForm}>
                    <form>
                    <div className="row">
                        <div className="d-flex flex-column justify-content-center align-items-center col">
                            <MdAssignmentInd />
                            <h4>Sign Up</h4>
                        </div>
                    </div>
                        <div className={`${styles["inputRow"]} row`}>
                            <div className="col-6">
                                <input className={styles.signUpFormInput} type="text" placeholder="Enter First Name" />
                            </div>
                            <div className="col-6">
                                <input className={styles.signUpFormInput} type="text" placeholder="Enter Second Name" />
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

            </div>
        </>

    )
}

export default HomePage
