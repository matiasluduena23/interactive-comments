import Comment from "./Comment";
import { useState, useContext } from "react";
import Reply from "./Reply";
import {
  CommetsContext,
  CommetsDistpachContext,
  CurrentUserContext,
} from "../context/ComentContext";

export default function CommentsList() {
  const dispatch = useContext(CommetsDistpachContext);
  const currentUser = useContext(CurrentUserContext);
  const tasks = useContext(CommetsContext);
  const [textarea, setTextarea] = useState();

  const addComment = () => {
    const newComment = {
      content: textarea,
      createdAt: "recently",
      score: 0,
      replies: [],
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };

    dispatch({
      type: "addComment",
      newComment,
    });
    setTextarea("");
  };

  const deleteComment = (id) => {
    dispatch({
      type: "deleteComment",
      id,
    });
  };

  return (
    <>
      {tasks.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          deleteComment={deleteComment}
        />
      ))}
      <Reply
        textarea={textarea}
        setTextarea={setTextarea}
        handleReply={addComment}
      />
    </>
  );
}
