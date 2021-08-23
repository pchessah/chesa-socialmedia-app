import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/loading";
import { userAuth } from "../libs/context/userAuthContext";
import Firebase from "../libs/firebase/firebase";
import CreatePost from "./createPost";
import postService from "../libs/services/posts";
import styles from "../styles/Feed.module.css";
import { AiOutlineComment } from "react-icons/ai";

function Feed() {
  const defaultFeedPosts = [];
  const router = useRouter();
  const { authUser } = userAuth();
  const [feedPosts, setFeedPosts] = useState(defaultFeedPosts);
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(authUser);
  const [profilePic, setProfilePic] = useState("/images/avatar.jpg");
  const [commentMode, setCommentMode] = useState(false);
  const [comment, setComment] = useState();


  const onFeedChange = (feed) => {
    setLoading(true)
    let tempFeedPosts = [];
    feed.docs.forEach((singlePost) => {
      let id = singlePost.id;
      let data = singlePost.data();
      tempFeedPosts = [
        ...tempFeedPosts,
        {
          user: data.user,
          post: data.post,
          time: data.time,
          comments: data.comments,
          id: id,
          likes: data.likes,
        },
      ];
    });

    setFeedPosts(tempFeedPosts);
    setLoading(false)
  };

  const getCurrentTime = () => {
    let currentTime = new Date().toLocaleString();
    return currentTime;
  };

  const handleCommentChange = (id) => {
    const commentContent = event.target.value;
    const tempComment = {
      commenter: loggedInUser.displayName,
      comment: commentContent,
      time: getCurrentTime(),
      timeStamp: new Date().getTime(),
      postID: id,
    };
    setComment(tempComment);
  };

  const handleCommentMode = () => {
    setCommentMode(!commentMode);
  };

  const submitComment = (e) => {
    e.preventDefault();
    let tempCommentsPost = [];

    let postDocRef = postService.dbRef.doc(comment.postID);

    const doc = postDocRef.get();

    doc.then((item) => {
      let posts = item.data().comments;
      tempCommentsPost = [...tempCommentsPost, ...posts, comment];
    })
      .then(() => {
        postService
          .editPost(comment.postID, { comments: tempCommentsPost })
          .then(() => {
            alert("Comment added");
          });
      });

    setCommentMode(!commentMode);
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
        setLoggedInUser(user);
        user.photoURL
          ? setProfilePic(user.photoURL)
          : setProfilePic("/images/avatar.jpg");
      } else {
        setLoggedIn(false);
      }
    });

    const unsubscribe = postService
      .getAllPosts()
      .orderBy("timeStamp", "desc")
      .onSnapshot(onFeedChange);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    return () => {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          setLoggedIn(true);
          setLoading(false);
          setLoggedInUser(user);
        } else {
          setLoggedIn(false);
        }
      });
    };
  }, [loggedIn]);

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-2 feed-holder">
            <div className="m-2 p-2 d-flex flex-wrap row justify-content-center align-items-center">
              <div className="m-1 col-10">
                <CreatePost />
              </div>
              {feedPosts &&
                feedPosts.map((singlePost, i) => {
                  return (
                    <div key={i} className="m-1 col-10">
                      Poster: {singlePost.user}
                      <br></br>
                      {singlePost.post}
                      <br></br>
                      <div className={styles.commentRow}>
                        <em className="m-3">{singlePost.time}</em>
                        <div
                          className={styles.addCommentBtn}
                          onClick={handleCommentMode}
                        >
                          Add comment
                        </div>

                        <div className="m-3">
                          <Link as={`posts/${singlePost.id}`} href="posts/[id]">
                            <div>
                              <AiOutlineComment />
                              <span>{singlePost.comments?.length}</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                      {commentMode ? (
                        <>
                          <form
                            className={styles.addCommentForm}
                            onSubmit={submitComment}
                          >
                            <textarea
                              onChange={() =>
                                handleCommentChange(singlePost.id)
                              }
                              id="comment-field"
                            />
                            <button
                              type="submit"
                              className="btn btn-sm btn-outline-success"
                            >
                              Submit Comment
                            </button>
                          </form>
                        </>
                      ) : null}
                      <hr></hr>
                    </div>
                  );
                })}{" "}
            </div>
          </div>
        </>
      )}{" "}
    </>
  );
}

export default Feed;
