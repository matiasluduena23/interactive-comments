import { useContext, useState } from "react";
import CommentReply from "./CommentReply";
import Reply from "./Reply";
import { CommetsDistpachContext } from "../context/ComentContext";
import { useLike, useUnLike } from "../hooks/useLike";

export default function Comment({ comment, currentUser }) {
  const dispatch = useContext(CommetsDistpachContext);
  const {
    content,
    createdAt,
    score,
    user: { username },
    id,
    replies,
  } = comment;

  const [activeReply, setActiveReply] = useState(false);
  const [like, setLike] = useState("unlike");
  const [textarea, setTextarea] = useState("@" + username + ", ");

  const handleLike = () => {
    if (useLike(like, setLike)) {
      updateComment(id, { ...comment, score: score + 1 });
    }
  };

  const handleUnLike = () => {
    if (useUnLike(like, setLike)) {
      updateComment(id, { ...comment, score: score - 1 });
    }
  };

  const updateComment = (id, comment) => {
    dispatch({
      type: "updateComment",
      id,
      comment,
    });
  };

  const handleReply = () => {
    const reply = {
      content: textarea,
      createdAt: Date.now(),
      score: 0,
      replyingTo: username,
      replies: [],
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };

    dispatch({
      type: "addReply",
      id,
      reply,
    });
    setActiveReply(false);
  };

  console.log(comment);
  return (
    <article>
      <button onClick={handleLike}>+</button>
      <p>{score}</p>
      <button onClick={handleUnLike}>-</button>
      <p>{username}</p>
      <p>{createdAt}</p>
      <button onClick={() => setActiveReply(!activeReply)}>reply</button>
      <p>{content}</p>

      {replies.length > 0 && (
        <div>
          {replies.map((c) => (
            <CommentReply
              key={c.id}
              idComment={id}
              comment={c}
              currentUser={currentUser}
            />
          ))}
        </div>
      )}
      {activeReply && <Reply handleReply={handleReply} username={username} />}
    </article>
  );
}
