import React from 'react'
import Link from "next/link"

function NotLoggedIn() {
    return (
        <>
        <div className="card m-3 p-3">
            <h2>Not Logged In</h2>
            <Link href="/login"><a className="btn btn-primary">Log In Here</a></Link>
        </div>
        </>
        
    )
}

export default NotLoggedIn
