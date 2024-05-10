import CommentCard from "./CommentCard";
import { postComment } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCommentsByArticleID } from "../api.js";
import ErrorBox from "./ErrorBox.jsx";

function CommentSection({ article_id }) {
  const [allComments, setAllComments] = useState([]);
  const { loggedUser, token } = useContext(LoginContext);
  const [newComment, setNewComment] = useState("");

  const [isPosted, setIsPosted] = useState(false);
  const [errorData, setErrorData] = useState({ status: 0, message: "" });

  useEffect(() => {
    if (isPosted) {
      const timer = setTimeout(() => {
        setIsPosted(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isPosted]);

  useEffect(() => {
    getCommentsByArticleID(article_id)
      .then((comments) => {
        setAllComments(comments);
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  }, [article_id, isPosted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    postComment(article_id, {
      username: loggedUser.username,
      body: newComment,
    })
      .then(() => {
        setIsPosted(true);
        setNewComment("");
      })
      .catch((error) => {
        setErrorData({
          ...errorData,
          status: error.status,
          message: error.message,
        });
      });
  };


  return (
    <div>
      <div className="commentTitle">
        <h4>
          Comments
          <hr />
        </h4>
        <img src="https://i.ibb.co/xXxtHcg/comments.png" />
        {allComments.length}
      </div>
      {allComments.map((comment) => (
        <div key={comment.comment_id}>
          <CommentCard comment={comment} />
        </div>
      ))}

<div className="newComment">
  <h4>New Comment<hr /></h4>
  {errorData.status === 0 ? (
    <div>
      {token ? (
        <div className="newCommentCard">
          <img src={loggedUser.avatar_url} />
          {isPosted ? (
            <p className="alertBox">Comment has been successfully posted</p>
          ) : (
            <form onSubmit={handleSubmit} className="commentInputBox">
              <input
                placeholder="Post A Comment"
                id="newComment"
                type="text"
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
                value={newComment}
              />
              <button type="submit" disabled={newComment.length <= 0}>↑</button>
            </form>
          )}
        </div>
      ) : (
        <div className="newCommentCard">
          <img src="../Favicon/favicon-32x32.png" />
          <Link to="/Login" className="alertBox">Login To Comment</Link>
        </div>
      )}
    </div>
  ) : (
    <ErrorBox status={errorData.status} message={errorData.message} />
  )}
</div>

    </div>
  );
}

export default CommentSection;
