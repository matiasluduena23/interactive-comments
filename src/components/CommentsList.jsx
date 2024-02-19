import { comments, currentUser } from "../data/data.json";
import Comment from "./Comment";
import commentReducer from "../reducer/commentReducer";
import { useReducer, useState } from "react";
import {
  CommetsDistpachContext,
  CommetsContext,
  CurrentUserContext,
} from "../context/ComentContext";
import Reply from "./Reply";

export default function CommentsList() {
  const [tasks, dispatch] = useReducer(commentReducer, comments);
  const [textarea, setTextarea] = useState();

  const addComment = () => {
    const newContent = formatContentString(textarea, username);

    const newComment = {
      content: newContent,
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
      id,
      newComment,
    });
    setActiveReply(false);
    setTextarea("@" + username + ", ");
  };

  return (
    <CommetsContext.Provider value={tasks}>
      <CurrentUserContext.Provider value={currentUser}>
        <CommetsDistpachContext.Provider value={dispatch}>
          {tasks.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
          <Reply
            textarea={textarea}
            setTextarea={setTextarea}
            handleReply={addComment}
          />
        </CommetsDistpachContext.Provider>
      </CurrentUserContext.Provider>
    </CommetsContext.Provider>
  );
}
