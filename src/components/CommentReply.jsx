import { useState, useContext } from "react";
import { CommetsDistpachContext } from "../context/ComentContext";
import { useLike, useUnLike } from "../hooks/useLike";
import Reply from "./Reply";
import ReplyToReply from "./ReplyToReply";

export default function Comment({ comment, idComment, currentUser }) {
  const dispatch = useContext(CommetsDistpachContext);
  const {
    content,
    createdAt,
    score,
    replies,
    user: { username },
    id,
  } = comment;

  const [textarea, setTextarea] = useState("@" + username + ", ");

  const [activeReply, setActiveReply] = useState(false);
  const [like, setLike] = useState(false);

  const handleLike = () => {
    if (useLike(like, setLike)) {
      updateReply(idComment, id, { ...comment, score: score + 1 });
    }
  };

  const handleUnLike = () => {
    if (useUnLike(like, setLike)) {
      updateReply(idComment, id, { ...comment, score: score - 1 });
    }
  };

  const updateReply = (id, idReply, reply) => {
    dispatch({
      type: "updateReply",
      id,
      idReply,
      reply,
    });
  };

  const handleReply = () => {
    const reply = {
      content: textarea,
      createdAt: Date.now(),
      score: 0,
      replyingTo: username,
      user: {
        image: currentUser.image,
        username: currentUser.username,
      },
    };

    dispatch({
      type: "addReplytoReply",
      idComment,
      id,
      reply,
    });
    setActiveReply(false);
  };

  return (
    <article style={{ backgroundColor: "grey" }}>
      <button onClick={handleLike}>+</button>
      <p>{score}</p>
      <button onClick={handleUnLike}>-</button>
      <p>{username}</p>
      <p>{createdAt}</p>
      <button onClick={() => setActiveReply(!activeReply)}>reply</button>
      <p>{content}</p>

      {replies && replies.length > 0 && (
        <div>
          {replies.map((c) => (
            <ReplyToReply
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
