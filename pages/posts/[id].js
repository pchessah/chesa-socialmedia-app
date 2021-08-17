import { useRouter } from "next/router"

const SinglePost = () => {
    const router = useRouter()
    const { id } = router.query

    return(
        <>
            post: {id}
        </>
    )
}