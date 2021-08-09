import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Signup from './signup';
import Firebase from '../libs/firebase/firebase';
import Feed from './feed';
import Loading from '../components/loading';




function HomePage() {
    const [loggedIn, setLoggedIn] = useState()
    const[loading, setLoading] =useState(true)

    useEffect(() => {
        Firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true)
                setLoading(false)
            } else {
                setLoggedIn(false)
                setLoading(false)
            }
        })
    }, [])

    return (
        <>
             {loading? <Loading/>: loggedIn ?  <Feed /> : <>
                <div className={styles.homeContainer}>
                    <div className={styles.gif}>
                        <Image
                            src="/images/social.gif"
                            alt="Home Page"
                            width={500}
                            height={500}
                        />
                    </div>
                    <Signup />
                </div>
            </>}

        </>


    )
}

export default HomePage
