import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import "./post.css";
function PostPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patentIdd = searchParams.get("id");
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const [applications, setApplications] = useState([]);
  const [comments, setComments] = useState([]);
  const [commentValue, setCommentValue] = useState("");
  const [userIdd, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [values, setValues] = useState({
    patentId: "",
    commentBy: "",
    commentText: "",
  });
  const handleCommentInputChange = (event) => {
    setCommentValue(event.target.value);
  };
  const fetchApplications = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/patents",
        {},
        {
          withCredentials: true,
        }
      );
      const selectedPatent = data.filter((item) => item._id === patentIdd);
      console.log(data);
      setApplications(selectedPatent);
    } catch (err) {
      console.error("FETCH ERROR: ", err);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/getComments?patentId=${patentIdd}`,

        {
          withCredentials: true,
        }
      );
      console.log(data);
      setComments(data);
    } catch (err) {
      console.error("FETCH ERROR: ", err);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchApplications();
  }, []);

  useEffect(() => {
    const decodeJWT = () => {
      if (cookies.jwt) {
        const decoded = jwtDecode(cookies.jwt);
        // console.log(decoded.userId);
        setUserId(decoded.userId);
        setUserName(decoded.username);
      }
    };
    decodeJWT();
  }, [cookies.jwt]);

  const commentPost = async (e) => {
    e.preventDefault();
    try {
      const comm = await axios.post(
        "http://localhost:4000/postParentComment",
        {
          patentId: patentIdd,
          commentBy: userIdd,
          commentText: commentValue,
          userName: userName,
        },
        {
          withCredentials: true,
        }
      );
      fetchComments();
    } catch (err) {
      console.error("commentPost ERROR: ", err);
    }
  };
  const fetchComment = async () => {
    try {
      const comm = await axios.get(
        "http://localhost:4000/getComments",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (err) {
      console.error("commentPost ERROR: ", err);
    }
  };

  return (
    <>
      <div className="mainpostdappa">
        <div className="post-box">
          <div className="another-box">
            {applications.map((item, index) => {
              return (
                <>
                  <div className="selectedTitle">{item.title}</div>
                  <div className="selectedAbstract">
                    Abstract: {item.abstract}
                  </div>
                  <div className="selectedDescription">
                    Description: {item.description}
                  </div>

                  <div className="selectedInventors">Inventors: {item.Inventor}</div>
                </>
              );
            })}
          </div>
          <div className="commentbox">
           <div className="commenttitle">Comments</div>
            <form onSubmit={(e) => commentPost(e)}>
              <input
                placeholder="Say something..."
                type="text"
                name="text"
                value={commentValue}
                onChange={handleCommentInputChange}
              />
              <button type="submit" id="commentbutton" >submit</button>
            </form>
            
          {comments.map((comment) => (
            <div>
              {comment.userName} <>:</>
              {comment.commentText}
            </div>
          ))}
          </div>
          
        </div>
      </div>
    </>
  );
}

export default PostPage;
