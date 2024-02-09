import { comments, currentUser } from "../data/data.json";
import Comment from "./Comment";
import commentReducer from "../reducer/commentReducer";
import { useState, useReducer } from "react";
import {
  CommetsDistpachContext,
  CommetsContext,
} from "../context/ComentContext";

export default function CommentsList() {
  const [tasks, dispatch] = useReducer(commentReducer, comments);

  return (
    <CommetsContext.Provider value={tasks}>
      <CommetsDistpachContext.Provider value={dispatch}>
        {tasks.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUser={currentUser}
          />
        ))}
      </CommetsDistpachContext.Provider>
    </CommetsContext.Provider>
  );
}
