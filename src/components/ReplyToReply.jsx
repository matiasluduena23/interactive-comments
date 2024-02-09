import { useState } from "react";

export default function Comment({ comment, idComment, updateReply }) {
  const {
    content,
    createdAt,
    score,
    user: { username },
    id,
  } = comment;
  console.log(comment);

  const [activeReply, setActiveReply] = useState(false);
  const [like, setLike] = useState(false);

  const handleLike = () => {};

  const handleUnLike = () => {};

  return (
    <article style={{ backgroundColor: "lightblue" }}>
      <button onClick={handleLike}>+</button>
      <p>{score}</p>
      <button onClick={handleUnLike}>-</button>
      <p>{username}</p>
      <p>{createdAt}</p>
      <button onClick={() => setActiveReply(!activeReply)}>reply</button>
      <p>{content}</p>

      {activeReply && <Reply handleReply={updateReply} username={username} />}
    </article>
  );
}
