import { LoginContext } from "../contexts/LoginContext";
import { useContext, useState, useEffect } from "react";

import { deleteComment } from "../api";
import ErrorBox from "./ErrorBox";

import dateFormat from "dateformat";
import moment from "moment";

moment().format();

function CommentCard({ comment }) {
  const date = dateFormat(comment.created_at, "isoDate");
  const howLongAgo = moment(date, "YYYYMMDD").fromNow();

  const { loggedUser } = useContext(LoginContext);

  const [isDeleted, setIsDeleted] = useState(false);
  const [render, setRender] = useState(true);
  const [errorData,setErrorData] = useState({status:0,message:""})

  if (!comment.author) {
    comment.author = loggedUser.username;
  }

  useEffect(() => {
    if (isDeleted) {
      const timer = setTimeout(() => {
        setRender(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isDeleted]);

  const handleClick = () => {
    deleteComment(comment.comment_id)
      .then(() => setIsDeleted(true))
      .catch((error) => {
        setErrorData({...errorData,status:error.status,message:error.message})
        }
      );
  };

  if (errorData.status !== 0) {
    return <ErrorBox status={errorData.status} message={errorData.message}/>
  } 

  return render ? (
    <div className="commentCard">
      <>
        {comment.author} . {howLongAgo}
      </>
      {comment.author === loggedUser.username && !isDeleted && (
        <button onClick={handleClick}>x</button>
      )}
      {isDeleted ? (
        <p className="alertBox">Comment has been successfully deleted</p>
      ) : (
        <p>{comment.body}</p>
      )}
      <img src="https://i.ibb.co/7Wvj2Pm/votes.png" alt="votes" />
      {comment.votes}
    </div>
  ) : null;
}

export default CommentCard;
