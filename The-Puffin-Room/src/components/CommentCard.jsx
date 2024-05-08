import { LoginContext } from "../contexts/LoginContext";
import { useContext } from "react";

import dateFormat from "dateformat";
import moment from 'moment';
moment().format();

function CommentCard({ comment }) {
const { loggedUser } = useContext(LoginContext);

const date = dateFormat(comment.created_at, "isoDate");
const howLongAgo= moment(date, "YYYYMMDD").fromNow();

if(!comment.author){
  comment.author = loggedUser.username
}

  return (
  <div className="commentCard">
<>{comment.author} . {howLongAgo}</>
<p>{comment.body}</p>
<img src="https://i.ibb.co/7Wvj2Pm/votes.png"/>{comment.votes}</div>
);
}

export default CommentCard;
