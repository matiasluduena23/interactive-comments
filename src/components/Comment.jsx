import { useState } from "react";
import CommentReply from "./CommentReply";
import Reply from "./Reply";

export default function Comment({
  comment,
  updateComment,
  addReply,
  currentUser,
  updateReply,
}) {
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
    if (like === "like") return;
    if (like === "unlike") {
      updateComment(id, { ...comment, score: score + 1 });
      setLike("like");
    } else if (like === "dislike") {
      updateComment(id, { ...comment, score: score + 1 });
      setLike("unlike");
    }
  };

  const handleUnLike = () => {
    if (like === "dislike") return;
    if (like === "like") {
      updateComment(id, { ...comment, score: score - 1 });
      setLike("unlike");
    } else if (like === "unlike") {
      updateComment(id, { ...comment, score: score - 1 });
      setLike("dislike");
    }
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

    addReply(id, reply);
    setActiveReply(false);
  };

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
              updateReply={updateReply}
            />
          ))}
        </div>
      )}
      {activeReply && <Reply handleReply={handleReply} username={username} />}
    </article>
  );
}
