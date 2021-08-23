import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import postService from "../../libs/services/posts"


const SinglePost = () => {
    const router = useRouter()
    const { id } = router.query
    const [currentPost, setCurrentPost] = useState()



    useEffect(() => {
        let post
        postService.dbRef.doc(id).get().then((doc) => {
            post = (doc.data());
            console.log(post);
            setCurrentPost(post)
        })
    }, [])

    return (
        <>
            <div className="singlePostCard card p-3">
                Poster: {currentPost?.user}
                <br></br>
                {currentPost?.post}
                <hr></hr>
                Comments:
                {currentPost?.comments.map((singleComment, index) =>{
                    return (
                    <div key={index}>
                        <div className="commentSection">
                            {singleComment.comment}
                            <br></br>
                            <em>By {singleComment.commenter} at {singleComment.time}</em>
                        </div>
                    </div>)
                })}

            </div>
        </>
    )
}

export default SinglePost