import firebase from "../firebase/firebase"

const db = firebase.firestore().collection("/posts")

const addPost = (post) => {
    return db.add(post)
}

const getAllPosts = () => db.get()

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