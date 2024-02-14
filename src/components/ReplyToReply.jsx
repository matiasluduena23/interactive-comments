/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import CommentBody from "./CommentBody";
import { CommetsDistpachContext } from "../context/ComentContext";

export default function Comment({ idReply, comment, idComment }) {
  const { id } = comment;
  const dispatch = useContext(CommetsDistpachContext);

  const [activeReply, setActiveReply] = useState(false);

  const deleteReplytoReply = () => {
    dispatch({
      type: "deleteReplytoReply",
      idComment,
      idReply,
      id,
    });
  };

  const updateReply = (score) => {
    const updateReply = { ...comment, score: score };
    dispatch({
      type: "updateReplytoReply",
      idComment,
      idReply,
      id,
      updateReply,
    });
  };

  return (
    <section>
      <CommentBody
        updateComment={updateReply}
        deleteReply={deleteReplytoReply}
        setActiveReply={() => setActiveReply(!activeReply)}
        comment={comment}
      />
    </section>
  );
}
