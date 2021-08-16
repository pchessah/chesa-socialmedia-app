import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../components/loading";
import { userAuth } from "../libs/context/userAuthContext";
import Firebase from "../libs/firebase/firebase";
import Image from "next/image";
import LogOut from "../components/logOut";
import CreatePost from "./createPost";
import postService from "../libs/services/posts";

function Feed() {
  const defaultFeedPosts = [];
  const router = useRouter();
  const { authUser } = userAuth();
  const [feedPosts, setFeedPosts] = useState(defaultFeedPosts);
  const [loggedIn, setLoggedIn] = useState();
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(authUser);

  const onFeedChange = (feed) => {
    let tempFeedPosts = [];

    feed.docs.forEach((singlePost) => {
      let data = singlePost.data();
      tempFeedPosts = [
        ...tempFeedPosts,
        {
          user: data.user,
          post: data.post,
          time: data.time,
        },
      ];
    });

    setFeedPosts((prevFeedPosts) => [...prevFeedPosts, ...tempFeedPosts]);
    console.log(feedPosts);
  };

  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setLoading(false);
        setLoggedInUser(user);
      } else {
        window.alert("Not Logged In");
        setLoggedIn(false);
        router.push("/");
      }
    });

       const unsubscribe =  postService.getAllPosts().onSnapshot(onFeedChange)
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
          window.alert("Not Logged In");
          setLoggedIn(false);
          router.push("/");
        }
      });
    };
  }, [loggedIn]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="p-2 d-flex flex-row row-wrap justify-content-between">
            <Link href="/profile">
              <div className="p-2 m-2">
                <Image
                  src={authUser.photoURL}
                  alt="Profile-pic"
                  width={50}
                  height={50}
                />
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <p>
                    Name: <em>{authUser.displayName}</em>
                  </p>
                </div>
              </div>
            </Link>

            <div className="card m-2 p-2 d-flex flex-fill flex-wrap row justify-content-center align-items-center">
              <div className="m-1 col-12">
                <CreatePost />
              </div>
              {feedPosts &&
                feedPosts.map((singlePost, i) => {
                  return (
                    <div key={i} className="m-1 col-12">
                      Poster: {singlePost.user}
                      <br></br>
                      {singlePost.post}
                      <br></br>
                      <em>{singlePost.time}</em>
                    </div>
                  );
                })}
            </div>

            <div className="m-2 p-2">
              <LogOut />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Feed;
