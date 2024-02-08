import { useState } from "react";

export default function Comment({ comment, idComment, updateReply }) {
  const {
    content,
    createdAt,
    score,
    user: { username },
    id,
  } = comment;

  const [activeReply, setActiveReply] = useState(false);
  const [like, setLike] = useState(false);
  const [unlike, setUnLike] = useState(false);

  const handleLike = () => {
    if (like) return;
    if (unlike) {
      setUnLike(false);

      updateReply(idComment, id, { ...comment, score: score + 1 });
    } else if (!unlike) {
      setLike(true);
      //score set one up
      updateReply(idComment, id, { ...comment, score: score + 1 });
    }
  };

  const handleUnLike = () => {
    if (unlike) return;
    if (like) {
      setLike(false);
      updateReply(idComment, id, { ...comment, score: score - 1 });
    } else if (!like) {
      setUnLike(true);
      updateReply(idComment, id, { ...comment, score: score - 1 });
    }
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

      {activeReply && <Reply handleReply={handleReply} username={username} />}
    </article>
  );
}
