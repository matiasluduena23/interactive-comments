/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import CommentReply from "./CommentReply";
import Reply from "./Reply";
import {
  CommetsDistpachContext,
  CurrentUserContext,
} from "../context/ComentContext";
import CommentBody from "./CommentBody";
import { formatContentString } from "../logic/util";

export default function Comment({ comment, deleteComment }) {
  const dispatch = useContext(CommetsDistpachContext);
  const currentUser = useContext(CurrentUserContext);
  const {
    user: { username },
    id,
    replies,
  } = comment;

  const [activeReply, setActiveReply] = useState(false);
  const [textarea, setTextarea] = useState("@" + username + ", ");

  const updateComment = (field, data) => {
    const updateComment = { ...comment, [field]: data };
    dispatch({
      type: "updateComment",
      id,
      updateComment,
    });
  };

  const handleReply = () => {
    const newContent = formatContentString(textarea, username);

    const reply = {
      content: newContent,
      createdAt: "recently",
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
        deleteComment={() => deleteComment(id)}
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
