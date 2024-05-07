import CommentCard from "./6.CommentCard";

function CommentSection({ allComments }) {
  return (
    <div className="comment-section">
      {allComments.map((comment) => (
        <div key={comment.comment_id}>
          <CommentCard comment={comment} />
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
