import CommentCard from "./CommentCard";
import { postComment } from "../api";
import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getCommentsByArticleID } from "../api.js";

function CommentSection({ article_id }) {
  const [allComments, setAllComments] = useState([]);
  const { loggedUser, token } = useContext(LoginContext);
  const [newComment, setNewComment] = useState("");

  useState(() => {
    getCommentsByArticleID(article_id).then((commments) => {
      setAllComments(commments);
    });
  }, [setAllComments]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setAllComments([
      ...allComments,
      {
        username: loggedUser.username,
        body: newComment,
      },
    ]);
    postComment(article_id, {
      username: loggedUser.username,
      body: newComment,
    }).then(() => {
      setNewComment("");
    });
  };

  return (
    <div>
      <div className="commentTitle">
        
        <h4>Comments<hr/></h4>
        <img src="https://i.ibb.co/xXxtHcg/comments.png" />
        {allComments.length}
      </div>
      {allComments.map((comment) => (
        <div key={comment.comment_id}>
          <CommentCard comment={comment} />
        </div>
      ))}

      <div className="newComment">
        <h4>
          New Comment
          <hr />
        </h4>
        {token ? (
          <div className="newCommentCard">
            <img src={loggedUser.avatar_url} />
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
              <button type="submit">↑</button>
            </form>
          </div>
        ) : (
          <div className="newCommentCard">
            <img src="../Favicon/favicon-32x32.png" />
            <Link to="/Login" className="alertBox">
              Login To Comment
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CommentSection;
