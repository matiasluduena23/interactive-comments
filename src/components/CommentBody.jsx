/* eslint-disable react/prop-types */
import LikeButton from "./LikeButton";
import CommentHeader from "./CommentHeader";

export default function CommentBody({
  updateComment = null,
  deleteReply = null,
  comment,
  setActiveReply,
}) {
  const { content, score } = comment;

  return (
    <article className="comment">
      <div className="col-1">
        <LikeButton update={updateComment} score={score} />
      </div>
      <div className="col-2">
        <CommentHeader
          comment={comment}
          setActiveReply={setActiveReply}
          deleteReply={deleteReply}
        />
        <p className="comment-text">{content}</p>
      </div>
    </article>
  );
}
