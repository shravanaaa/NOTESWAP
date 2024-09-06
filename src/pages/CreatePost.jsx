import React,{useState, useEffect} from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ isAuth }) => {
    const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");

  const postsCollectionRef = collection(db, "posts");
  let navigate = useNavigate();
  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      postText,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/");
  };

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="container w-50" style={{paddingTop:"100px" }}>
      <div className="createPost mt-5">
        <div className="cpContainer">
          <h1>Create Post</h1>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="form-control"
              placeholder="Title..."
              onChange={(event) => {
              setTitle(event.target.value);
              }}
            />
          </div>
          <div className="form-group">
            <label>Post:</label>
            <textarea
              className="form-control"
              placeholder="Post..."
              onChange={(event) => {
              setPostText(event.target.value);
              }}
            />
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={createPost}
          >
            Submit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
