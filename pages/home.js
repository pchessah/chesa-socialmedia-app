import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

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
                            <div className="col-6">
                                <input type="text" placeholder="Enter First Name"/>
                            </div>
                            <div className="col-6">
                                <input type="text" placeholder="Enter Second Name"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <input type="email" placeholder="Enter Email"/>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12">
                                <input type="password" placeholder="Enter Password"/>
                            </div>
                        </div>
                    </form>

                </div>

            </div>
        </>

    )
}

export default HomePage
