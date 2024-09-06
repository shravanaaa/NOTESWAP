


import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const Home = ({ isAuth }) => {
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);

    
    if (isAuth && postLists.find((post) => post.id === id)?.author.id === auth.currentUser.uid) {
      await deleteDoc(postDoc);

      setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="homePage container w-50">
      {postLists.map((post) => {
        return (
          <div className="card mb-3" key={post.id}>
            <div className="card-header">
              <h1 className="card-title">{post.title}</h1>
            </div>
            <div className="deletePost">
              {isAuth && post.author.id === auth.currentUser.uid && (
                <button
                  onClick={() => {
                    deletePost(post.id);
                  }}
                >
                  {" "}
                  &#128465;
                </button>
              )}
            </div>
            <div className="card-body">
              <p className="card-text overflow-auto" style={{ maxHeight: "250px" }}>
                {post.postText}
              </p>
            </div>
            {post.author && post.author.name && (
              <div className="card-footer">
                <h3>@{post.author.name}</h3>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Home;

