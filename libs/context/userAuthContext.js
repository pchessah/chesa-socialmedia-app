import { createContext, useContext } from 'react'
import userFirebaseAuth from '../firebase/userFirebaseAuth'

const authUserContext = createContext({
    // authUser: null,
    // loading: true,
    // signInWithEmailAndPassword: async () => { },
    // createUserWithEmailAndPassword: async () => { },
    // signOut: async () => { },
    // resetPassword: async () => { },
})

export function UserAuthProvider({ children }) {
    const auth = userFirebaseAuth();
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}
export const userAuth = () => useContext(authUserContext)
