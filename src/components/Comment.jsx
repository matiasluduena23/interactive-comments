/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import CommentReply from "./CommentReply";
import Reply from "./Reply";
import {
  CommetsDistpachContext,
  CurrentUserContext,
} from "../context/ComentContext";
import CommentBody from "./CommentBody";

export default function Comment({ comment }) {
  const dispatch = useContext(CommetsDistpachContext);
  const currentUser = useContext(CurrentUserContext);
  const {
    user: { username },
    id,
    replies,
  } = comment;

  const [activeReply, setActiveReply] = useState(false);
  const [textarea, setTextarea] = useState("@" + username + ", ");

  const updateComment = (score) => {
    const updateComment = { ...comment, score: score };
    dispatch({
      type: "updateComment",
      id,
      updateComment,
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
    setTextarea("@" + username + ", ");
  };

  return (
    <section>
      <CommentBody
        updateComment={updateComment}
        setActiveReply={() => setActiveReply(!activeReply)}
        comment={comment}
      />
      <div className="replies">
        {replies.length > 0 && (
          <div>
            {replies.map((c) => (
              <CommentReply key={c.id} idComment={id} comment={c} />
            ))}
          </div>
        )}
      </div>
      {activeReply && (
        <Reply
          handleReply={handleReply}
          textarea={textarea}
          setTextarea={setTextarea}
        />
      )}
    </section>
  );
}
