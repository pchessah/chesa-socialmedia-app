import firebase from "../firebase/firebase"

const db = firebase.firestore().collection("/posts")

const addPost = (post) => {
    debugger;
    return db.add(post)
}

const getAllPosts = () => {
    return db
}

const editPost = (id, value) => db.doc(id).update(value)

const deletePost = (id) => db.doc(id).delete()



const postService = {
    db,
    addPost,
    getAllPosts,
    editPost,
    deletePost,
}


export default postService