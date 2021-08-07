import React from 'react'
import styles from '../styles/Home.module.css'
import Image from 'next/image'
import Link from "next/link"
import { MdAssignmentInd } from 'react-icons/md';
import Signup from './signup';


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

                <Signup/>

            </div>
        </>

    )
}

export default HomePage
