import { comments, currentUser } from "../data/data.json";
import Comment from "./Comment";
import commentReducer from "../reducer/commentReducer";
import { useState, useReducer } from "react";

export default function CommentsList() {
  const [tasks, dispatch] = useReducer(commentReducer, comments);

  const updateComment = (id, comment) => {
    dispatch({
      type: "updateComment",
      id,
      comment,
    });
  };

  const addReply = (id, reply) => {
    dispatch({
      type: "addReply",
      id,
      reply,
    });
  };

  const updateReply = (id, idReply, reply) => {
    dispatch({
      type: "updateReply",
      id,
      idReply,
      reply,
    });
  };

  return (
    <>
      {tasks.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          updateComment={updateComment}
          addReply={addReply}
          updateReply={updateReply}
        />
      ))}
    </>
  );
}
