import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Signup from './signup';




function HomePage() {
    return (
        <>
            <div className={styles.homeContainer}>
                <div className={styles.gif}>
                    <Image
                        src="/images/social.gif"
                        alt="Home Page"
                        width={500}
                        height={500}
                    />
                </div>

                <Signup/>

            </div>
        </>

    )
}

export default HomePage
