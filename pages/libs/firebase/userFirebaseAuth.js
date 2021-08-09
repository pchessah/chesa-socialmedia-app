import { useState, useEffect } from 'react'
import Firebase from './firebase'


function userFirebaseAuth() {

    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

   
    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return
        }

        const user = Firebase.auth().currentUser

        setLoading(true)
        setAuthUser(user)
        setLoading(false)
    }

    useEffect(() => {
        const unsubscribe = Firebase.auth().onAuthStateChanged(authStateChanged)
        return () => unsubscribe();
    }, [])

    const clear = () =>{
        setAuthUser(null)
        setLoading(true)
    }

    const signInWithEmailAndPassword = (email, password) => {
        return Firebase.auth().signInWithEmailAndPassword(email, password)
    }

    const createUserWithEmailAndPassword = (email, password) => {
        return Firebase.auth().createUserWithEmailAndPassword(email, password)
    }

    const signOut = () => {
        return Firebase.auth().signOut().then(clear)
    }

    const resetPassword = (email) => {
        return Firebase.auth().sendPasswordResetEmail(email)
    }

    return {
        authUser,
        loading,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
        signOut,
        resetPassword,
    
    };


}

export default userFirebaseAuth
