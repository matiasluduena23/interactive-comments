/* eslint-disable react/prop-types */
import LikeButton from "./LikeButton";
import CommentHeader from "./CommentHeader";
import { useState } from "react";
import { formatContentString } from "../logic/util";

export default function CommentBody({
  updateComment = null,
  deleteComment = null,
  comment,
  setActiveReply,
}) {
  const { content, score, replyingTo } = comment;
  const [edit, setEdit] = useState(false);
  const initialTextareAreaValue = replyingTo
    ? `@${replyingTo}, ${content}`
    : `${content}`;
  const [textarea, setTextarea] = useState(initialTextareAreaValue);

  const formatComment = replyingTo ? (
    <>
      <a href="#" className="comment-text-username">
        @{replyingTo}{" "}
      </a>
      {content}
    </>
  ) : (
    <>
      <span>{content}</span>
    </>
  );

  const handleUpdateClick = () => {
    const formatContent = formatContentString(textarea, replyingTo);

    updateComment(["content"], formatContent);
    setEdit(false);
  };

  return (
    <article className="comment">
      <div className="col-1">
        <LikeButton update={updateComment} score={score} />
      </div>
      <div className="col-2">
        <CommentHeader
          comment={comment}
          setActiveReply={setActiveReply}
          deleteComment={deleteComment}
          setEdit={() => setEdit(!edit)}
        />

        {edit ? (
          <div className="update-reply">
            <textarea
              className="reply-textarea"
              value={textarea}
              name=""
              id=""
              cols="30"
              rows="5"
              onChange={(e) => setTextarea(e.target.value)}
            ></textarea>
            <button className="reply-btn" onClick={handleUpdateClick}>
              {" "}
              Edit
            </button>
          </div>
        ) : (
          <p className="comment-text">{formatComment}</p>
        )}
      </div>
    </article>
  );
}
