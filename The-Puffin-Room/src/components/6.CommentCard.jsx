import dateFormat from "dateformat";

import moment from 'moment';
moment().format();

function CommentCard({ comment }) {

const date = dateFormat(comment.created_at, "isoDate");
const howLongAgo= moment(date, "YYYYMMDD").fromNow();


  return (
  <div className="commentCard">
<>{comment.author} . {howLongAgo}</>
<p>{comment.body}</p>
<img src="https://cdn-icons-png.flaticon.com/512/2722/2722994.png"/>{comment.votes}</div>
);
}

export default CommentCard;
